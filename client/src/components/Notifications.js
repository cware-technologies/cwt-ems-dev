import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DataTable from './DataTable'
import { getUser } from '../reducers/authReducer';
import Container from './MainContainer';
import { getUserOrganization } from '../reducers/authReducer';
import { getDate } from '../helpers/utils';
import Typography from '@material-ui/core/Typography';

const notificationRows = [
    { id: 'ATTRIB_03', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Domain' },
    { id: 'ATTRIB_02', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Subject' },
    { id: 'ATTRIB_01', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Content' },
    { id: 'created', numeric: false, date: true, disablePadding: false, lengthRatio: 'Title', label: 'Created On' },
    { id: 'stat_cd', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Status' },
]

class Notifictions extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        let response

        try {
            response = await axios({
                method: 'get',
                url: '/private/employee/notification/my-notifications',
                params: {
                    emp_id: this.props.userID,
                    bu_id: this.props.organization
                }
            })
            console.log("RESPONSESS: ", response)

            this.setState(prevProps => ({
                data: response.data.data,
            }))
        }
        catch (err) {
            console.log(err)
        }
    }

    selectNotification = async (entity, data) => {
        console.log(data)
        let response
        try {
            response = await axios({
                method: 'put',
                url: '/private/employee/notification/update-notifications',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    row_id: data,
                    stat_cd: 'Read'
                },
            })

            if (response.data.status === 200) {
                console.log("Record Updated Successfully!")
                this.getData()
            }
            else {
                console.log("Could Not Update The Record")
                console.log(response)
            }
        }
        catch (err) {
            console.log("Could Not Update The Record")
        }
    }

    render() {
        let { data } = this.state;
        if (data) {
            return (
                <Container>
                    <DataTable
                        headerTitle='My Notifications'
                        rows={notificationRows}
                        data={data}
                        isSelectable
                        removeCheckboxes
                        selectEntity={this.selectNotification}
                    />
                    <Typography variant="caption" display="block" gutterBottom>
                        Click on a Notification to mark it Read
                    </Typography>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    You Don't Have Any Notifications Yet
            </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        organization: getUserOrganization(state),
        userID: getUser(state),
    }
}

export default connect(mapStateToProps)(Notifictions)