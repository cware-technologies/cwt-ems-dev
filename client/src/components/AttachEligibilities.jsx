import React from 'react'
import axios from 'axios'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DataTable from './DataTable'
import AddEditForm from './AddEditForm'
import { getUserOrganization } from '../reducers/authReducer';
import ModalTrigger from './ModalTrigger'
import AutoSuggest from './AutoSuggest';
import ActionPanel from './ActionPanel';
import { alertActions } from '../actions';

import RestrictedComponent from './RestrictedComponent'

const style = theme => ({
    actionPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

const rows = [
    { id: ['function', 'val'], numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Eligibility' },
]

class AttachEligibilities extends React.Component {
    state = {
        updates: {},
        usersData: [],
        user: null,
        checklistData: [],
        data: [],
        applicationFormData: {
            ATTRIB_11: null,
        },
        filter: 'name',
        value: '',
        query: '',
        isFetching: false,
    }

    fields = [
        { id: 'ATTRIB_11', type: 'select', label: 'Eligibility', indeterminate: true, requestParams: {
            endPoint: '/admin/employee/eligibility',
            params: { bu_id: this.props.organization },
            selectMapping: ['val', 'row_id', null, null], 
        }},
    ]

    componentDidMount() {
        let params = new URLSearchParams(this.props.location.search);
        if (params.get("id")) {
            this.setState(prevProps => ({
                filter: 'id',
                query: `id=${params.get("id")}`,
            }), () => {
                this.onSearch()
                .then(res => {
                    this.selectEmployee(this.state.usersData[0])
                })
            })
        }
    }

    changeSearchFilter = (filter) => {
        if(filter){
            this.setState(prevProps => ({
                filter,
                query: `${this.state.filter}=${prevProps.value}`
            }))
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
            usersData: [],
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

    selectEmployee = (selected) => {
        console.log(selected)

        this.setState(prevState => ({
            user: selected.row_id,
        }), () => this.getChecklist())
    }

    getChecklist = async() => {
        let response
        console.log(this.state)
        try{
            let response = await axios({
                method: 'get',
                url: '/admin/employee/attachedEligibilities',
                params: {
                    emp_id: this.state.user,
                }
            })
            console.log("RESRESRES: ", response)
            // let newData = response.data.result.map(row => row.function)
            this.setState(prevState => ({
                checklistData: response.data.result,
            }))
        }catch(err){
            console.log("RESRESRES: ", response)
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
                url: '/admin/employee/detachEligibility',
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

            this.props.success("Eligibility dettached successfully.")
        }
        catch(err){
            this.props.error({ message: "Eligibility dettachment failed." })
        }
    }

    handleApplicationSubmit = async (e) => {
        e.preventDefault()
        let response
        // let leaveType = this.state.data.filter(row => row.name)

        if (this.state.user && this.state.applicationFormData.ATTRIB_11) {
            try {
                response = await axios({
                    method: 'post',
                    url: '/admin/employee/attachEligibility',
                    data: {
                        ATTRIB_11: this.state.applicationFormData.ATTRIB_11.value,
                        bu_id: this.props.organization,
                        name: this.state.applicationFormData.ATTRIB_11.value,
                        emp_id: this.state.user,
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
                    this.props.success("Eligibility attached successfully!")
                }

            }
            catch (err) {

            }
        }
    }

    render() {
        let { classes } = this.props
        let { checklistData, usersData, query, value, applicationFormData, isFetching } = this.state

        return (
            <React.Fragment>
                <ActionPanel>
                    <AutoSuggest
                        value={value}
                        apiCall={this.onSearch}
                        onChange={this.onChange}
                        onClear={this.clearSuggestions}
                        onSelect={this.selectEmployee}
                        suggestions={usersData}
                        isLoading={isFetching}
                        searchFilterProps={{
                            changeFilter: this.changeSearchFilter,
                            filters: [ 'id', 'name', 'location', 'position', 'division', 'responsibility' ],
                            filterMapping: {
                                id: 'emp_num',
                                name: 'name',
                                location: 'ATTRIB_01',
                                position: 'postn_held_id',
                                division: 'div_id',
                                responsibility: 'resp_id',
                            }
                        }}
                    />
                    <RestrictedComponent
                        restriction='write'
                    >
                        <ModalTrigger
                            title="Attach"
                            button
                            disabled={!this.state.user}
                        >
                            <AddEditForm
                                headerTitle="application"
                                fields={this.fields}
                                object={applicationFormData}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleApplicationSubmit}
                                editMode={false}
                            />
                        </ModalTrigger>
                    </RestrictedComponent>
                </ActionPanel>
                
                <DataTable
                    headerTitle="Employee Eligibilities"
                    rows={rows}
                    endpoint='admin/employee/entitlements'
                    data={checklistData}
                    actions
                    disableEdit
                    handleDelete={this.handleDelete}
                />
            </React.Fragment>
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
    connect(mapStateToProps, {...alertActions})
)(withRouter(AttachEligibilities))