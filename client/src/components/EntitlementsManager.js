import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import Container from './MainContainer'
import { getUserOrganization } from '../reducers/authReducer'
import DataTable from './DataTable'
import AddEditForm from './AddEditForm'
import ModalTrigger from './ModalTrigger';

const viewRows = [
    { id: 'val', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Value' },
    { id: 'type', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Type'}
]

const formFields = [
    { id: 'val', type:'text', label: 'Name' },
    { id: 'type', type:'select', label: 'Type', selectOptions: [{value: 'leave_type', name: 'Leave Type'}], defaultValue: 'leave_type', readOnly: true, },
]

class EntitlementsManager extends React.Component{
    modalRef = React.createRef()
    state = {
        data: [],
        formData: {
            val: '',
            type: 'leave_type',
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
        viewRows.forEach(row => formdata[row.id] = '')
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
                url: '/admin/leave-types',
                headers: {
                    'content-type': 'application/json',
                },
                data: this.state.formData,
            })

            if (response.data.status >= 200 && response.data.status < 300){
                this.setState(prevState => ({
                    data: newData,
                }))
            }
        }
        catch(err){
            
        }
    }

    handleAdd = async() => {
        let response
        let data = this.state.formData
        data.bu_id = this.props.organization
        console.log(data)

        try{
            response = await axios({
                method: 'post',
                url: '/admin/leave-types',
                headers: {
                    'content-type': 'application/json',
                },
                data: data,
            })
               
            if (response.data.status >= 200 && response.data.status < 300){            
                this.setState(prevState => ({    
                    data: [
                        ...prevState.data,
                        response.data.data
                    ]
                }))
            }
        }
        catch(err){

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
                url: '/admin/leave-types',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    row_id: id,
                },
            })

            this.setState(prevState => ({
                data: newData,
            }))

            console.log("ADD RESPONSE: ", response)
        }
        catch(err){

        }
    }

    componentDidMount(){
        this.getList()
    }

    getList = async() => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: '/admin/leave-types',
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    organization: this.props.organization,
                },
            })
            this.setState(prevState => ({
                data: response.data.data,
            }))
            console.log("RESPONSE: ", response)
        }
        catch(err){
            
        }
    }

    render(){
        let { organization } = this.props
        let { data, formData, editMode } = this.state
         console.log("ORG: ", this.props.organization)
        return(
            <Container>
                <ModalTrigger
                    title="Add"
                    button
                    innerRef={node => this.modalRef = node}
                    disabled={editMode}
                >
                    <AddEditForm
                        headerTitle="LeaveTypes"
                        fields={formFields}
                        object={formData}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        editMode={editMode}
                    />
                </ModalTrigger>
                <DataTable
                    headerTitle="Leave Types Checklist"
                    rows={viewRows}
                    endpoint='/access-rights/view'
                    params={{ organization: organization }}
                    data={data}
                    actions
                    setEditMode={this.setEditMode}
                    unsetEditMode={this.unsetEditMode}
                    handleDelete={this.handleDelete}
                    editMode={editMode}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        organization: getUserOrganization(state)
    }
}

export default connect(mapStateToProps, {})(EntitlementsManager)