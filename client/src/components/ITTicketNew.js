import React, { Component } from 'react';
import ModalTrigger from './ModalTrigger';
import AddEditForm from './AddEditForm';
import axios from 'axios';
import { flattenObject, calculateNumOfDays, checkPastDate } from '../helpers/utils';
import { connect } from 'react-redux';
import { getUserOrganization } from '../reducers/authReducer';
import { getUser } from '../reducers/authReducer';
import { alertActions } from '../actions/alertActions';
import { getUsersName } from '../reducers/authReducer';

let baseState = ''
class ITTicketNew extends Component {

    state = {
        selectedFile: null,
        ticketRequestForm: {
            fileName: null,
        },
        ticketNumber: 0,
    }

    ticketRequestFields = [
        //{ id: 'ATTRIB_02', type: 'text', label: 'Ticket #' },
        { type: 'text', label: 'Name', defaultValue: this.props.user_name, readOnly: true },
        { id: 'created', type: 'text', label: 'Date', },
        {
            id: 'ATTRIB_11', type: 'select', label: 'Ticket Type', indeterminate: true, requestParams: {
                endPoint: '/admin/it-tickets-type',
                selectMapping: ['val', 'row_id', null, null],
            }
        },
        { id: 'ATTRIB_01', type: 'textarea', label: 'Details' },
    ]

    async componentDidMount() {
        //this.ticketNumber()
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

    // ticketNumber = async () => {
    //     let response
    //     let params

    //     try {
    //         response = await axios({
    //             method: 'get',
    //             url: `/private/employee/ticketsCount`,
    //             headers: {
    //                 'content-type': 'application/json',
    //             },
    //             params: {
    //                 bu_id: this.props.organization
    //             }
    //         })
    //     }

    //     catch (err) {

    //     }

    //     let temp2 = this.ticketRequestFields.filter(ele => ele.id === 'ATTRIB_02')[0]
    //     temp2.defaultValue = response.data.data + 1
    //     temp2.readOnly = true
    //     this.setState(prevState => ({
    //         [`ticketRequestForm`]: {
    //             ...prevState[`ticketRequestForm`],
    //             [temp2.id]: temp2.defaultValue,
    //         }
    //     }))
    // }

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
                type_cd: 'IT-Ticket',
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
            
            this.props.success("Ticket Request posted Successfully")
            this.setState(baseState)
            return
        }
        catch (err) {

            return
        }
    }

    checkFileSize = (event) => {
        let files = event.target.files
        let size = 2000000
        let err = [];
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                console.log("File size toooo large")
                return false
            }
        }
        return true
    }

    onChangeHandler = event => {
        if (this.checkFileSize(event) === false) {
            this.props.error({ message: "File Size can't be more than 5mb" })
            this.setState(prevState => ({
                [`ticketRequestForm`]: {
                    ...prevState[`ticketRequestForm`],
                    fileName: null,
                    selectedfile: null
                }
            }))
        }
        else {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
            }, () => this.uploadFile())
        }
    }

    uploadFile = even => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("/private/employee/ticket/upload", data, {

        })
            .then(res => {
                this.setState(prevState => ({
                    [`ticketRequestForm`]: {
                        ...prevState[`ticketRequestForm`],
                        fileName: this.state.selectedFile.name,
                    }
                }))
                this.props.success("File Uploaded Successfully!")

            }).catch(err => {
                this.props.error({ message: "File Could Not Be Uploaded!" })
            })
    }

    handleModalOpen = (e) => {
        this.setState({ modalOpen: true });
    };


    render() {
        let { ticketRequestForm } = this.state

        return (
            <div mt={2}>
                <ModalTrigger
                    title="Lodge New Ticket"
                    button
                    innerRef={node => this.modalRef = node}
                    onClose={this.unsetEditMode}
                >
                    <AddEditForm
                        headerTitle="Ticket Request"
                        fields={this.ticketRequestFields}
                        object={ticketRequestForm}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />
                    <input type="file" name="file" onChange={this.onChangeHandler} />
                    <p>File size upto 5mb </p>
                </ModalTrigger>
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

export default connect(mapStateToProps, { ...alertActions })(ITTicketNew)