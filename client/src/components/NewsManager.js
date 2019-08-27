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
import { capitalize, getFormDataFromObject, objectToFormData } from '../helpers/utils' 
import { getUserOrganization } from '../reducers/authReducer';

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

const externalFeedTypes = [
    {
        value: "Local",
        label: "Local",
    },
    {
        value: "Technology",
        label: "Technology",
    },
    {
        value: "Economy",
        label: "Economy",
    },
]

const schema = {
    'type_cd.value': {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    ATTRIB_10: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    ATTRIB_02: {
        equality: {
            attribute: "type_cd",
            message: "is required",
            comparator: function(v1, v2) {
                console.log("SAOIDJAOSIDJOASIJOIJSDIOASJDOISA: ", v1, v2)
                return true
                // if(externalFeedTypes.filter(item => item.value === v2.value).length <= 0){
                //     if(v1 === null || v1 === ""){ return false }
                //     else{ return true }
                // }
                // else{
                //     return true
                // }
            }
          }
    }
}

class NewsManager extends React.Component{
    modalRef = React.createRef()
    state = {
        data: [],
        editMode: false,
        formData: {
            type_cd: { label: "", value: null},
        },
        query: '',
        isSearching: false,
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        let response
        let params = this.state.query && this.state.query !== '' ? {
            query: this.state.query,
        } : {}

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

            console.log(response)

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
        let news = record
        let newData = {
            ...news,
            type_cd: { label: capitalize(record.type_cd), value: record.type_cd}
        }
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                ...newData,
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

    handleChange = (target, value) => {
        return new Promise((resolve, reject) => {
            
                this.setState(prevState => ({
                    formData: {
                        ...prevState.formData,
                        [target] : value,
                    }
                }), () => {console.log("SATELLITE: ", this.state.formData);resolve()})
            
        })
    }

    onSearchChange = (e) => {
        let value = e.target.value
        this.setState(prevState => ({
          query: value,
        }))
    }

    handleSwitchChange = async (checked, data) => {
        let id = data.row_id
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

    handleSubmit = async(e, formRef) => {
        let response

        // let formData = getFormDataFromObject(this.state.formData)
        let formData = objectToFormData(this.state.formData, '')

        if(this.state.editMode){
            this.handleUpdate(formData, formRef)
        }
        else{
            this.handleAdd(formData, formRef)
        }
    }

    handleUpdate = async(formData, formRef) => {
        let response
        let id = this.state.formData.row_id
        let newData = this.state.data.filter(row => {
            return row.row_id !== id
        })
        
        let newRecord = this.state.formData
        console.log(newRecord)
        newRecord.type_cd = newRecord.type_cd.value

        newData.unshift(newRecord)

        for(let pair of formData.entries()){
            console.log(pair[0], pair[1])
        }

        try{
            let config 
            
            if(this.state.formData.file){
                config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'contains-file': true,
                    },
                }
            }
            else {
                config = {
                    headers: {
                        'content-type': 'application/json',
                        'contains-file': false,
                    },
                }
            }

            

            response = await axios.put(
                '/admin/news',
                formData,
                config,
            )

            console.log(this.state.formData)
            console.log(response)

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: newData,
                }), ()=>console.log(this.state.data))
                this.props.success("News Updated Successfully!")
            }
            else{
                this.props.error(response.data.message ? response.data : {message:"There Was An Error Updating The News!"})                
            }
        }
        catch(err){
            this.props.error("There Was An Error Updating The News!")
        }
    }

    handleAdd = async(formData, formRef) => {
        let response
            console.log("ORG: ", this.props)
        formData.append('bu_id', this.props.organization)

        for(let pair of formData.entries()){
            console.log(pair[0], pair[1])
        }

        try{
            let config 
            
            if(this.state.formData.file){
                config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'contains-file': true,
                    },
                }
            }
            else {
                config = {
                    headers: {
                        'content-type': 'application/json',
                        'contains-file': false,
                    },
                }
            }

            console.log('CONFIG: ', config)
    
            response = await axios.post(
                '/admin/news',
                formData,
                config,
            )
            console.log(response)

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: [
                        ...prevState.data,
                        response.data.data
                    ],
                    formData: {},
                }))

                formRef.reset()
                this.props.success("News Posted Successfully!")
            }
            else{
                this.props.error(response.data)                
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
                url: '/admin/news',
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
                                    schema={schema}
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

const mapStateToProps = (state) => {
    return {
        organization: getUserOrganization(state),
    }
}

export default connect(mapStateToProps, {...alertActions})(NewsManager)