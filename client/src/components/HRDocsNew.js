import React, { Component } from 'react';
import ModalTrigger from './ModalTrigger';
import AddEditForm from './AddEditForm';
import axios from 'axios';
import { flattenObject, calculateNumOfDays, checkPastDate } from '../helpers/utils';
import { connect } from 'react-redux';
import { getUserOrganization } from '../reducers/authReducer';
import { getUser } from '../reducers/authReducer';
import { getUsersName } from '../reducers/authReducer';
import { alertActions } from '../actions/alertActions';
import RestrictedComponent from './RestrictedComponent'

let baseState = ''
class ExpenseClaimNew extends Component {

    state = {
        selectedFile: null,
        ticketRequestForm: {

        },
        ticketNumber: 0,
    }

    ticketRequestFields = [
        { type: 'text', label: 'Name', defaultValue: this.props.user_name, readOnly: true },
        { id: 'created', type: 'text', label: 'Date', },
        { id: 'ATTRIB_11', type: 'select', label: 'Document Type',indeterminate: true, requestParams: {
            endPoint: '/admin/hr-doc-type',
            selectMapping: ['val', 'row_id', null, null], 
        } },
        { id: 'ATTRIB_01', type: 'textarea', label: 'Details' },
    ]

    async componentDidMount() {
        baseState = this.state
        let today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDate()
        let date = day + "/" + month + "/" + year

        let temp = this.ticketRequestFields.filter(ele => ele.id === 'created')[0]
        temp.defaultValue = date
        temp.readOnly = true
    }

    handleChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            [`ticketRequestForm`]: {
                ...prevState[`ticketRequestForm`],
                [target]: value,
            }
        }))
    }

    handleSubmit = async (event, element) => {
        this.setState(prevState => ({
            [`ticketRequestForm`]: {
                ...prevState[`ticketRequestForm`],
                bu_id: this.props.organization,
                emp_id: this.props.userID,
                type_cd: 'hr_docs',
                stat_cd: 'open'
            }
        }), () => { this.sendPostRequest(element, '/private/employee/ticket/request', 'post') })
    }

    sendPostRequest = async (element, endpoint, method) => {
        let response;
        console.log(this.state[`ticketRequestForm`])
        let data = flattenObject(this.state[`ticketRequestForm`], '')

        try {
            response = await axios({
                method: method,
                url: `${endpoint}`,
                data
            })
            console.log(response)
            this.props.success("Document Request posted Successfully")
            this.setState(baseState)
            return
        }
        catch (err) {

            return
        }
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleModalOpen = (e) => {
        this.setState({ modalOpen: true });
    };


    render() {
        let { ticketRequestForm } = this.state

        return (
            <div mt={2}>
                <RestrictedComponent
                    restriction='write'
                >
                    <ModalTrigger
                        title="New Document Request"
                        button
                        innerRef={node => this.modalRef = node}
                        onClose={this.unsetEditMode}
                    >
                        <AddEditForm
                            headerTitle="HR Document Request"
                            fields={this.ticketRequestFields}
                            object={ticketRequestForm}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                    </ModalTrigger>
                </RestrictedComponent>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        organization: getUserOrganization(state),
        userID: getUser(state),
        user_name: getUsersName(state)
    }
}

export default connect(mapStateToProps, { ...alertActions })(ExpenseClaimNew)