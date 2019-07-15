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

const employeeRows = [
  { id: ['employee', 'emp_num'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'ID' },
  { id: ['employee', 'full_name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'First Name' },
  { id: ['employee', 'organization','name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Organization' },
  { id: ['employee', 'division','name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Division' },
  { id: ['employee','position_held','name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Position' },
  { id: ['employee','responsibility','name'], type: 'text', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Responsibility' },
  { id: ['employee', 'FLG_01'], type: 'toggle', numeric: false, disablePadding: true, lengthRatio: 'Action', label: 'Active' },
]

const formFields = [
  { id: 'val', type: 'text', label: 'Name' },
  { id: 'type', type: 'select', label: 'Type', selectOptions: [{ value: 'leave_type', name: 'Leave Type' }], defaultValue: 'leave_type', readOnly: true, },
  { id: 'ATTRIB_11', type: 'number', label: 'No Of Days', inputProps: { min: '1', max: '50', step: '1' } },
]

class EditEmployee extends React.Component {
  modalRef = React.createRef()
  state = {
    data: [],
    selected: null,
    query: '',
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
      report_to_id: { label: '', value: null },
    },
    editMode: false,
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    if(params.get("id")){
      this.getList({ row_id: params.get("id") })
    }
    else{
      this.getList()
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
      } : {label:"", value:null},
      div_id: employee.division ? { 
        label: employee.division.name,
        value: employee.division.row_id
      } : {label:"", value:null},
      postn_held_id: employee.position_held ? { 
        label: employee.position_held.name,
        value: employee.position_held.row_id
      } : {label:"", value:null},
      resp_id: employee.responsibility ? { 
        label: employee.responsibility.name,
        value: employee.responsibility.row_id
      } : {label:"", value:null},
      report_to_id: employee.manager ? { 
        label: employee.manager.name,
        value: employee.manager.row_id
      } : {label:"", value:null},
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

  onSearchChange = (e) => {
    let value = e.target.value
    this.setState(prevState => ({
      query: value,
    }))
  }

  handleChange = (target, value) => {
    return new Promise((resolve, reject) => {
      if(target === 'bu_id'){
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [target] : value,
                div_id: { label : '', value: null },
                postn_held_id: { label : '', value: null },
                resp_id: { label : '', value: null },
                report_to_id: { label : '', value: null },
            }
        }), () => {resolve()})
      }
      else if(target === 'div_id')
          this.setState(prevState => ({
              formData: {
                  ...prevState.formData,
                  [target] : value,
                  postn_held_id: { label : '', value: null },
                  report_to_id: { label : '', value: null },
              }
          }), () => {resolve()})
      else {
          this.setState(prevState => ({
              formData: {
                  ...prevState.formData,
                  [target] : value,
              }
          }), () => {resolve()})
      }
    })
  }

  handleSwitchChange = async (checked, id) => {
    return new Promise(async (resolve, reject) => {
      let response

      try {
        response = await axios({
          method: 'post',
          url: '/admin/employees/changeStatus',
          headers: {
            'content-type': 'application/json',
          },
          data: {
            checked,
            employee: id,
          },
        })

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
        this.props.error({message: "Action couldn't be completed"})
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
          data: newData,
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
      this.handleResponse(response)
    }
    catch (err) {
      this.handleResponse(err.response, true)
    }
  }

  handleDelete = async (id) => {
    let response
    let newData = this.state.data.filter(row => {
      return row.row_id !== id
    })

    try {
      response = await axios({
        method: 'delete',
        url: '/admin/employees',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          row_id: id,
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

  getList = async (searchQuery) => {
    let response

    this.setState(prevState => ({
      isSearching: true,
    }))

    try {
      response = await axios({
        method: 'get',
        url: '/admin/employees',
        headers: {
          'content-type': 'application/json',
        },
        params: {
          query: searchQuery || this.state.query,
          organization: this.props.organization,
        },
      })

      this.setState(prevState => ({
        data: response.data.data,
        isSearching: false,
      }))
    }
    catch (err) {

    }
  }

  render() {
    let { organization, classes } = this.props
    let { data, formData, editMode, query, isSearching, selected, active } = this.state

    return (
      <Container>
        <ActionPanel>
          <Search
            title="Employee"
            query={query}
            submitHandler={this.getList}
            changeHandler={this.onSearchChange}
            isSearching={isSearching}
          />
          <ModalTrigger
            title="Add"
            button
            innerRef={node => this.modalRef = node}
            disabled={editMode}
            onClose={this.unsetEditMode}
          >
            <RegisterEmployeeForm
              employee={formData}
              changeHandler={this.handleChange}
              submitHandler={this.handleSubmit}
              editMode={editMode}
            />
          </ModalTrigger>
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
        />
      </Container>
    );
  }
}

export default connect(() => { }, { ...alertActions })(EditEmployee)