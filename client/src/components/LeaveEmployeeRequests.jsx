import React, { Component } from 'react'
import classNames from 'classnames'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { getUser } from '../reducers/authReducer';
import { getDate } from '../helpers/utils';
import Search from './Search'

const styles = theme => ({

    btnP: {
        color: 'goldenrod',
    },

    btn: {
        alignSelf: 'flex-end',
    },

    pstnabslt: {
        position: 'absolute'
    },

    flxContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },

    btnPnl: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 25
    },

    wid80: {
        width: '70%'
    }
})

const filterOptions = [
    { name: 'Accepted', value: 'accepted' },
    { name: 'Rejected', value: 'rejected' },
    { name: 'All', value: 'all' },
]

class LeaveEmployeeRequests extends Component {

    state = {
        data: [],
        rowsPerPage: 5,
        page: 0,
        isSearching: false,
        query: '',
        filter: 'pending'
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
                url: `/private/employee/leave/requestedLeaves`,
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

    handleClick = async (status, data) => {
        let response
        let newData = this.state.data.filter(row => {
            return row.row_id !== data.row_id
        })

        try {
            response = await axios({
                method: 'put',
                url: '/private/employee/leave/updateLeaveRequested',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    row_id: data.row_id,
                    stat_cd: status,

                },
            })

            if (response.data.status === 200) {
                console.log("Record Updated Successfully!")
                this.setState(prevState => ({
                    data: newData,
                }))

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

    handleFilterChange = (e) => {
        let value = e.target.value
        this.setState(prevState => ({
            filter: value,
        }))
        console.log(this.state.filter)

        return this.state.data.filter(row => row.stat_cd === this.state.filter)
    }

    filterData = (data) => {
        //console.log("FILTER: ", this.state.filter, data.filter(row => row.stat_cd === this.state.filter))
        if (this.state.filter === 'all' && this.state.query === '') {
            return data
        }

        if (this.state.query !== '') {
            return data.filter(row => row.requestor.last_name.toLowerCase() === this.state.query.toLowerCase() || row.requestor.fst_name.toLowerCase() === this.state.query.toLowerCase())
        }

        return data.filter(row => row.stat_cd === this.state.filter)
    }

    onSearchChange = (e) => {
        let value = e.target.value
        this.setState(prevState => ({
            query: value,
        }))
        console.log(this.state.query)
    }

    onSearchSubmit = () => {
        console.log(this.state.data)
        return this.state.data.filter(row => row.requestor.last_name === this.state.query)
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        let { data, rowsPerPage, page, query } = this.state;
        const { classes } = this.props;

        if (data) {
            return (
                <div>
                    <TextField
                        id='filter-list'
                        select
                        label='Filter'
                        value={this.state.filter}
                        defaultValue=''
                        onChange={this.handleFilterChange}
                        SelectProps={{
                            native: true,
                        }}
                        margin="dense"
                        variant="outlined"
                    >
                        <option value={'pending'}>
                            {'Pending'}
                        </option>
                        {filterOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                    <Search
                        title="Name"
                        query={query}
                        submitHandler={this.filterData(data)}
                        changeHandler={this.onSearchChange}
                        isSearching=''
                    />
                    {
                        this.filterData(data).map(data => {

                            return (
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <div className={classes.flxContainer}>
                                            <Typography variant="subtitle2" className={classNames(classes.btn, classes.pstnabslt)}>{data.stat_cd.toUpperCase()}</Typography>
                                            <Typography variant="subtitle2">{data.requestor.fst_name} {data.requestor.last_name}</Typography>
                                            <Typography variant="overline">{getDate(data.strt_dt).toDateString()}</Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <div className={classes.flxContainer}>
                                            <Typography variant="subtitle" color="primary" gutterBottom>
                                                <div>Requested Days: {data.ATTRIB_11}</div>
                                                <div className={classes.wid80}>Details: {data.ATTRIB_01} </div>
                                            </Typography>
                                            <div className={classes.btnPnl}>
                                                <Button
                                                    id="accepted"
                                                    onClick={(e) => this.handleClick('accepted', data)}
                                                    variant="outlined"
                                                    className={classes.btnP}
                                                    style={data.stat_cd !== "pending" ? { display: 'none' } : {}}
                                                >
                                                    Accept
                                            </Button>
                                                <Button
                                                    id="rejected"
                                                    onClick={() => this.handleClick('rejected', data)}
                                                    variant="outlined"
                                                    className={classes.btn}
                                                    style={data.stat_cd !== "pending" ? { display: 'none' } : {}}

                                                >
                                                    Reject
                                            </Button>
                                            </div>
                                        </div>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })
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
}

const mapStateToProps = (state) => {
    return {
        userID: getUser(state),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps),
)(LeaveEmployeeRequests);