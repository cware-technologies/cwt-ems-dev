import React, { Component, lazy, Suspense } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import RenewIcon from '@material-ui/icons/Autorenew'

import Container from './MainContainer';
import LoadingSpinner from './LoadingSpinner';
import { getUserOrganization } from '../reducers/authReducer';
import { alertActions } from '../actions';

const Table = lazy(() => import('./DataTable'))

const rows = [
    { id: 'emp_num', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Emp ID' },
    { id: 'fst_name', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'First Name' },
    { id: 'last_name', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Last Name' },
]

const fields = []

export class ContractsManager extends Component {
    state = {
        data: [],
        employees: [],
    }

    componentDidMount(){
        this.getContracts()
    }

    getContracts = async() => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: '/admin/employee/contracts',
            })

            console.log(response)

            this.setState(prevState => ({
                data: response.data.data,
            }))
        }
        catch(err){

        }
    }

    renewContracts = async () => {
        let decision = window.confirm("Are you sure you want to renew selected employees' contracts?")
        if(decision){
            let response
            let employees = this.state.employees
            let newData = this.state.data.map( record => {

                let value = this.state.employees.filter(element => record.row_id === element )[0]
                if(value){
                    return
                }
                else{
                    return record
                }
            }).filter(element => element)

            console.log("NewData: ", newData);
            console.log("employees: ", employees);

            try{
                response = await axios({
                    method: 'post',
                    url: '/admin/employee/contracts',
                    data: employees,
                })

                if(response.data.status === 200){
                    this.setState((state, props) => { return { 
                        data: newData,
                     }})
                    this.props.success("Contracts Renewed Successfully")
                }
                else{
                    this.props.error({message: "Contracts could not be renewed!"})
                }
            }
            catch(err){
                this.props.error({message: "Contracts could not be renewed!"})                
            }
        }
        else{

        }
    }

    selectEntity = (entity, primary, organization) => {
        this.setState(prevState => ({
            [entity]: primary,
        }), () => console.log(this.state))
    }

    clearSelection = (entity, rest) => {
        let newValue = rest

        let newState = {
            [entity]: newValue,
        }

        this.setState(prevState => newState)
    }

    render() {
        const { data, employees } = this.state

        let RenewComp = 
            <Tooltip title="Renew">
                <IconButton aria-label="Renew" onClick={this.renewContracts} disabled={ employees.length <= 0}>
                    <RenewIcon />
                </IconButton>
            </Tooltip>

        return (
            <Container>
                <Suspense fallback={<LoadingSpinner/>}>
                    <Table
                        headerTitle="employees"
                        data={data}
                        rows={rows}
                        isSelectable
                        selectMultiple
                        selectEntity={this.selectEntity}
                        clearSelection={this.clearSelection}
                        editMode={false}
                        actionBar={[ RenewComp ]}
                    />
                </Suspense>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    organization: getUserOrganization(state),
})

export default connect(mapStateToProps, {...alertActions})(ContractsManager)
