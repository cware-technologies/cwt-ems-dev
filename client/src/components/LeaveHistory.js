import React, { Component } from 'react'
import DataTable from './DataTable'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';

const leaveHistoryRows = [
    { id: 'leaveAppliedDate', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Applied Date' },
    { id: 'leaveType', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Type' },
    { id: 'leaveStatus', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Status' },
]

const leaveData = [
    { leaveAppliedDate: '12-2-2019', leaveType: 'Annual', leaveRequestedDays: '03', leaveDetail: 'urgent piece of work', leaveStatus: 'Pending' },
    { leaveAppliedDate: '3-7-2019', leaveType: 'Monthly', leaveRequestedDays: '04', leaveDetail: 'not feeling well', leaveStatus: 'Approved' }
]

const styles = theme => ({
    btn: {
        color: 'goldenrod',
        alignSelf: 'flex-end'
    },

    btnContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'

    }
})


class LeaveHistory extends Component {

    state = {
        leaveData: [],
        rowsPerPage: 5,
        page: 0
    }

    componentDidMount() {
        this.setState({
            leaveData: leaveData
        })
    }

    handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
    }
    
    render() {
        let { leaveData, rowsPerPage, page } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {
                    leaveData.map(data => {
                        return (
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="subtitle2">{data.leaveType} | {data.leaveAppliedDate} | {data.leaveStatus}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className={classes.btnContainer}>
                                        <Typography variant="subtitle" color="primary" gutterBottom>
                                            <div>Requested Days: {data.leaveRequestedDays}</div>
                                            <div>Details: {data.leaveDetail}</div>
                                        </Typography>
                                        <Button variant="outlined" color="" className={classes.btn}>
                                            Withdraw
                                        </Button>
                                    </div>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                        
                    })
                }
                <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count='100'
                                rowsPerPage={rowsPerPage}
                                page={this.state.page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
            </div>
        )
    }
}

export default withStyles(styles)(LeaveHistory);
//export default LeaveHistory;
