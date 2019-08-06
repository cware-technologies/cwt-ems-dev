import React, { Component } from 'react'
import DataTable from './DataTable'

const leaveEntitlementRows = [
    { id: 'leavesType', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Type' },
    { id: 'leavesEntitled', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Entitled' },
    { id: 'leavesUsed', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Used' },
    { id: 'leavesAvailable', numeric: false, disablePadding: true, lengthRatio: 'Detail', label: 'Available' },
]

export default class LeaveEntitlements extends Component {
    state= {
        leaveData: [],

    }
    render() {
        let {leaveData} = this.state;
        return (
            <div>
            <DataTable
                    headerTitle='Leaves Entitlements'
                    rows={leaveEntitlementRows}
                    data={leaveData}
                />
            </div>
        )
    }
}
