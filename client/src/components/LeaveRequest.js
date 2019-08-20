import Container from './MainContainer'
import React, { Component } from 'react';
import ModalTrigger from './ModalTrigger';
import AddEditForm from './AddEditForm';
import { spacing } from '@material-ui/system';
import axios from 'axios';
import { flattenObject, calculateNumOfDays, checkPastDate } from '../helpers/utils';
import { connect } from 'react-redux';
import { getUserOrganization } from '../reducers/authReducer';
import { getUser } from '../reducers/authReducer';
import { alertActions } from '../actions/alertActions';



class LeaveRequest extends Component {

    state = {
        leaveRequestForm: {

        },
    }

    leaveRequestFields = [
        { id: 'strt_dt', type: 'date', label: 'From' },
        { id: 'end_dt', type: 'date', label: 'To' },
        { id: 'type_cd', name: 'leaveRequestType', type: 'select', label: 'Type', indeterminate: true, requestParams: { endPoint: '/private/employee/entitlements', params: { emp_id: this.props.userID }, selectMapping: ['val', 'row_id', null, null], } },
        { id: 'ATTRIB_01', type: 'textarea', label: 'Details' },
    ]

    componentDidMount() {


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

    isRemainingDays = async (days, type) => {
        let response
        let params

        try {
            response = await axios({
                method: 'get',
                url: `/private/employee/leavesCount`,
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    emp_id: this.props.userID,
                    bu_id: this.props.organization,
                    type_cd: type,
                    days: days
                }
            })

            this.setState(prevState => ({
                data: response.data.data
            }))
        }
        catch (err) {

        }
        console.log(response.data.isRemaining)
        return response.data.isRemaining
    }

    handleSubmit = async (event, element) => {
        let dateFrom = this.state.leaveRequestForm.strt_dt
        let dateTo = this.state.leaveRequestForm.end_dt
        let days = calculateNumOfDays(dateTo, dateFrom)
        let validate = await this.isRemainingDays(days, this.state.leaveRequestForm.type_cd.value)
        console.log(validate)
        console.log(this.state.leaveRequestForm.strt_dt)

        if (checkPastDate(dateFrom, dateTo) == false) {
            console.log("You can not select date from past")
            this.props.error({
                message: "You can not select date from past"
            })
        }
        else if (validate == true) {
            this.setState(prevState => ({
                [`leaveRequestForm`]: {
                    ...prevState[`leaveRequestForm`],
                    ATTRIB_11: days,
                    bu_id: this.props.organization,
                    emp_id: this.props.userID,
                }
            }), () => { this.sendPostRequest(element, '/private/employee/leave/request', 'post') })
        }
        else {
            console.log("Your are not allowed to request these number of leaves")
            this.props.error({
                message: "You do not have this much remaining days for this leave type"
            })
        }
    }

    sendPostRequest = async (element, endpoint, method) => {
        let response;
        console.log(this.state[`leaveRequestForm`])
        let data = flattenObject(this.state[`leaveRequestForm`], '')
        console.log(data)

        try {
            response = await axios({
                method: method,
                url: `${endpoint}`,
                data
            })
            console.log(response)
            // this.handlePostResponse(response, element)
            this.props.success("Leave Request posted Successfully")
            return
        }
        catch (err) {
            console.log(err)
            //this.handlePostResponse(err.response, element)
            return
        }
    }

    render() {
        let { leaveRequestForm } = this.state
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
                        fields={this.leaveRequestFields}
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

export default connect(mapStateToProps, { ...alertActions })(LeaveRequest)