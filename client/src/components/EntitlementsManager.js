import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Container from './MainContainer'
import { getUserOrganization } from '../reducers/authReducer'
import DataTable from './DataTable'
import AddEditForm from './AddEditForm'
import ModalTrigger from './ModalTrigger';
import { alertActions } from '../actions';

const viewRows = [
    { id: 'val', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
    { id: 'ATTRIB_11', numeric: false, disablePadding: true, lengthRatio:'Small', label: 'No Of Days' },
]

const formFields = [
    { id: 'val', type:'text', label: 'Name' },
    { id: 'type', type:'select', label: 'Type', selectOptions: [{value: 'leave_type', name: 'Leave Type'}], defaultValue: 'leave_type', readOnly: true, },
    { id: 'ATTRIB_11', type:'number', label: 'No Of Days', inputProps: { min: '1', max: '50', step: '1' } },
]

const schema = {
    val: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    type: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    ATTRIB_11: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
}

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
        formFields.forEach(row => row.id !== 'type' ? formdata[row.id] = '' : formdata.type = 'leave_type')
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

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: newData,
                }))

                this.props.success("Record Updated Successfully!")
            }
            else{
                this.props.error({message: "Record Could Not be Updated!"})
            }
        }
        catch(err){
            this.props.error({message: "Record Could Not be Updated!"})            
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
               
            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: [
                        ...prevState.data,
                        response.data.data
                    ],
                }))

                this.props.success("Record Added Successfully!")
            }
            else{
                this.props.error({message: "Record Could Not be Added!"})                
                
            }

            this.unsetEditMode()
        }
        catch(err){
            this.props.error({message: "Record Could Not be Added!"})                
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

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: newData,
                }))
                this.props.success("Record Deleted Successfully!")                
            }
            else{
                this.props.error({message: "Could Not Delete The Record"})
            }
        }
        catch(err){
            this.props.error({message: "Could Not Delete The Record"})
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
            
            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: response.data.data,
                }))
            }
            else{
                this.props.error({message: "Could Not Load The Leave Type Records"})                
            }
        }
        catch(err){
            this.props.error({message: "Could Not Load The Leave Type Records"})
        }
    }

    render(){
        let { organization } = this.props
        let { data, formData, editMode } = this.state

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
                                <AddEditForm
                                    headerTitle="LeaveTypes"
                                    fields={formFields}
                                    schema={schema}
                                    object={formData}
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                    editMode={editMode}
                                />
                            </ModalTrigger>
        return(
            <Container>
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
                    AddComponent={addComponent}
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

export default connect(mapStateToProps, {...alertActions})(EntitlementsManager)