import React from 'react'
import axios from 'axios'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import SelectableTable from './SelectableTable'
import Container from './MainContainer';
import Search from './Search';
import Checklist from './Checklist'
import DataTable from './DataTable'
import AddEditForm from './AddEditForm'
import { getUserOrganization } from '../reducers/authReducer';
import ModalTrigger from './ModalTrigger'
import AutoSuggest from './AutoSuggest';

const style = theme => ({
    actionPanel: {
        display: 'flex',
        flexDirection: 'row',
    },
})

const entitlementRows = [
    { id: ['function', 'val'], numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Entitlement' },
    { id: ['function', 'ATTRIB_11'], numeric: true, disablePadding: false, lengthRatio:'Small', label: 'No Of Days' },
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
        leaveData: [],
        applicationFormData: {},
        filter: 'name',
        value: '',
        query: '',
        isFetching: false,
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
            let values = response.data.data.map(row => (({row_id, val}) => ({ value: row_id, name: val }))(row))

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
                leaveData: response.data.data,
            }))
            console.log("LEAVE TYPE RESPONSE: ", response)
        }
        catch(err){
            
        }
    }

    onSearch = async () => {
        let response

        this.setState(prevState => ({
            isFetching: true,
        }))

        try {
            response = await axios({
                method: 'get',
                url: `/public/search/employee?${this.state.query}`,
                params: this.state.query
            })

            this.setState(prevState => ({
                usersData: response.data.result,
                isFetching: false,
            }))

            console.log("RESPONSE: ", response)
        }
        catch (err) {

        }
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
            query: `${this.state.filter}=${newValue}`
        });
    };

    clearSuggestions = () => {
        this.setState({
            usersData: []
        });
    }

    handleChange = (event, element) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            [`${element}FormData`]: {
                ...prevState[`${element}FormData`],
                [target]: value,
            }
        }))
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

    selectEmployee = (selected) => {
        console.log(selected)

        this.setState(prevState => ({
            users: selected.row_id,
        }), () => this.getChecklist())
    }

    selectEntity = (entity, primary, organization = null) => {
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
            // let newData = response.data.result.map(row => row.function)
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

    handleDelete = async(id) => {
        let response
        let newData = this.state.checklistData.filter(row => {
            return row.row_id !== id
        })

        try{
            response = await axios({
                method: 'delete',
                url: '/admin//employee/entitlements',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    row_id: id,
                },
            })

            this.setState(prevState => ({
                checklistData: newData,
            }))

            console.log("DELETE RESPONSE: ", response)
        }
        catch(err){

        }
    }

    handleApplicationSubmit = async (e) => {
        e.preventDefault()
        let response
        // let leaveType = this.state.leaveData.filter(row => row.name)

        if (this.state.users && this.state.applicationFormData.application) {
            try {
                response = await axios({
                    method: 'post',
                    url: '/admin/application/leave-type',
                    data: {
                        organization: this.props.organization,
                        name: this.state.applicationFormData.application.toString(),
                        leave: this.state.applicationFormData.application,
                        employee: this.state.users,
                    }
                })
                console.log("RESPONSE: ", response)

                if(response.data.status < 300){
                    this.setState(prevState => ({
                        checklistData: [
                            ...prevState.checklistData,
                            response.data.result,
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
        let { checklistData, usersData, leaveTypes, query, value, applicationFormData, isFetching } = this.state

        return (
            <Container>
                <div className={classes.actionPanel}>
                    <AutoSuggest
                        value={value}
                        apiCall={this.onSearch}
                        onChange={this.onChange}
                        onClear={this.clearSuggestions}
                        onSelect={this.selectEmployee}
                        suggestions={usersData}
                        isLoading={isFetching}
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
                
                <DataTable
                    headerTitle="Employee Entitlements"
                    rows={entitlementRows}
                    endpoint='admin/employee/entitlements'
                    data={checklistData}
                    actions
                    disableEdit
                    handleDelete={this.handleDelete}
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