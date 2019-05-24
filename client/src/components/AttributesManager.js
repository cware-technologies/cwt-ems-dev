import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import Typography from '@material-ui/core/Typography'
import Container from './MainContainer'
import { getUser } from '../reducers/authReducer'
import DataTable from './DataTable'
import AddEditForm from './AddEditForm'
import ModalTrigger from './ModalTrigger';

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
        data.emp_id = this.props.userId
        console.log(data)

        try{
            response = await axios({
                method: 'post',
                url: this.props.endpoint,
                headers: {
                    'content-type': 'application/json',
                },
                data: data,
            })

            this.setState(prevState => ({
                data: [
                    ...prevState.data,
                    response.data.data
                ]
            }))
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
                url: this.props.endpoint,
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
                url: this.props.endpoint,
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    employee: this.props.userId,
                },
            })
            this.setState(prevState => ({
                data: response.data.result,
            }))
            console.log("RESPONSE: ", response)
        }
        catch(err){
            
        }
    }

    render(){
        let { organization, rows, fields, headerTitle } = this.props
        let { data, formData, editMode } = this.state
         console.log("ORG: ", this.props.organization)
        return(
            <Container contained>
                <Typography variant='title' color='textPrimary'>{headerTitle}</Typography>
                <ModalTrigger
                    title="Add"
                    button
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
                <DataTable
                    headerTitle={headerTitle}
                    rows={rows}
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
        userId: getUser(state)
    }
}

export default connect(mapStateToProps, {})(AttributesManager)