import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Modal from '@material-ui/core/Modal';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Container from './MainContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getDate } from '../helpers/utils'

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headStyles = theme => ({
    tableCellTitle: {
        flexBasis: '20%',
        flexGrow: 5,
        paddingLeft: '5px',
        display: 'flex',
        color: 'white',
        alignItems: 'center',
    },
    tableCellSmall: {
        flexBasis: '2%',
        flexGrow: 1,
        padding: 0,
        display: 'flex',
        color: 'white',
        justifyContent: 'center',
    },
    tableCellDetail: {
        display: 'flex',
        alignContent: 'center',
        flexBasis: '70%',
        flexGrow: 10,
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    checkbox: {
        height: '80%',
        width: '100%',
        color: 'white',
    },
    row: {
        width: '100%',
        display: 'flex',
        backgroundColor: theme.palette.grey[800],
    }
})

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, classes, rows } = this.props;

        return (
            <TableHead>
                <TableRow className={classes.row}>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                classes={{ root: classes[`tableCell${row.lengthRatio}`] }}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                    {
                        this.props.actions &&
                            <React.Fragment>
                                <TableCell
                                    align="left"
                                    padding="none"
                                    classes={{ root: classes.tableCellSmall }}
                                />
                                <TableCell
                                    align="left"
                                    padding="none"
                                    classes={{ root: classes.tableCellSmall }}
                                />
                            </React.Fragment>
                    }
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead = withStyles(headStyles)(EnhancedTableHead);

EnhancedTableHead.propTypes = {
    // numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { headerTitle, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root)}
        >
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    { headerTitle }
                </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Delete">
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    // numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    container: {
        flexDirection: 'row',
        margin: '0px',
        width: '100%',
        justifyContent: 'space-around',
    },
    table: {
        minWidth: 300,
        
    },
    // '@global': {
    //     'tbody > tr:nth-of-type(odd)': {
    //         backgroundColor: theme.palette.grey[300],
    //     }
    // },
    tableWrapper: {
        overflowX: 'scroll',
    },
    tableCellTitle: {
        flexBasis: '20%',
        flexGrow: 5,
        paddingLeft: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    tableCellSmall: {
        flexBasis: '2%',
        flexGrow: 1,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    tableCellDetail: {
        display: 'flex',
        alignItems: 'center',
        flexBasis: '70%',
        flexGrow: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    checkbox: {
        width: '80%',
        height: '100%',
    },
    row: {
        width: '100%',
        display: 'flex',
        // cursor: 'pointer',
    },
    error: {
        color: 'crimson',
        fontWeight: '500',
    },
    success: {
        color: 'limegreen',
        fontWeight: '500',
    },
    warning: {
        color: 'goldenrod',
        fontWeight: '500',
    },
    modal: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    selected: {
        backgroundColor: theme.palette.secondary.light,
    }
});

class EnhancedDataTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'name',
        data: [],
        page: 0,
        rowsPerPage: 5,
        modalOpen: false,
        selectedRow: null,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    setEditMode = (data) => {
        this.setState(prevState => ({
            selectedRow: data.row_id,
        }), () => this.props.setEditMode(data))
    }

    unsetEditMode = () => {
        this.setState(prevState => ({
            selectedRow: null,
        }), () => this.props.unsetEditMode())
    }

    isSelected = (id) => {
        return id === this.state.selectedRow
    }

    render() {
        const { classes, rows, data, headerTitle, editMode, handleDelete, disableEdit } = this.props;
        const { /* data, */ order, orderBy, rowsPerPage, page } = this.state;
        const { setEditMode, unsetEditMode } = this;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
                <Paper className={classes.root}>
                    <EnhancedTableToolbar
                        headerTitle={headerTitle}
                    />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                rows={rows}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                actions={this.props.actions}
                            />
                            <TableBody className={classes.tableBody}>
                                {
                                    stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(data => {
                                        let isSelected = editMode && this.isSelected(data.row_id)
                                        return (
                                            <TableRow
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={data.id}
                                                classes={{
                                                    root: classes.row,
                                                }}
                                                className={isSelected && classes.selected}
                                                onClick={this.handleModalOpen}
                                            >
                                                {
                                                    rows.map(row => {
                                                        return(
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                padding="none"
                                                                classes={{ root: classes[`tableCell${row.lengthRatio}`] }}
                                                            >
                                                                { !row.date ? data[row.id] : getDate(data[row.id]).toDateString() }
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                                {
                                                    this.props.actions &&
                                                        <React.Fragment>
                                                            <TableCell
                                                                align="left"
                                                                padding="none"
                                                                classes={{ root: classes.tableCellSmall }}
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
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                padding="none"
                                                                classes={{ root: classes.tableCellSmall }}
                                                            >
                                                                <Tooltip title="Delete">
                                                                    <IconButton disabled={editMode} aria-label="Delete" onClick={() => handleDelete(data.row_id)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </React.Fragment>
                                                }
                                        </TableRow>
                                    )})
                                }
                                    
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={5} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
        );
    }
}

EnhancedDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedDataTable);