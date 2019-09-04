import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { alertActions } from '../actions'
import ModalTrigger from './ModalTrigger';
import DataTable from './DataTable';
import Container from './MainContainer';
import ActionPanel from './ActionPanel'
import RegisterEmployeeForm from './RegisterEmployeeForm'
import Search from './Search'

import AddButtonTable from './AddButtonTable'
import RestrictedHOC from './RestrictedHOC'

const employeeRows = [
	{ id: ['employee', 'emp_num'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'ID' },
	{ id: ['employee', 'full_name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
	{ id: ['employee', 'organization', 'name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Organization' },
	{ id: ['employee', 'division', 'name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Division' },
	{ id: ['employee', 'position_held', 'name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Position' },
	{ id: ['employee', 'responsibility', 'name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Responsibility' },
	{ id: ['employee', 'FLG_01'], type: 'toggle', numeric: false, disablePadding: true, lengthRatio: 'Action', label: 'Active', /* restricted: true  */},
]

class EditEmployee extends React.Component {
	modalRef = React.createRef()
	state = {
		data: [],
		selected: null,
		filter: 'name',
		query: '',
		searchQuery: '',
		isSearching: false,
		active: false,
		formData: {
			login: '',
			hash_pwd: '',
			fst_name: '',
			last_name: '',
			emp_num: '',
			bu_id: { label: '', value: null },
			div_id: { label: '', value: null },
			postn_held_id: { label: '', value: null },
			resp_id: { label: '', value: null },
			report_to_position: { label: '', value: null },
			report_to_id: { label: '', value: null },
			ATTRIB_01: '',
			ATTRIB_18: '',
		},
		editMode: false,
	}

	componentDidMount() {
		let params = new URLSearchParams(this.props.location.search);
		if (params.get("id")) {
			this.setState(prevProps => ({
				filter: 'id',
				searchQuery: `id=${params.get("id")}`,
			}), () => this.getList())
		}
		else {
			this.getList()
		}
	}

	getList = async () => {
		let response
		let params

		this.setState(prevState => ({
			isSearching: true,
		}))

		try {
			response = await axios({
				method: 'get',
				url: `/admin/employees?${this.state.searchQuery}`,
				headers: {
					'content-type': 'application/json',
				},
			})

			console.log(response)
			this.setState(prevState => ({
				data: response.data.data,
				isSearching: false,
			}))
		}
		catch (err) {

		}
	}

	setEditMode = (record) => {
		let employee = record.employee
		let newData = {
			row_id: employee.row_id,
			login: record.login,
			emp_num: employee.emp_num,
			fst_name: employee.fst_name,
			last_name: employee.last_name,
			bu_id: employee.organization ? {
				label: employee.organization.name,
				value: employee.organization.row_id
			} : { label: "", value: null },
			div_id: employee.division ? {
				label: employee.division.name,
				value: employee.division.row_id
			} : { label: "", value: null },
			postn_held_id: employee.position_held ? {
				label: employee.position_held.name,
				value: employee.position_held.row_id
			} : { label: "", value: null },
			resp_id: employee.responsibility ? {
				label: employee.responsibility.name,
				value: employee.responsibility.row_id
			} : { label: "", value: null },
			report_to_id: employee.manager ? {
				label: employee.manager.name,
				value: employee.manager.row_id
			} : { label: "", value: null },
		}
		this.setState(prevState => ({
			formData: {
				...prevState.formData,
				...newData,
				hash_pwd: 'ABCabc123.',
			},
			editMode: true,
		}), () => this.modalRef.handleModalOpen())
	}

	unsetEditMode = (event, reason) => {
		let formdata = {}
		employeeRows.forEach(row => formdata[row.id] = '')
		formdata.bu_id = { label: "", value: null }
		formdata.div_id = { label: "", value: null }
		formdata.postn_held_id = { label: "", value: null }
		formdata.report_to_id = { label: "", value: null }
		formdata.report_to_position = { label: "", value: null }
		formdata.resp_id = { label: "", value: null }

		this.setState(prevState => ({
			formData: formdata,
			editMode: false,
		}))
	}

	handleSelectChange = (property, value) => {
		return new Promise((resolve, reject) => {
			this.setState(prevState => ({
				formData: {
					...prevState.formData,
					[property]: value,
				},
			}), () => { resolve() })
		})
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

	onSearchSubmit = () => {

		this.getList()
	}

	handleChange = (target, value) => {
		return new Promise((resolve, reject) => {
			if (target === 'bu_id') {
				this.setState(prevState => ({
					formData: {
						...prevState.formData,
						[target]: value,
						div_id: { label: '', value: null },
						postn_held_id: { label: '', value: null },
						resp_id: { label: '', value: null },
						report_to_position: { label: "", value: null },
						report_to_id: { label: '', value: null },
					}
				}), () => { resolve() })
			}
			else if (target === 'div_id')
				this.setState(prevState => ({
					formData: {
						...prevState.formData,
						[target]: value,
						postn_held_id: { label: '', value: null },
						report_to_position: { label: "", value: null },
						report_to_id: { label: '', value: null },
					}
				}), () => { resolve() })
			else if (target === 'report_to_position')
				this.setState(prevState => ({
					formData: {
						...prevState.formData,
						[target]: value,
						report_to_id: { label: '', value: null },
					}
				}), () => { resolve() })
			else {
				this.setState(prevState => ({
					formData: {
						...prevState.formData,
						[target]: value,
					}
				}), () => { resolve() })
			}
		})
	}

	handleSwitchChange = async (checked, data) => {
		let id = data.row_id
		return new Promise(async (resolve, reject) => {
			let response
			let selected = this.state.data.filter(row => {
				return row.row_id == id
			})[0]

			try {
				response = await axios({
					method: 'post',
					url: '/admin/employees/changeStatus',
					headers: {
						'content-type': 'application/json',
					},
					data: {
						checked,
						employee: selected.employee.row_id,
					},
				})

				console.log("ACTIVE RESPONSE: ", response)

				if (response.data.status === 200) {
					this.props.success(response.data.message)
					resolve()
				}
				else {
					this.props.error(response.data)
					reject()
				}
			}
			catch (err) {
				this.props.error({ message: "Action couldn't be completed" })
				reject()
			}
		})
	}

	handleSubmit = async () => {
		let response

		if (this.state.editMode) {
			this.handleUpdate()
		}
		else {
			this.handleAdd()
		}
	}

	handleResponse = (res, err) => {
		let response = res.data ? res.data : response;

		if (response === undefined) {
			this.props.error('Action Failed, Try Again')
		}

		if (err || response.status >= 400) {
			let error = response.message || 'Action Failed, Try Again'
			this.props.error(error)
		}
		else {
			let message = response.message || 'Action Successful'
			this.props.success(message)
			this.unsetEditMode()
		}

	}

	handleUpdate = async () => {
		let response
		let id = this.state.formData.row_id
		let newData = this.state.data.filter(row => {
			return row.row_id !== id
		})

		newData.push(this.state.formData)

		try {
			response = await axios({
				method: 'put',
				url: '/admin/employees',
				headers: {
					'content-type': 'application/json',
				},
				data: this.state.formData,
			})

			console.log(response)

			if (response.data.status >= 200 && response.data.status < 300) {
				this.setState(prevState => ({
					data: [
						...newData,
						response.data.data,
					]
				}))

				this.props.success('User Updated Succesfully')
			}
			else {
				this.props.error(response.data)
			}
		}
		catch (err) {

		}
	}

	handleAdd = async () => {
		let response
		let employee = this.state.formData

		try {
			response = await axios({
				method: 'post',
				url: '/auth/register',
				data: employee,
				headers: {
					'content-type': 'application/json',
				}
			})
			console.log(response)
			if (response.data.status === 200) {
				this.setState(prevState => ({
					data: [
						...prevState.data,
						response.data.data
					]
				}))
				let message = response.message || 'Action Successful'
				this.props.success(message)
				this.unsetEditMode()
			}
			else {
				this.props.error(response.data)
			}
		}
		catch (err) {
			this.props.error(response.data)
		}
	}

	handleDelete = async (id) => {
		let response
		let newData = this.state.data.filter(row => {
			return row.row_id !== id
		})

		let selected = this.state.data.filter(row => {
			return row.row_id == id
		})[0]

		try {
			response = await axios({
				method: 'delete',
				url: '/admin/employees',
				headers: {
					'content-type': 'application/json',
				},
				data: {
					row_id: selected.employee.row_id,
				},
			})

			if (response.data.data < 400)
				this.setState(prevState => ({
					data: newData,
				}))

			this.handleResponse(response)

		}
		catch (err) {
			this.handleResponse(err.response, true)
		}
	}

	selectEmployee = (selected) => {

		this.setState(prevState => ({
			selected,
		}))
	}

	render() {
		let { organization, classes, location } = this.props
		let { data, formData, editMode, query, isSearching, selected, active } = this.state

		let AddComponent =
			<AddButtonTable
				restriction='write'
				ref={node => this.modalRef = node}
				unsetEditMode={this.unsetEditMode}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				ref={node => this.modalRef = node}
				editMode={editMode}
				formData={formData}
			>
				<RegisterEmployeeForm
					employee={formData}
					changeHandler={this.handleChange}
					submitHandler={this.handleSubmit}
					editMode={editMode}
				/>
			</AddButtonTable>

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
				<DataTable
					headerTitle="Employee List"
					rows={employeeRows}
					params={{ organization: organization }}
					data={data}
					actions
					selectEntity={this.selectEmployee}
					setEditMode={this.setEditMode}
					unsetEditMode={this.unsetEditMode}
					handleDelete={this.handleDelete}
					handleSwitchChange={this.handleSwitchChange}
					editMode={editMode}
					actionBar={[AddComponent]}
				/>
			</Container>
		);
	}
}

export default connect(() => { }, { ...alertActions })(EditEmployee)