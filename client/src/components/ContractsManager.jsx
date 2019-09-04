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

import ActionPanel from './ActionPanel'
import Search from './Search'
import RestrictedComponent from './RestrictedComponent'

const Table = lazy(() => import('./DataTable'))

const rows = [
    { id: ['employee', 'emp_num'], numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Emp ID' },
    { id: ['employee', 'fst_name'], numeric: false, disablePadding: true, lengthRatio:'Title', label: 'First Name' },
    { id: ['employee', 'last_name'], numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Last Name' },
]

const fields = []

export class ContractsManager extends Component {
    state = {
        data: [],
        employees: [],
        filter: 'name',
		query: '',
		searchQuery: '',
		isSearching: false,
		active: false,
    }

    componentDidMount(){
        this.getContracts()
    }

    changeSearchFilter = (filter) => {
		console.log("CHANGE SEARCH FILTER")
		if (filter) {
			this.setState(prevProps => ({
				filter: filter,
				searchQuery: `${filter}=${prevProps.query}`
			}), () => console.log(this.state))
		}
	}

	onSearchChange = (e) => {
		let value = e.target.value
		this.setState(prevState => ({
			query: value,
			searchQuery: `${this.state.filter}=${value}`,
		}))
	}

	onSearchSubmit = async () => {
        this.setState({
            isSearching: true,
        })
        try{
            await this.search()

            this.setState(prevState => ({
                isSearching: false,
            }))
        }
        catch(err){
            this.setState({
                isSearching: true,
            })
            this.props.error("Search Failed")
        }
	}

    getContracts = async() => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: `/admin/employee/contracts`,
            })

            console.log(response)

            this.setState(prevState => ({
                data: response.data.data,
            }))
        }
        catch(err){
            throw(err)
        }
    }

    search = async() => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: `/admin/employee/contracts/search?${this.state.searchQuery}`,
            })

            console.log(response)

            this.setState(prevState => ({
                data: response.data.data,
            }))
        }
        catch(err){
            throw err
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

                console.log("REPPPOOONSE: ", response)

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
        const { data, employees, query, isSearching } = this.state

        let RenewComp =
            <RestrictedComponent
                restriction='write'
            >
                <Tooltip title="Renew">
                    <IconButton aria-label="Renew" onClick={this.renewContracts} disabled={ employees.length <= 0}>
                        <RenewIcon />
                    </IconButton>
                </Tooltip>
            </RestrictedComponent>

        return (
            <Container>
                <ActionPanel>
					<Search
						title="Employee"
						query={query}
						submitHandler={this.onSearchSubmit}
						changeHandler={this.onSearchChange}
						isSearching={isSearching}
						searchFilterProps={{
							changeFilter: this.changeSearchFilter,
							filters: ['id', 'name', 'location', 'organization', 'division', 'status'],
							filterMapping: {
								id: 'emp_num',
								name: 'name',
								location: 'ATTRIB_01',
								organization: 'bu_id',
								division: 'div_id',
								status: 'FLG_01',
							}
						}}
					/>
				</ActionPanel>
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
