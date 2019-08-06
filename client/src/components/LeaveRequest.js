import Container from './MainContainer'
import React, { Component } from 'react';
import ModalTrigger from './ModalTrigger';
import AddEditForm from './AddEditForm';
import { spacing } from '@material-ui/system';
import axios from 'axios';
import { flattenObject } from '../helpers/utils';
import {connect} from 'react-redux';
import { getUserOrganization } from '../reducers/authReducer';
import { getUser } from '../reducers/authReducer';


const leaveRequestFields = [
    { id: 'strt_dt', type:'date', label: 'From' },
    { id: 'end_dt', type:'date', label: 'To' },
    { id: 'type_cd', name: 'leaveRequestType', type:'select', label: 'Type', indeterminate: true, requestParams: {endPoint: '/admin/org-struct/organization', selectMapping: ['name', 'row_id', null, 'desc'], } },
]

class LeaveRequest extends Component {
    
    state = {
        leaveRequestForm: {

        },
    }

    handleChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            [`leaveRequestForm`]: {
                ...prevState[`leaveRequestForm`],
                [target]: value,
            }
        }))
    }

    handleSubmit = async(event, element) => {
     
        this.setState(prevState => ({
            [`leaveRequestForm`]: {
                ...prevState[`leaveRequestForm`],
                bu_id: this.props.organization,
                emp_id: this.props.userID,
            }
        }), () => { this.sendPostRequest(element, '/private/employee/leave/request', 'post') })

    }

    sendPostRequest = async (element, endpoint, method) => {
        let response;
        console.log(this.state[`leaveRequestForm`])
        let data = flattenObject(this.state[`leaveRequestForm`], '')
        console.log(data)

        try{
            response = await axios({
                method: method,
                url: `${endpoint}`,
                data
            })
            console.log(response)
           // this.handlePostResponse(response, element)
            return
        }
        catch(err){
            console.log(err)
            //this.handlePostResponse(err.response, element)
            return
        }
    }

    render() {
        let {leaveRequestForm} = this.state
        return (
            <div mt={2}>
                <ModalTrigger
                    title="Request a New Leave"
                    button
                    innerRef={node => this.modalRef = node}
                    onClose={this.unsetEditMode}
                >
                <AddEditForm
                    headerTitle="leaveRequestForm"
                    fields={leaveRequestFields}
                    object={leaveRequestForm}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                </ModalTrigger>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        organization: getUserOrganization(state),
        userID: getUser(state),
    
    }
}

export default connect(mapStateToProps)(LeaveRequest)