import React from 'react';
import classNames from 'classnames';
import axios from 'axios'
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
import DeleteIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Container from './MainContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    tableCell: {
        display: 'flex',
        alignContent: 'center',
        flexBasis: '20%',
        flexGrow: 5,
        paddingLeft: '5px',
        color: 'white',
    },
    tableCellAction: {
        width: '48px',
        flexBasis: '48px',
        flexGrow: 0,
        padding: 0,
        display: 'flex',
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
        const { order, orderBy, classes, rows } = this.props;

        return (
            <TableHead>
                <TableRow className={classes.row}>
                    <TableCell
                        align='left'
                        padding='none'
                        classes={{ root: classes.tableCellAction }}
                    >
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                classes={{ root: row.id === 'subject' || row.id === 'desc' ? classes.tableCellDetail : row.checkbox ? classes.tableCellSmall : classes.tableCell }}
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
        flexBasis: '10%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { headerTitle, classes, actions, disabled, responsibility } = props;

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
                <Button onClick={props.handleUpdate} disabled={!responsibility || disabled} variant="contained" color="primary" /* className={classNames(classes.button, classes.textField)} */>
                    Update
                </Button>
                { actions.map(action => action)}
                {/* <Tooltip title="Delete">
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip> */}
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
    tableCellAction: {
        width: '48px',
        flexBasis: '48px',
        flexGrow: 0,
        padding: 0,
        display: 'flex',
        color: 'white',
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
});

class EnhancedDataTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'name',
        page: 0,
        rowsPerPage: 5,
        isFetching: false,
        success: false,
        disabled: false,
    };

    // componentDidMount(){
    //     this.getViews()
    // }

    // componentDidUpdate(prevProps){
    //     console.log(prevProps.responsibility, this.props.responsibility)
    //     if(prevProps.responsibility !== this.props.responsibility)
    //         this.getViews()
    // }

    // getViews = async() => {
    //     let response

    //     try{
    //         response = await axios({
    //             method: 'get',
    //             url: '/admin/access-rights/responsibility-view',
    //             params: {
    //                 resp_id: this.props.responsibility,
    //             }
    //         })

    //         console.log("RESP_VIEW_RESPONSE", response)
    //         this.handleResponse(response)
    //     }
    //     catch(err){
    //         this.handleResponse(err.response)
    //     }
    // }

    // handleResponse = (res) => {
    //     if (res.data.status >= 400) {
    //         this.setState(prevState => ({
    //             isFetching: false,
    //             success: false,
    //         }),)
    //     }

    //     else if (res.data.status >= 200 && res.data.status < 300) {
    //         this.setState(prevState => ({
    //             data: res.data.result[0].view && res.data.result[0].view,
    //             isFetching: false,
    //             success: true,
    //         }),  () => console.log("LIST VIEW STATE: ", this.state))
    //     }
    // }

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

    handleDelete = (id) => {
        let confirmation = window.confirm("Are You Sure You Want To Delete This Record?")
        if(confirmation){
            this.props.handleDelete(id)
        }
        else{
            return
        }
    }

    // handleCheckboxChange = (event, id, idx) => {
    //     let target = event.target.id
    //     let value = event.target.checked
    //     let data = this.state.data
    //     let flag = target === 'readOnly' ? 'FLG_01' : 'FLG_02'

        
    //     let index = 0
    //     for(index; index < data.length; index++) {
    //         if(data[index].row_id === id) 
    //             break;
    //     }
            

    //     // let selection = data.filter(row => row.row_id === id)
    //     // console.log("SELECTION: ", selection)
    //     // let index = selection[0] && selection[0].row_id

    //     data[index] = {
    //         ...data[index],
    //         C_RESP_VIEW: {
    //             ...data[index].C_RESP_VIEW,
    //             [flag]: value,
    //         }
    //     }

    //     this.setState(prevState => ({
    //         data: data,
    //         updates: {
    //             ...prevState.updates,
    //             [idx]: {
    //                 ...prevState.updates[idx],
    //                 [flag]: value,
    //             }
    //         }
    //     }), () => console.log("UPDATE STATE: ", this.state))
    // }

    // handleUpdate = async (event) => {
    //     let response
    //     console.log("UPPPPDDDAAATTTEEE!!!")
    //     try{
    //         response = await axios({
    //             method: 'put',
    //             url: '/admin/access-rights/responsibility-view',
    //             data: {
    //                 updates: this.state.updates,
    //             }
    //         })

    //         console.log("RESP VIEW UPDATE RES: ", response)

    //     }
    //     catch(err){
    //         console.log("RESP VIEW UPDATE RES: ", err.response)
    //     }
    // }

    render() {
        const { classes, rows, data, headerTitle, handleCheckboxChange, handleUpdate, actions, disabled, responsibility } = this.props;
        const { /* data, */ order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
                <Paper className={classes.root}>
                    <EnhancedTableToolbar
                        headerTitle={headerTitle}
                        handleUpdate={handleUpdate}
                        actions={actions}
                        disabled={disabled}
                        responsibility={responsibility}
                    />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                rows={rows}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody className={classes.tableBody}>
                                { data.length === 0 ? 
                                    <Typography align='center' variant='overline'>Nothing To Show Here...</Typography> :
                                    
                                    stableSort(data.length > 0 ? data : [], getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((n, index) => {
                                        console.log(n.FLG_01, "    ", n.FLG_02)
                                        return (
                                            <TableRow
                                                tabIndex={-1}
                                                key={n.id}
                                                classes={{
                                                    root: classes.row,
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                    classes={{ root: classes.tableCellAction }}
                                                >
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="Delete" onClick={() => this.handleDelete(n.C_RESP_VIEW.row_id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
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
                                                    padding="none"
                                                    classes={{ root: classes.tableCellDetail }}
                                                >
                                                    {n.desc}
                                                </TableCell>
                                                <TableCell
                                                    role="checkbox"
                                                    align="left"
                                                    padding="none"
                                                    classes={{ root: classes.tableCellSmall }}
                                                >
                                                    <input
                                                        id="readOnly"
                                                        name="readOnly"
                                                        type="checkbox"
                                                        defaultChecked={!!n.C_RESP_VIEW.FLG_01}
                                                        disabled={disabled}
                                                        onChange={(event) => handleCheckboxChange(event, n.row_id,  n.C_RESP_VIEW.row_id)}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    role="write"
                                                    align="left"
                                                    padding="none"
                                                    classes={{ root: classes.tableCellSmall }}
                                                >
                                                    <input
                                                        id="write"
                                                        name="write"
                                                        type="checkbox"
                                                        defaultChecked={!!n.C_RESP_VIEW.FLG_02}
                                                        disabled={disabled}
                                                        onChange={(event) => handleCheckboxChange(event, n.row_id, n.C_RESP_VIEW.row_id)}
                                                    />
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
                </Paper>
        );
    }
}

EnhancedDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedDataTable);