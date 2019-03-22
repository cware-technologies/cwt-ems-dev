import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
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
import ApproveIcon from '@material-ui/icons/DoneOutline';
import RejectIcon from '@material-ui/icons/Cancel';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { red } from '@material-ui/core/colors';

let counter = 0;
function createData(name, detail, date, status) {
    counter += 1;
    return { id: counter, name, detail, date, status };
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
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'detail', numeric: false, disablePadding: false, label: 'Detail' },
    { id: 'date', numeric: false, disablePadding: true, label: 'Date Of Request' },
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
    },
    checkbox: {
        height: '80%',
        width: '100%',
        color: 'white',
    },
    row: {
        width: '100%',
        display: 'flex',
        backgroundColor: theme.palette.grey[600],
    }
})

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;

        return (
            <TableHead>
                <TableRow className={classes.row}>
                    <TableCell padding="checkbox" classes={{ root: classes.tableCellSmall }}>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            classes={{
                                root: classes.checkbox,
                            }}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                classes={{ root: row.label !== 'Detail' ? classes.tableCell : classes.tableCellDetail }}
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
        flex: '1 1 auto',
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
                            My Leaves
          </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <React.Fragment>
                        <Tooltip title="Reject">
                            <IconButton aria-label="Reject">
                                <RejectIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve">
                            <IconButton aria-label="Approve">
                                <ApproveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
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
    },
    checkbox: {
        width: '80%',
        height: '100%',
    },
    row: {
        width: '100%',
        display: 'flex',
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
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'name',
        selected: [],
        data: [
            createData('Sajeel', 'No reason, I dont feel like it', '15-02-2019', 'Approved'),
            createData('Ehsan', 'Due to Convocation', '20-02-2019', 'Pending'),
            createData('Maryam', 'Van wala nai aaya', '28-02-2019', 'Rejected'),
        ],
        page: 0,
        rowsPerPage: 5,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody className={classes.tableBody}>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                            classes={{
                                                root: classes.row,
                                            }}
                                        >
                                            <TableCell classes={{ root: classes.tableCellSmall }} onClick={event => this.handleClick(event, n.id)}>
                                                <Checkbox checked={isSelected} classes={{ root: classes.checkbox, }} />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="none"
                                                classes={{ root: classes.tableCell }}
                                            >
                                                {n.name}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                padding="dense"
                                                classes={{ root: classes.tableCellDetail }}
                                            >
                                                {n.detail}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                padding="dense"
                                                classes={{ root: classes.tableCell }}
                                            >
                                                {n.date}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                padding="dense"
                                                classes={{ root: classes.tableCell }}
                                                className={ n.status !== 'Pending' ? n.status === 'Rejected'?classes.error : classes.success : classes.warning }
                                            >
                                                {n.status}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
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

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);