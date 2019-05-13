import React from "react";
import axios from 'axios'
import { Typography } from "@material-ui/core";
import Container from './MainContainer';
import AddEditForm from './AddEditForm';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        maxHeight: 500,
    },
    table: {
        minWidth: 700,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: 'capitalize',
    },
    addOrgFormRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        width: '100%',
        display: 'flex',
    },
    tableRow: {
        width: '100%',
        cursor: 'pointer',
    },
    selectedRow: {
        border: `2px solid ${theme.palette.secondary.light}`
    },
});

class SimpleTable extends React.Component {
    state = {
        selected: 0,
        entity: {
            name: '',
            desc: '',
            parent: null,
            organization: null,
            division: null,
        },
        data: [],
        editMode: false,
        isFetching: false,
        success: null,
    }

    // async componentDidMount(){
    //     let response
    //     if(this.props.endpoint !== '/'){
    //         try{
    //             response = await axios({
    //                 method: 'get',
    //                 url: `${this.props.endpoint}`,
    //                 params: {
    //                     bu_id: this.props.organization && this.props.organization,
    //                     div_id: this.props.division && this.props.division
    //                 },
    //             })
    //             console.log(`${this.props.title} REEEESSSSSPPONSE: `, response)
    //             this.handleGetResponse(response)
    //         }
    //         catch (err) {
    //             this.handleGetResponse(err.response)
    //         }
    //     }
    // }

    // handleGetResponse = (res) => {
    //     let error = res.data.message;

    //     if (res.data.status >= 400) {
    //         this.setState(prevState => ({
    //             isFetching: false,
    //             success: false,
    //         }))
    //     }

    //     else if (res.data.status >= 200 && res.data.status < 300) {
    //         this.setState(prevState => ({
    //             data: res.data.result,
    //             isFetching: false,
    //             success: true,
    //         }))
    //     }
    // }

    handleChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            entity: {
                ...prevState.entity,
                [target]: value,
            }
        }))
    }

    // handleSubmit = async() => {
    //     this.setState({
    //         entity: {
    //             ...this.state.entity,
    //             organization: this.props.organization,
    //             division: this.props.division,
    //         }
    //     }, this.sendPostRequest)

    // }

    // sendPostRequest = async () => {
    //     let response;

    //     try{
    //         response = await axios({
    //             method: 'post',
    //             url: `${this.props.endpoint}`,
    //             data: this.state.entity,
    //         })

    //         this.handlePostResponse(response)
    //         return
    //     }
    //     catch(err){
    //         this.handlePostResponse(err.response)
    //         return
    //     }
    // }

    // handlePostResponse = (res) => {
    //     if (res.data.status >= 400) {
    //         this.setState(prevState => ({
                
    //         }))
    //     }

    //     else if (res.data.status >= 200 && res.data.status < 300) {
    //         this.setState(prevState => ({
    //             data: [
    //                 ...prevState.data,
    //                 res.data.result,
    //             ]
    //         }))
    //     }
    // }

    isSelected = (id) => {
        return this.state.selected === id
    }

    selectOrganization = (event, id, org) => {
        this.setState(prevState => ({
            selected: id
        }), () => {
            if(this.props.title === 'view')
                org = null
            
            this.props.selectEntity(this.props.title, this.state.selected, org)

        })
    }

    // getParents = () => {
    //     let foundOrg = this.props.headers.find(ele => ele.value === 'organization')
    //     let foundDiv = this.props.headers.find(ele => ele.value === 'division')

    //     if(foundOrg){
    //         this.state.data.map(row => {
    //             row.organization = row.C_BU.name
    //         })
    //     }

    //     if(foundDiv){
    //         this.state.data.map(row => {
    //             row.division = row.C_DIV.name
    //         })
    //     }

    //     // this.state.data.map(row => {
    //     //     row.parent = row.parent ? row.parent.name : 0
    //     // })
    // }

    render(){
        let {classes, title, headers, fields, formData, handleChange, handleSubmit, data} = this.props
        let {editMode} = this.state

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {headers.map(header =>
                                <TableCell>{header.title}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map(row => {
                            const isSelected = this.isSelected(row.row_id);
                            // this.getParents()             
                            return (
                                <TableRow
                                    tabIndex={-1}
                                    aria-checked={isSelected}
                                    selected={isSelected}
                                    key={row.row_id}
                                    hover
                                    classes= {{
                                        root: classes.tableRow,
                                        selected: classes.selectedRow,
                                    }}
                                    onClick={event => this.selectOrganization(event, row.row_id, row.bu_id )}
                                >
                                    {headers.map(header =>
                                        <TableCell align="left">{header.value2 ? row[header.value] ? row[header.value][header.value2] : '' : row[header.value]}</TableCell>
                                    )}
                                </TableRow>
                        )})}
                    </TableBody>
                </Table>
                {this.props.fields &&
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Add {title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.addOrgFormRoot}>
                            <AddEditForm 
                                headerTitle={title}
                                fields={fields}
                                object={formData}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                editMode={editMode}
                            >

                            </AddEditForm>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                }
            </Paper>
        )
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);