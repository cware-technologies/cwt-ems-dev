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
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Container from './MainContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let counter = 0;
function createData(sender, subject, date, status) {
    counter += 1;
    return { id: counter, sender, subject, date, status };
}

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

const rows = [
    { id: 'sender', numeric: false, disablePadding: true, label: 'Sender' },
    { id: 'subject', numeric: false, disablePadding: true, label: 'Subject' },
    { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
];

const headStyles = theme => ({
    tableCell: {
        display: 'flex',
        alignContent: 'center',
        flexBasis: '20%',
        flexGrow: 5,
        paddingLeft: '5px',
        color: 'white',
    },
    tableCellSmall: {
        flexBasis: '10%',
        flexGrow: 1,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'white',
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
        const { order, orderBy, classes } = this.props;

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
                                classes={{ root: row.id !== 'subject' ? classes.tableCell : classes.tableCellDetail }}
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
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead = withStyles(headStyles)(EnhancedTableHead);

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
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
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
          </Typography>
                ) : (
                        <Typography variant="h6" id="tableTitle">
                            Notifications
          </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
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
    '@global': {
        'tbody > tr:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[300],
        }
    },
    tableWrapper: {
        overflowX: 'scroll',
    },
    tableCell: {
        flexBasis: '20%',
        flexGrow: 5,
        paddingLeft: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    tableCellSmall: {
        flexBasis: '10%',
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
        cursor: 'pointer',
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
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'name',
        data: [
            createData('Sajeel Waien', 'Logo Update', '01-02-2019', 'read',),
            createData('Ehsan Hassan', 'FSD Update', '02-02-2019', 'unread'),
            createData('Mariam Amin', 'HR Documents', '03-02-2019', 'unread'),
            createData('Suleman Ishtiaq', 'Operations Update', '04-02-2019', 'read'),
        ],
        page: 0,
        rowsPerPage: 5,
        modalOpen: false,
        month: null,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangeMonth = (event) => {
        let month = event.target.value
        this.setState(prevState => ({
            month,
        }))
    }

    handleModalOpen = (e) => {
        let target = e.target.id;
        if(target !== 'checkbox')
            this.setState({ modalOpen: true });
    };

    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };


    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Container>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody className={classes.tableBody}>
                                {stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={n.id}
                                                classes={{
                                                    root: classes.row,
                                                }}
                                                onClick={this.handleModalOpen}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                    classes={{ root: classes.tableCell }}
                                                >
                                                    {n.sender}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="none"
                                                    classes={{ root: classes.tableCellDetail }}
                                                >
                                                    {n.subject}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="none"
                                                    classes={{ root: classes.tableCell }}
                                                >
                                                    {n.date}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="none"
                                                    classes={{ root: classes.tableCell }}
                                                    className={ n.status !== 'unread' ? classes.warning : classes.success }
                                                >
                                                    {n.status}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    
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

                    <EnhancedInfoModal
                        modalOpen={this.state.modalOpen}
                        handleModalClose={this.handleModalClose}
                    />
                </Paper>
            </Container>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const InfoModal = ({ modalOpen, handleModalClose, classes }) => {
    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classNames(classes.modal, classes.paper)}>
                <Typography variant="h8" id="modal-title">
                    <b>Name: </b>[ Name Of Requester ]
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    <b>Date Of Issue: </b>03-01-2019
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    <b>Status: </b>Pending
                </Typography>
                <Typography variant="body1" id="simple-modal-description">
                    <b>Description: </b>Detail of the leave application. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </div>
        </Modal>  
    )
}

const EnhancedInfoModal = withStyles(styles)(InfoModal);

export default withStyles(styles)(EnhancedTable);