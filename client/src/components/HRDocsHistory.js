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
import TablePagination from '@material-ui/core/TablePagination';
import { getUser } from '../reducers/authReducer';
import { alertActions } from '../actions';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import Paper from '@material-ui/core/Paper';

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
    },
    root: {
        width: '100%',
        display: 'block'
    },
})

class ExpenseClaimHistory extends Component {

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
                url: `/private/employee/tickets`,
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    emp_id: this.props.userID,
                    type_cd: 'hr_docs'
                }
            })
            console.log(response.data)

            this.setState(prevState => ({
                data: response.data.data,
                isSearching: false,
            }))
        }
        catch (err) {

        }
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    onClickHandler = () => {
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

    handleDownload = async (e, path) => {
        console.log(path)
        window.open(`${process.env.REACT_APP_API_URL}/private/employee/ticket/download?path=${path}`)
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

        return (
            <div>
                {
                    data.map(data => {
                        return (
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div className={classes.flxContainer}>
                                        <Typography variant="subtitle2" className={classNames(classes.btn, classes.pstnabslt)} >{data.stat_cd.toUpperCase()}</Typography>
                                        <Typography variant="subtitle2">{data.expenseType.val}</Typography>
                                        <Typography variant="overline">{data.created}</Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.root}>
                                    <div className={classes.flxContainer}>
                                        <Typography variant="subtitle" color="primary" gutterBottom>
                                            <div className={classes.wid80}>Details: {data.ATTRIB_01}</div>
                                            <div style={data.ATTRIB_03 === null || data.stat_cd!= 'resolved' ? { display: 'none' } : {}} className={classes.wid80} onClick={(e) => this.handleDownload(e, data.ATTRIB_03)}>File: <DownloadIcon /></div>
                                        </Typography>
                                    </div>
                                    <Paper className={classes.root} style={data.ATTRIB_04 === null ? { display: 'none' } : {}}>
                                        <Typography 
                                        style={data.ATTRIB_04 === '' ? { display: 'none' } : {}}
                                        variant="subtitle" 
                                        color="primary">
                                            Admin Reply
                                        </Typography>
                                        <Typography component="p">
                                            {data.ATTRIB_04}
                                        </Typography>
                                    </Paper>
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

const mapStateToProps = (state) => {
    return {
        userID: getUser(state),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { ...alertActions }),
)(ExpenseClaimHistory);