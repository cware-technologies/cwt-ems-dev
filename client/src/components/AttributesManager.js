import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Container from './MainContainer'
import { getUser } from '../reducers/authReducer'
import DataTable from './DataTable'
import AddEditForm from './AddEditForm'
import ModalTrigger from './ModalTrigger';
import { alertActions } from '../actions';

class AttributesManager extends React.Component{
    modalRef = React.createRef()
    state = {
        data: [],
        formData: {
            
        },
        editMode: false,
    }
    
    setEditMode = (record) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                ...record,
            },
            editMode: true,
        }), () => this.modalRef.handleModalOpen())
    }

    unsetEditMode = () => {
        let formdata = {}
        this.props.rows.forEach(row => formdata[row.id] = '')
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
        }),() => console.log(this.state))
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
                url: this.props.endpoint,
                headers: {
                    'content-type': 'application/json',
                },
                data: this.state.formData,
            })

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: newData,
                }))
                this.props.success(`${this.props.headerTitle} successfully updated!`)
            }
            else{
                this.props.error({message: `${this.props.headerTitle} could not be updated!`})
            }

            console.log("UPDATE RESPONSE: ", response)
        }
        catch(err){
            this.props.error({message: `${this.props.headerTitle} could not be updated!`})            
        }
    }

    handleAdd = async() => {
        let response
        let data = this.state.formData
        data.emp_id = this.props.entity || this.props.userId

        try{
            response = await axios({
                method: 'post',
                url: this.props.endpoint,
                headers: {
                    'content-type': 'application/json',
                },
                data: data,
            })
            console.log(response)
            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: [
                        ...prevState.data,
                        response.data.data
                    ]
                }))

                this.props.success(`${this.props.headerTitle} successfully added!`)
            }
            else{
                this.props.error({message: `${this.props.headerTitle} could not be added!`})
            }
        }
        catch(err){
            this.props.error({message: `${this.props.headerTitle} could not be added!`})
            console.log(response)
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
                url: this.props.endpoint,
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
                this.props.success(`${this.props.headerTitle} Deleted Successfully!`)
            }
            else{
                this.props.error({message: `${this.props.headerTitle} could not be deleted!`})
            }
        }
        catch(err){
            this.props.error({message: `${this.props.headerTitle} could not be deleted!`})
        }
    }

    componentDidMount(){
        this.getList()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.entity && this.props.entity !== prevProps.entity)
            this.getList()
    }

    getList = async() => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: this.props.endpoint,
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    employee: this.props.entity || this.props.userId,
                },
            })
            this.setState(prevState => ({
                data: response.data.result,
            }))
            console.log("RESPONSE: ", response)
        }
        catch(err){
            this.props.error(`Couldn't fetch ${this.props.headerTitle}`)
        }
    }

    render(){
        let { organization, rows, fields, headerTitle } = this.props
        let { data, formData, editMode } = this.state

        let addComponent = <ModalTrigger
                                IconButton={
                                    <Tooltip title="Add">
                                        <IconButton aria-label="Add">
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                innerRef={node => this.modalRef = node}
                                disabled={editMode}
                            >
                                <AddEditForm
                                    headerTitle={headerTitle}
                                    fields={fields}
                                    object={formData}
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                    editMode={editMode}
                                />
                            </ModalTrigger>

        return(
            <DataTable
                headerTitle={headerTitle}
                rows={rows}
                params={{ organization: organization }}
                data={data}
                actions
                setEditMode={this.setEditMode}
                unsetEditMode={this.unsetEditMode}
                handleDelete={this.handleDelete}
                editMode={editMode}
                AddComponent={addComponent}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: getUser(state)
    }
}

export default connect(mapStateToProps, {...alertActions})(AttributesManager)