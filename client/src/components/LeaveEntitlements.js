import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import DataTable from './DataTable'
import { getUser } from '../reducers/authReducer';

const leaveEntitlementRows = [
    { id: 'val', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Entitlement' },
    { id: 'ATTRIB_11', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Entitled' },
    { id: 'no_days', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Used' },
    { id: 'remaining', numeric: false, disablePadding: false, lengthRatio: 'Title', label: 'Available' },
]

class LeaveEntitlements extends Component {
    state= {
        data: [],
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: '/private/employee/entitlements/history',
                params: {
                    emp_id: this.props.userID,
                }
            })
            console.log("RESPONSESS: ", response)

            this.setState(prevProps => ({
                data: response.data.data,
            }))
        }
        catch(err){

        }
    }

    render() {
        let {data} = this.state;
        return (
            <div>
            <DataTable
                    headerTitle='Leaves Entitlements'
                    rows={leaveEntitlementRows}
                    data={data}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // organization: getUserOrganization(state),
        userID: getUser(state),
    }
}

export default connect(mapStateToProps)(LeaveEntitlements)