import React, { Component } from 'react'
import axios from 'axios'
import classNames from 'classnames'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import { getDate, calculateNumOfDays } from '../helpers/utils';
import { getUser } from '../reducers/authReducer';
import { alertActions } from '../actions';

import RestrictedComponent from './RestrictedComponent'

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

    },
    pstnabslt: {
        position: 'absolute'
    },
    flxContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

    },
    wid80: {
        width: '70%'
    }
})


class LeaveHistory extends Component {

    state = {
        leaveData: [],
        data: [],
        rowsPerPage: 5,
        page: 0,
        isSearching: false,
    }

    componentDidMount() {
        this.getList()
    }

    getList = async () => {
        let response
        let params

        this.setState(prevState => ({
            isSearching: true,
        }))

        try {
            response = await axios({
                method: 'get',
                url: `/private/employee/leaves`,
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    emp_id: this.props.userID
                }
            })
            console.log(response)

            this.setState(prevState => ({
                data: response.data.data,
                isSearching: false,
            }))
        }
        catch (err) {

        }
    }

    handleClickDel = async (emp) => {
        let response
        let newData = this.state.data.filter(row => {
            return row.row_id !== emp.row_id
        })

        try {
            response = await axios({
                method: 'delete',
                url: '/private/employee/leaves',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    row_id: emp.row_id
                },
            })

            if (response.data.status === 200) {

                console.log("Record Deleted Successfully!")

                this.setState(prevState => ({
                    data: newData,
                }))

            }
            else {
                console.log("Could Not Delete The Record")
                console.log(response)
            }
        }
        catch (err) {
            console.log("Could Not Delete The Record")
        }

    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        let { data, rowsPerPage, page } = this.state;
        const { classes } = this.props;
        var days = 0

        return (
            <div>
                {
                   data ? data.map(data => {
                        days = calculateNumOfDays(data.end_dt, data.strt_dt)
                        return (
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div className={classes.flxContainer}>
                                        <Typography variant="subtitle2" className={classNames(classes.btn, classes.pstnabslt)} >{data.stat_cd.toUpperCase()}</Typography>
                                        <Typography variant="subtitle2">{data.entitlement.val.toUpperCase()}</Typography>
                                        <Typography variant="overline">{getDate(data.strt_dt).toDateString()}</Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className={classes.flxContainer}>
                                        <Typography variant="subtitle" color="primary" gutterBottom>
                                            <div>Requested Days: {days}</div>
                                            <div className={classes.wid80}>Details: {data.ATTRIB_01}</div>
                                        </Typography>
                                        <RestrictedComponent
                                            restriction='write'
                                        >
                                            <Button
                                                onClick={() => this.handleClickDel(data)}
                                                variant="outlined" className={classes.btn}
                                                style={data.stat_cd !== "pending" ? { display: 'none' } : {}}
                                            >
                                                Withdraw
                                            </Button>
                                        </RestrictedComponent>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    }): null
                }
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
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

const mapStateToProps = (state) => {
    return {
        userID: getUser(state),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { ...alertActions }),
)(LeaveHistory);