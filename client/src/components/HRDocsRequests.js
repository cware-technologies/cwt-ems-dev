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
import { alertActions } from '../actions/alertActions';
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
    { name: 'Open', value: 'open' },
    { name: 'Pending', value: 'pending' },
    { name: 'Resolved', value: 'resolved' },
]

let baseState = ''
class ExpenseClaimRequests extends Component {

    state = {
        data: [],
        rowsPerPage: 5,
        page: 0,
        isSearching: false,
        query: '',
        filter: 'all',
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
                    type_cd: 'hr_docs'
                }
            })
            console.log(response.data.data)
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

        if ((status === 'resolved' || status==='inProgress') && this.state.msg !== '') {
            try {
                response = await axios({
                    method: 'post',
                    url: '/private/employee/notification/new',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: {
                        ATTRIB_02: status,
                        stat_cd: 'Unread',
                        ATTRIB_01: this.state.msg,
                        emp_id: data.emp_id,
                        bu_id: this.props.organization,
                        ATTRIB_03: data.type_cd
                    },
                })

                if (response.data.status === 200) {
                    console.log("Notification Added Successfully!")
                }
                else {
                    console.log("Notification Could not be added")
                    console.log(response)
                }
            }
            catch (err) {
                console.log("Could Not Update The Record")
            }

        }

        try {
            response = await axios({
                method: 'put',
                url: '/private/employee/ticket/updateHRDocs',
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
                this.setState({
                    msg: '',
                })
                this.getList()
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
        this.getList()
        return this.state.data.filter(row => row.stat_cd === this.state.filter)
    }

    filterData = (data) => {

        if (this.state.filter === 'all' && this.state.query === '') {
            return data
        }

        if (this.state.query !== '') {
            return data.filter(row => row.requestor.fst_name.toLowerCase().search(this.state.query.toLowerCase()) > -1 || row.requestor.last_name.toLowerCase().search(this.state.query.toLowerCase()) > -1 || row.created.search(this.state.query) > -1 || row.ATTRIB_06.search(this.state.query) > -1)
        }

        return data.filter(row => row.stat_cd === this.state.filter)

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
                console.log(this.state.selectedFile.name)

                this.props.success("File Uploaded Successfully!")

            }).catch(err => {
                this.props.error({ message: "File Could Not Be Uploaded!" })
            })
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

    onClickExpansion = (data, expansion) => {
        if (data.stat_cd === 'open' && expansion === false) {
            this.handleClick('pending', data)
        }
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
                            <option value={'all'}>
                                {'All'}
                            </option>
                            {filterOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <Search
                            title="Name, Date or type"
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
                                                    <Typography variant="overline" >{data.expenseType.val}</Typography>
                                                    <Typography variant="overline">{data.created}</Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div className={classes.flxContainer}>
                                                    <Typography variant="subtitle" color="primary" gutterBottom>
                                                       <div className={classes.wid80}>Problem Statement: {data.ATTRIB_01} </div>
                                                        <div style={data.stat_cd !== "resolved" || data.ATTRIB_03 === null ? { display: 'none' } : {}} className={classes.wid80} onClick={(e) => this.handleDownload(e, data.ATTRIB_03)}>File: <DownloadIcon /></div>
                                                    </Typography>
                                                    <div style={data.stat_cd === "resolved" ? { display: 'none' } : {}}>
                                                        <input type="file" name="file" onChange={this.onChangeHandler} />
                                                        <p>File size upto 5mb </p>
                                                    </div>
                                                    <RestrictedComponent
                                                        restriction='write'
                                                    >
                                                        <TextField
                                                            style={data.stat_cd === "resolved" ? { display: 'none' } : {}}
                                                            value={this.state.msg}
                                                            multiline={true}
                                                            rows="4"
                                                            label="Your Reply"
                                                            onChange={this.onMsgChange}
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
        } else {
            return null
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
    connect(mapStateToProps, { ...alertActions })
)(ExpenseClaimRequests);