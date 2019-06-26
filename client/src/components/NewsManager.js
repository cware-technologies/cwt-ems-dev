import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { alertActions } from '../actions';
import DataTable from './DataTable'
import Container from './MainContainer';
import AddButton from './AddButton';
import ModalTrigger from './ModalTrigger';
import PostUpdateForm from './PostUpdateForm';
import ActionPanel from './ActionPanel'
import Search from './Search';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

const rows = [
    { id: 'type_cd', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Type' },
    { id: 'ATTRIB_10', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Title' },
    { id: 'created', date: true, numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Posted On'},
    { id: 'stat_cd', type: 'toggle', numeric: false, disablePadding: true, lengthRatio:'Action', label: 'Active'},
]

const fields = [
    { id: 'val', type:'text', label: 'Name' },
    { id: 'type', type:'select', label: 'Type', selectOptions: [{value: 'induction_checklist', name: 'Induction'}, {value: 'exit_checklist', name: 'Exit'}] },
]

const schema = {}

class NewsManager extends React.Component{
    modalRef = React.createRef()
    state = {
        data: [],
        editMode: false,
        formData: {},
        query: '',
        isSearching: false,
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        let response
        let params = this.state.query && {
            query: this.state.query,
        }

        this.setState(prevState => ({
            isSearching: true,
        }))

        try{
            response = await axios({
                method: 'get',
                url: '/homepage/news/all',
                params: params,
            })

            this.setState(prevState => ({
                isSearching: false,
            }))

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: response.data.data,
                }))
            }
            else{
                this.props.error({message: 'Failed To Load News, Please Reload!'})
            }
        }
        catch(err){
            this.setState(prevState => ({
                isSearching: false,
            }))
            this.props.error({message: 'Failed To Load News, Please Reload!'})

        }
    }

    setEditMode = (record) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                ...record,
            },
            editMode: true,
        }), () => {console.log(this.state);this.modalRef.handleModalOpen()})
    }

    unsetEditMode = () => {
        let formdata = {}
        rows.forEach(row => formdata[row.id] = '')
        console.log(formdata)

        this.setState(prevState => ({
            formData: formdata,
            editMode: false,
        }))
    }

    handleChange = (e) => {
        let target = e.target.id
        let value = e.target.value

        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [target]: value,
            }
        }))
    }

    onSearchChange = (e) => {
        let value = e.target.value
        this.setState(prevState => ({
          query: value,
        }))
    }

    handleSwitchChange = async (checked, id) => {
        return new Promise(async (resolve, reject) => {
          let response
          console.log("SWITCH HANDLER")
          try {
            response = await axios({
              method: 'post',
              url: '/admin/news/changeStatus',
              headers: {
                'content-type': 'application/json',
              },
              data: {
                checked: checked == '1' ? 'active' : 'inactive',
                news: id,
              },
            })
    
            if (response.data.status === 200) {
              this.props.success(response.data.message)
              resolve()
            }
            else {
              this.props.error(response.data)
              reject()
            }
          }
          catch (err) {
            this.props.error({message: "Action couldn't be completed"})
            reject()
          }
        })
      }

    handleSubmit = async() => {
        let response

        if(this.state.editMode){
            this.handleUpdate()
        }
        else{
            this.handleAdd()
        }
    }

    handleUpdate = async() => {
        let response
        let id = this.state.formData.row_id
        let newData = this.state.data.filter(row => {
            return row.row_id !== id
        })

        newData.push(this.state.formData)

        try{
            response = await axios({
                method: 'put',
                url: '/admin/induction-lovs',
                headers: {
                    'content-type': 'application/json',
                },
                data: this.state.formData,
            })

            this.setState(prevState => ({
                data: newData,
            }))
            console.log("UPDATE RESPONSE: ", response)
        }
        catch(err){
            
        }
    }

    handleAdd = async() => {
        let response
        let data = this.state.formData
        data.bu_id = this.props.organization
        console.log("HANDLE ADD")

        try{
            response = await axios({
                method: 'post',
                url: '/admin/news/add',
                headers: {
                    'content-type': 'application/json',
                },
                data: data,
            })

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: [
                        ...prevState.data,
                        response.data.data
                    ],
                    formData: {},
                }))

                this.props.success("News Posted Successfully!")
            }
            else{
                this.props.error("There Was An Error Posting The News!")                
            }
        }
        catch(err){
            this.props.error("There Was An Error Posting The News!")
        }
    }

    handleDelete = async(id) => {
        let response
        let newData = this.state.data.filter(row => {
            return row.row_id !== id
        })

        try{
            response = await axios({
                method: 'delete',
                url: '/homepage/news',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    row_id: id,
                },
            })

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: newData,
                }))

                this.props.success('Deleted Successfully!')
            }

            console.log("DELETE RESPONSE: ", response)
        }
        catch(err){
            this.props.error( {message: 'Deletion Failed!'} )
        }
    }


    render(){
        let { data, editMode, formData, query, isSearching } = this.state

        let addComponent =  <ModalTrigger
                                IconButton={
                                    <Tooltip title="Add">
                                        <IconButton aria-label="Add">
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                innerRef={node => this.modalRef = node}
                                disabled={editMode}
                                onClose={this.unsetEditMode}
                            >
                                <PostUpdateForm
                                    data={formData}
                                    changeHandler={this.handleChange}
                                    submitHandler={this.handleSubmit}
                                    editMode={editMode}
                                />
                            </ModalTrigger>

        return(
            <Container>
                <ActionPanel>
                    <Search
                        title="News"
                        query={query}
                        submitHandler={this.getData}
                        changeHandler={this.onSearchChange}
                        isSearching={isSearching}
                    />
                </ActionPanel>
                <DataTable
                    headerTitle="news"
                    rows={rows}
                    data={data}
                    actions
                    setEditMode={this.setEditMode}
                    unsetEditMode={this.unsetEditMode}
                    handleDelete={this.handleDelete}
                    handleSwitchChange={this.handleSwitchChange}
                    editMode={editMode}
                    AddComponent={addComponent}
                />
            </Container>
        )
    }
}

export default connect(()=>{}, {...alertActions})(NewsManager)