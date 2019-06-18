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
import AutoSuggest from './AutoSuggest';
import { alertActions } from '../actions';

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
    { id: 'application', type: 'select', label: 'Apply For', selectOptions: [{ value: 'induction_checklist', name: 'Induction' }, { value: 'exit_checklist', name: 'Exit' }] },
]

class EmployeeInduction extends React.Component {
    state = {
        updates: {},
        usersData: [],
        checklistData: [],
        applicationFormData: {},
        query: '',
        isFetching: false,
    }

    onSearch = async () => {
        let response

        this.setState(prevState => ({
            isFetching: true,
        }))

        try {
            response = await axios({
                method: 'get',
                url: '/public/search/employee',
                params: {
                    query: this.state.query
                }
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

    selectEmployee = (selected) => {
        console.log(selected)

        this.setState(prevState => ({
            selected: selected.row_id,
        }), () => this.getChecklist())
    }

    clearSuggestions = () => {
        this.setState({
            usersData: [],
            // checklistData: [],
            // selected: null,
        });
    }

    onSearchChange = (event, { newValue }) => {
        this.setState({
            query: newValue
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

    getChecklist = async() => {
        let response

        try{
            let response = await axios({
                method: 'get',
                url: '/admin/application/induction-exit',
                params: {
                    employee: this.state.selected,
                }
            })

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

    handleApplicationSubmit = async () => {
        
        let response

        if (this.state.selected && this.state.applicationFormData.application) {
            try {
                response = await axios({
                    method: 'post',
                    url: '/admin/application/induction-exit',
                    data: {
                        organization: this.props.organization,
                        type: this.state.applicationFormData.application,
                        employee: this.state.selected
                    }
                })
                console.log(response)

                if(response.data.status <= 200){
                    this.setState(prevState => ({
                        checklistData: [
                            ...prevState.checklistData,
                            ...response.data.result,
                        ]
                    }))

                    this.props.success('Action Successfull')
                }
                else{
                    console.log(response.data.message)
                    this.props.error(response.data)
                }
                console.log("RESPONSE: ", response.data.result)
            }
            catch (err) {

            }
        }
    }

    render() {
        let { classes } = this.props
        let { checklistData, usersData, query, applicationFormData, isFetching } = this.state

        return (
            <Container>
                <div className={classes.actionPanel}>
                    <AutoSuggest
                        value={query}
                        apiCall={this.onSearch}
                        onChange={this.onSearchChange}
                        onClear={this.clearSuggestions}
                        onSelect={this.selectEmployee}
                        suggestions={usersData}
                        isLoading={isFetching}
                    />
                    <ModalTrigger
                        title="Apply"
                        button
                        disabled={!this.state.selected}
                    >
                        <AddEditForm
                            headerTitle="application"
                            fields={applicationFormFields}
                            object={applicationFormData}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleApplicationSubmit}
                        />
                    </ModalTrigger>
                </div>

                <Checklist
                    data={checklistData}
                    handleToggle={this.handleCheckboxChange}
                    updateHandler={this.handleUpdate}
                    filterOptions={[
                        { name: 'Induction Checklist', value: 'induction_checklist' },
                        { name: 'Exit Checklist', value: 'exit_checklist' }
                    ]}
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
    connect(mapStateToProps, {...alertActions})
)(EmployeeInduction)