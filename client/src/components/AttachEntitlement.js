import React from 'react'
import axios from 'axios'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import SelectableTable from './SelectableTable'
import Container from './MainContainer';
import Search from './Search';
import Checklist from './Checklist'
import AddEditForm from './AddEditForm'
import { getUserOrganization } from '../reducers/authReducer';
import ModalTrigger from './ModalTrigger'

const style = theme => ({
    actionPanel: {
        display: 'flex',
        flexDirection: 'row',
    },
})

const checklistRows = [
    { id: 'val', numeric: false, disablePadding: true, label: 'Document', },
    { id: 'type', numeric: false, disablePadding: true, label: 'Type', },
    { id: 'status', numeric: false, disablePadding: true, checkbox: true, label: 'Submitted', },
]

const applicationFormFields = [
    { id: 'application', type: 'select', label: 'Entitlement', selectOptions: [{ value: 'induction_checklist', name: 'Induction' }, { value: 'exit_checklist', name: 'Exit' }] },
]

class EmployeeInduction extends React.Component {
    state = {
        updates: {},
        usersData: [],
        checklistData: [],
        leaveTypes: [
            { id: 'application', type: 'select', label: 'Entitlement', selectOptions: [] },
        ],
        applicationFormData: {},
        query: '',
    }

    componentDidMount(){
        this.getLeaveTypes()
    }

    getLeaveTypes = async () => {
        let response
        console.log("INSIDE LEAVE TYPES!!!")

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

            console.log("LEAVE TYPE RESPONSE: ", response)
            let values = response.data.data.map(row => (({type, val}) => ({ value: val, name: val }))(row))

            console.log("VALUES: ", values)

            let newData = this.state.leaveTypes.map((row, index) => {
                if(row.id === 'application'){
                    row.selectOptions = values
                    return row
                }
                else
                    return row
            })

            this.setState(prevState => ({
                leaveTypes: newData,
            }))
            console.log("LEAVE TYPE RESPONSE: ", response)
        }
        catch(err){
            
        }
    }

    onSearch = async (e) => {
        console.log("DSDAKDIOIQDJOIWDJOQIWJDOi")
        e.preventDefault()
        let response

        try {
            response = await axios({
                method: 'get',
                url: '/public/search/employee',
                params: {
                    query: this.state.employeeFormData.query
                }
            })

            this.setState(prevState => ({
                usersData: response.data.result,
            }))

            console.log("RESPONSE: ", response)
        }
        catch (err) {

        }
    }

    setUser = () => {

    }

    handleChange = (event, element) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            [`${element}FormData`]: {
                ...prevState[`${element}FormData`],
                [target]: value,
            }
        }), () => console.log('STSTSTSAAATTE: ', this.state))
    }

    handleCheckboxChange = (e, id) => {
        let target = e.target.id
        let value = e.target.checked

        let newData = this.state.checklistData.map(row => {
            if(row.row_id === id)
                row.FLG_01 = !row.FLG_01

            return row
        })

        this.setState(prevState => ({
            checklistData: newData,
            updates: {
                ...prevState.updates,
                [id]:{
                    ...prevState.updates[id],
                    FLG_01: value,
                }
            }
        }))
    }

    // handleCheckboxChange = (event, id, idx) => {
    //     let target = event.target.id
    //     let value = event.target.checked
    //     let data = this.state.data
    //     let flag = target === 'readOnly' ? 'FLG_01' : 'FLG_02'

        
    //     let index = 0
    //     for(index; index < data.length; index++) {
    //         if(data[index].row_id === id) 
    //             break;
    //     }
            

    //     // let selection = data.filter(row => row.row_id === id)
    //     // console.log("SELECTION: ", selection)
    //     // let index = selection[0] && selection[0].row_id

    //     data[index] = {
    //         ...data[index],
    //         C_RESP_VIEW: {
    //             ...data[index].C_RESP_VIEW,
    //             [flag]: value,
    //         }
    //     }

    //     this.setState(prevState => ({
    //         data: data,
    //         updates: {
    //             ...prevState.updates,
    //             [idx]: {
    //                 ...prevState.updates[idx],
    //                 [flag]: value,
    //             }
    //         }
    //     }), () => console.log("UPDATE STATE: ", this.state))
    // }

    selectEntity = (entity, primary, organization) => {
        let labelField = `${entity}Label`
        console.log("SELECT ENTITY: ", primary, " ", entity)

        this.setState(prevState => ({
            [entity]: primary,
            organization: organization !== null ? organization : prevState.organization,
            // [labelField]: label,
        }), () => this.getChecklist() )
    }

    getChecklist = async() => {
        let response

        try{
            let response = await axios({
                method: 'get',
                url: '/admin/employee/entitlements',
                params: {
                    employee: this.state.users,
                }
            })
            console.log("RESRESRES: ", response)
            this.setState(prevState => ({
                checklistData: response.data.result,
            }))
        }catch(err){

        }
    }

    handleUpdate = async() => {
        let response

        try{
            let response = await axios({
                method: 'put',
                url: '/admin/application/induction-exit',
                data: {
                    employee: this.state.users,
                    updates: this.state.updates,
                }
            })
        }catch(err){

        }
    }

    handleApplicationSubmit = async (e) => {
        e.preventDefault()
        let response

        if (this.state.users && this.state.applicationFormData.application) {
            try {
                response = await axios({
                    method: 'post',
                    url: '/admin/application/leave-type',
                    data: {
                        organization: this.props.organization,
                        name: this.state.applicationFormData.application,
                        employee: this.state.users
                    }
                })
                console.log("RESPONSE: ", response)

                if(response.data.status < 300){
                    this.setState(prevState => ({
                        checklistData: [
                            ...prevState.checklistData,
                            ...response.data.result,
                        ]
                    }))
                }

            }
            catch (err) {

            }
        }
    }

    render() {
        let { classes } = this.props
        let { checklistData, usersData, leaveTypes, query, applicationFormData } = this.state

        return (
            <Container>
                <div className={classes.actionPanel}>
                    <Search
                        title='employee'
                        submitHandler={this.onSearch}
                        changeHandler={this.handleChange}
                        value={query}
                    />
                    <ModalTrigger
                        title="Attach"
                        button
                        disabled={!this.state.users}
                    >
                        <AddEditForm
                            headerTitle="application"
                            fields={leaveTypes}
                            object={applicationFormData}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleApplicationSubmit}
                        />
                    </ModalTrigger>
                </div>
                <SelectableTable
                    title='users'
                    updateState={this.setUser}
                    data={usersData}
                    headers={[
                        { title: 'ID', value: 'emp_num', type: 'text' },
                        { title: 'Name', value: 'full_name', type: 'text' },
                    ]}
                    handleChange={this.handleChange}
                    selectEntity={this.selectEntity}
                />

                <Checklist
                    data={checklistData}
                    handleToggle={this.handleCheckboxChange}
                    updateHandler={this.handleUpdate}
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

export default compose(
    withStyles(style),
    connect(mapStateToProps, {})
)(EmployeeInduction)