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
import Search from './Search'
import { getUserOrganization } from '../reducers/authReducer';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import Container from './MainContainer';
import RestrictedComponent from './RestrictedComponent'

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

const inputProps = {
    step: 500,
};

const filterOptions = [
    { name: 'In Progress', value: 'inProgress' },
    { name: 'Resolved', value: 'resolved' },
    { name: 'Open', value: 'open' },
    { name: 'All', value: 'all' },
]

class ITTicketsRequests extends Component {

    state = {
        data: [],
        rowsPerPage: 5,
        page: 0,
        isSearching: false,
        query: '',
        filter: 'pending',
        msg: ''
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
                url: `/private/employee/ticket/requested`,
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    bu_id: this.props.organization,
                    type_cd: 'IT-Ticket'
                }
            })

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
            return row.row_id === data.row_id
        })[0]

        try {
            response = await axios({
                method: 'put',
                url: '/private/employee/ticket/updateTicketRequested',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    row_id: data.row_id,
                    stat_cd: status,
                    msg: this.state.msg
                },
            })

            if (response.data.status === 200) {
                console.log("Record Updated Successfully!")
                newData.stat_cd = 'pending'
                this.setState(prevState => ({
                    data: [
                        ...prevState.data,

                    ]
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

        return this.state.data.filter(row => row.stat_cd === this.state.filter)
    }

    filterData = (data) => {
        //console.log("FILTER: ", this.state.filter, data.filter(row => row.stat_cd === this.state.filter))
        if (this.state.filter === 'all' && this.state.query === '') {
            return data
        }

        if (this.state.query !== '') {
            return data.filter(row => row.requestor.fst_name.toLowerCase().search(this.state.query.toLowerCase()) > -1 || row.requestor.last_name.toLowerCase().search(this.state.query.toLowerCase()) > -1 || row.created.search(this.state.query) > -1)
        }

        return data.filter(row => row.stat_cd === this.state.filter)
    }

    onClickExpansion = (data, expansion) => {
        if (data.stat_cd === 'open' && expansion === false) {
            this.handleClick('pending', data)
        }
    }

    onSearchChange = (e) => {
        let value = e.target.value
        this.setState(prevState => ({
            query: value,
        }))
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

    handleDownload = async (e, path) => {
        console.log(path)
        window.open(`${process.env.REACT_APP_API_URL}/private/employee/ticket/download?path=${path}`)
    }

    onMsgChange = (e) => {
        let value = e.target.value

        this.setState(prevState => ({
            msg: value
        }))
    }

    render() {
        let { data, rowsPerPage, page, query } = this.state;
        const { classes } = this.props;

        if (data) {
            return (
                <Container>
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
                            title="Name or Date"
                            query={query}
                            submitHandler={this.filterData(data)}
                            changeHandler={this.onSearchChange}
                            isSearching=''
                        />
                        {
                            this.filterData(data).map(data => {
                                return (
                                    <div>
                                        <ExpansionPanel onChange={(event, expansion) => this.onClickExpansion(data, expansion)}>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <div className={classes.flxContainer}>
                                                    <Typography variant="subtitle2" className={classNames(classes.btn, classes.pstnabslt)} >{data.stat_cd.toUpperCase()}</Typography>
                                                    <Typography variant="subtitle2">{data.requestor.fst_name} {data.requestor.last_name}</Typography>
                                                    <Typography variant="overline">{data.created}</Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div className={classes.flxContainer}>
                                                    <Typography variant="subtitle" color="primary" gutterBottom>
                                                        <div>Ticket #: {data.ATTRIB_02}</div>
                                                        <div className={classes.wid80}>Ticket Type: {data.expenseType.val} </div>
                                                        <div className={classes.wid80}>Problem Statement: {data.ATTRIB_01} </div>
                                                        <div className={classes.wid80}
                                                            style={data.ATTRIB_03 === null ? { display: 'none' } : {}}
                                                            onClick={(e) => this.handleDownload(e, data.ATTRIB_03)}>
                                                            File: <DownloadIcon />
                                                        </div>
                                                    </Typography>
                                                    <RestrictedComponent
                                                        restriction='write'
                                                    >
                                                        <TextField
                                                            value={this.state.msg}
                                                            multiline={true}
                                                            rows="4"
                                                            label="Your Reply"
                                                            onChange={this.onMsgChange}
                                                            style={data.stat_cd === "resolved" ? { display: 'none' } : {}}
                                                        />
                                                    </RestrictedComponent>
                                                    <RestrictedComponent
                                                        restriction='write'
                                                    >
                                                        <div className={classes.btnPnl}>
                                                            <Button
                                                                id="resolved"
                                                                onClick={(e) => this.handleClick('resolved', data)}
                                                                variant="outlined"
                                                                className={classes.btnP}
                                                                style={data.stat_cd === "resolved" ? { display: 'none' } : {}}
                                                            >
                                                                Resolved
                                                            </Button>
                                                            <Button
                                                                id="inProgress"
                                                                onClick={() => this.handleClick('inProgress', data)}
                                                                variant="outlined"
                                                                className={classes.btn}
                                                                style={data.stat_cd === "resolved" ? { display: 'none' } : {}}
                                                            >
                                                                In Progress
                                                            </Button>
                                                        </div>
                                                    </RestrictedComponent>
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
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
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userID: getUser(state),
        organization: getUserOrganization(state),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps),
)(ITTicketsRequests);