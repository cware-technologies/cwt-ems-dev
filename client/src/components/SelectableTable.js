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
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        maxHeight: 500,
    },
    table: {
        minWidth: 300,
        position: 'relative',
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
    tableBody: {
    },
    tableHeader: {
        position: 'absolute',
        top: '0px',
    },
    tableRow: {
        width: '100%',
        display: 'flex',
        cursor: 'pointer',
    },
    selectedRow: {
        border: `2px solid ${theme.palette.secondary.light}`
    },
    tableCellAction: {
        flexBasis: '2%',
        flexGrow: 0.5,
        padding: 0,
        display: 'flex',
        color: 'white',
    },
});

class SimpleTable extends React.Component {
    state = {
        selected: 0,
        // entity: {
        //     name: '',
        //     desc: '',
        //     parent: null,
        //     organization: null,
        //     division: null,
        // },
        data: [],
        editMode: false,
        isFetching: false,
        success: null,
    }

    // handleChange = (event) => {
    //     let target = event.target.id;
    //     let value = event.target.value;
    //     this.setState(prevState => ({
    //         entity: {
    //             ...prevState.entity,
    //             [target]: value,
    //         }
    //     }))
    // }

    isSelected = (id) => {
        return this.state.selected === id
    }

    selectEntity = (event, id, org) => {
        this.setState(prevState => ({
            selected: id
        }), () => {
            if(this.props.title === 'view')
                org = null
            
            this.props.selectEntity(this.props.title, this.state.selected, org)

        })
    }

    render(){
        let {classes, title, headers, fields, formData, handleChange, handleSubmit, handleDelete, data} = this.props
        let {editMode} = this.state

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                this.props.actions &&
                                    <React.Fragment>
                                        <TableCell
                                            align="left"
                                            padding="none"
                                            classes={{ root: classes.tableCellAction }}
                                        />
                                    </React.Fragment>
                            }
                            {headers.map(header =>
                                <TableCell>{header.title}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
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
                                    onClick={event => this.selectEntity(event, row.row_id, row.bu_id )}
                                >
                                    {
                                        this.props.actions &&
                                            <React.Fragment>
                                                {/* <TableCell
                                                    align="left"
                                                    padding="none"
                                                    classes={{ root: classes.tableCellAction }}
                                                >
                                                { editMode ?  isSelected ?
                                                    <Tooltip title="Edit">
                                                        <IconButton aria-label="Cancel" onClick={() => unsetEditMode(data)}>
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </Tooltip> : 
                                                    <Tooltip title="Edit">
                                                        <IconButton aria-label="Edit" onClick={() => setEditMode(data)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip> :
                                                    <Tooltip title="Edit">
                                                    <IconButton aria-label="Edit" disabled={disableEdit} onClick={() => setEditMode(data)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                }
                                                </TableCell> */}
                                                <TableCell
                                                    align="left"
                                                    padding="none"
                                                    classes={{ root: classes.tableCellAction }}
                                                >
                                                    <Tooltip title="Delete">
                                                        <IconButton disabled={editMode} aria-label="Delete" onClick={() => handleDelete(data.row_id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </React.Fragment>
                                    }
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