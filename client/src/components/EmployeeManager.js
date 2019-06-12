import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { alertActions } from '../actions'
import ModalTrigger from './ModalTrigger';
import AddEditForm from './AddEditForm';
import DataTable from './DataTable';
import Container from './MainContainer';
import RegisterEmployeeForm from './RegisterEmployeeForm'

const employeeRows = [
  { id: 'full_name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
  { id: 'bu_id', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Organization' },
]

const formFields = [
  { id: 'val', type: 'text', label: 'Name' },
  { id: 'type', type: 'select', label: 'Type', selectOptions: [{ value: 'leave_type', name: 'Leave Type' }], defaultValue: 'leave_type', readOnly: true, },
  { id: 'ATTRIB_11', type: 'number', label: 'No Of Days', inputProps: { min: '1', max: '50', step: '1' } },
]

class EditEmployee2 extends React.Component {
  modalRef = React.createRef()
  state = {
    data: [],
    formData: {
      login: '',
      hash_pwd: '',
      fst_name: '',
      last_name: '',
      emp_num: '',
      bu_id: null,
      div_id: null,
      post_held_id: null,
      resp_id: null,
      report_to_id: null,
    },
    editMode: false,
  }

  setEditMode = (record) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        ...record,
        hash_pwd: 'ABCabc123.',
      },
      editMode: true,
    }), () => this.modalRef.handleModalOpen())
  }

  unsetEditMode = (event, reason) => {
    let formdata = {}
    employeeRows.forEach(row => formdata[row.id] = '')
    console.log("UNSET EDIT", formdata)

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
    }), () => {console.log("STOOOT: ", this.state);resolve()})
    })
  }

  handleChange = (target, value) => {
    return new Promise((resolve, reject) => {
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [target]: value,
        }
      }), () => resolve())
    })
  }

  handleSubmit = async () => {
    let response

    if (this.state.editMode) {
      console.log("HELLLOOOO")
      this.handleUpdate()
    }
    else {
      this.handleAdd()
    }
  }

  handleResponse = (res, err) => {
    let response = res.data ? res.data : response;
    console.log(response)
    if(response === undefined){
      this.props.error('Action Failed, Try Again')
    }

    if(err || response.status >= 400){
      let error = response.message || 'Action Failed, Try Again'
      this.props.error(error)
    }
    else{
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

      console.log("UPDATE RESPONSE: ", response)

      if (response.data.status >= 200 && response.data.status < 300) {
        this.setState(prevState => ({
          data: newData,
        }))

        this.props.success('User Updated Succesfully')
      }
      else{
        this.props.error('User Update Failed')
      }
    }
    catch (err) {

    }
  }

  handleAdd = async () => {
    let response
    let employee = this.state.formData

    try{
      response = await axios({
          method: 'post',
          url: '/auth/register',
          data: employee,
          headers: {
              'content-type': 'application/json',
          }
      })
      console.log(response)
      this.handleResponse(response)
    }
    catch(err){
      console.log(err)
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

      if(response.data.data < 400)
        this.setState(prevState => ({
          data: newData,
        }))

      this.handleResponse(response)

    }
    catch (err) {
      this.handleResponse(err.response, true)
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    let response

    try {
      response = await axios({
        method: 'get',
        url: '/admin/employees',
        headers: {
          'content-type': 'application/json',
        },
        params: {
          organization: this.props.organization,
        },
      })
      this.setState(prevState => ({
        data: response.data.data,
      }))
      console.log("RESPONSE: ", response)
    }
    catch (err) {

    }
  }

  render() {
    let { organization } = this.props
    let { data, formData, editMode } = this.state

    return (
      <Container>
        <ModalTrigger
          title="Add"
          button
          innerRef={node => this.modalRef = node}
          disabled={editMode}
          onClose={this.unsetEditMode}
        >
          <RegisterEmployeeForm
            headerTitle="LeaveTypes"
            fields={formFields}
            employee={formData}
            changeHandler={this.handleChange}
            submitHandler={this.handleSubmit}
            editMode={editMode}
          />
        </ModalTrigger>
        <DataTable
          headerTitle="Employee List"
          rows={employeeRows}
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
    );
  }
}

export default connect(()=>{}, {...alertActions})(EditEmployee2)