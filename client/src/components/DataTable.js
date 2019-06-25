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
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Switch from '@material-ui/core/Switch';
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
        // justifyContent: 'center',
        alignItems: 'center',
    },
    tableCellAction: {
        flexBasis: '48px',
        flexGrow: 0,
        padding: 0,
        display: 'flex',
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
    },
    rowActions: {
        flexBasis: '105px',
        flexGrow: 0,
        padding: 0,
        display: 'flex',
    },
    selectableRow: {
        flexBasis: '90%',
        flexGrow: 1,
        padding: 0,
        display: 'flex',
    },
    '@global': {
        'tbody > tr:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[300],
        }
    },
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
                    {
                        this.props.actions &&
                        <div id='row-actions' className={classes.rowActions}>
                                <TableCell
                                    align="left"
                                    padding="none"
                                    classes={{ root: classes.tableCellAction }}
                                />
                                <TableCell
                                    align="left"
                                    padding="none"
                                    classes={{ root: classes.tableCellAction }}
                                />
                            </div>
                    }
                    <div 
                        id='selectable-row'
                        className={classes.selectableRow} 
                    >
                        {rows.map(
                            row => (
                                <TableCell
                                    key={row.id}
                                    align={row.numeric ? 'right' :  row.lengthRatio === 'Small' ? 'center' : 'left'}
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
                    </div>
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
        display: 'flex',
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
    tableTitle: {
        textTransform: 'capitalize',
        flexBasis: '30%',
        flexGrow: 1,
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
    selectedChips: {
        display: 'flex',
        flexBasis: '60%',
        flexWrap: 'wrap',
        flexGrow: 2,
        // flexGrow: 2,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

let EnhancedTableToolbar = props => {
    const { headerTitle, classes, AddComponent, actionBar, selected, selectedData, handleClearSelection } = props;

    return (
        <Toolbar
            className={classNames(classes.root)}
        >
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle" className={classes.tableTitle}>
                    { headerTitle }
                </Typography>
            </div>
            { selected.length !== 0 &&
                <div className={classes.selectedChips}>
                    <div className={classes.spacer} />
                    {selectedData.map(row => 
                        <Chip
                            label={`${row.name}`}
                            onDelete={() => handleClearSelection(row.row_id)}
                            className={classes.chip}
                            color="primary"
                        />
                    )}
                </div>
            }
            <div className={classes.actions}>
                { AddComponent &&
                    AddComponent
                }
                { actionBar && actionBar.map(action => action) }
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
        minWidth: 300,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableCellAction: {
        flexBasis: '2%',
        flexGrow: 0.5,
        padding: 0,
        display: 'flex',
        color: 'white',
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
    rowActions: {
        flexBasis: '105px',
        flexGrow: 0,
        padding: 0,
        display: 'flex',
    },
    selectableRow: {
        flexBasis: '90%',
        flexGrow: 1,
        padding: 0,
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
        backgroundColor: theme.palette.secondary,
        border: `2px solid ${theme.palette.secondary.dark}`,
    }
});

class EnhancedDataTable extends React.Component {
    checkboxRef = React.createRef()
    state = {
        order: 'asc',
        orderBy: 'name',
        data: [],
        page: 0,
        rowsPerPage: 5,
        modalOpen: false,
        selectedRow: null,
        selected: [],
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

    setEditMode = (data, component) => {
        this.setState(prevState => ({
            selectedRow: data.row_id,
        }), () => this.props.setEditMode(data, component))
    }

    unsetEditMode = (data, component) => {
        this.setState(prevState => ({
            selectedRow: null,
        }), () => this.props.unsetEditMode(data, component))
    }

    handleToggleChange = async (e, data) => {
        let value = e.target.checked
        let response
        console.log("VALUE!!!: ", e.target.value)
        let confirmed = window.confirm("Are You Sure?")
        if(confirmed){
            this[`checkboxRef${data.row_id}`].disabled = true

            try{
                response = await this.props.handleSwitchChange(value, data.row_id)

                console.log("REFERENCE SUCCESS: ", this[`checkboxRef${data.row_id}`])
                this[`checkboxRef${data.row_id}`].checked = value
                this[`checkboxRef${data.row_id}`].disabled = false
                return
            }
            catch(err){
                console.log("REFERENCE FAILURE: ", this[`checkboxRef${data.row_id}`])
                this[`checkboxRef${data.row_id}`].checked = !value
                this[`checkboxRef${data.row_id}`].disabled = false
                return
            }
        }
        else{
            console.log(value, "     ", !value, "    ",  this[`checkboxRef${data.row_id}`])
            this[`checkboxRef${data.row_id}`].checked = !value
            return
        }
    }

    getRowComponent = (type, id, data) => {
        switch(type){
            case 'toggle':
                console.log("ACTIVE: ", this.props.switchActive, "  ", !!this.props.switchActive)
                console.log("FLAG: ", data, "    ",!parseInt(data[id]), ": ", !!parseInt(data[id]))
                return (
                    <input
                        id={id}
                        type="checkbox"
                        color="primary"
                        name={data[id]}
                        defaultChecked={data[id] === 'active' ? true : data[id] === 'inactive' ? false : !!parseInt(data[id])}
                        // checked={!!this.props.switchActive}
                        ref={node => this[`checkboxRef${data.row_id}`] = node}
                        onChange={(e) => this.handleToggleChange(e, data)}
                        value={data[id] == '1' ? "active" : data[id] == '0' ? 'inactive' : data[id] }
                    />
                )
        }
    }

    getCellValue = (obj, nesting) => {

        if(typeof nesting === 'string')
            return obj[nesting]

        let value = obj
        nesting.forEach(field => {
            value = value[field]
        })
        return value
    }

    isSelected = (id) => {
        return this.state.selected.indexOf(id) !== -1
    }

    multipleRowsSelect = (id) => {
        return new Promise((resolve, reject) => {
            let { selected } = this.state
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
        
            this.setState(prevState => ({
                selected: newSelected
            }), () => resolve())
        })
    }

    selectEntity = async (event, id, org) => {
        if(this.props.selectMultiple){
            await this.multipleRowsSelect(id)
            if(this.props.title === 'view')
                org = null

            this.props.selectEntity(this.props.headerTitle, this.state.selected, org)
        }
        else{
            if(this.state.selected[0] === id){
                this.handleClearSelection(id)
            }
            else{
                this.setState(prevState => ({
                    selected: [id]
                }), () => {
                    if(this.props.title === 'view')
                        org = null
                    
                    this.props.selectEntity(this.props.headerTitle, this.state.selected[0], org)
                })
            }
        }
        
    }

    handleDelete = (id) => {
        let confirmation = window.confirm("Are You Sure You Want To Delete This Record?")
        if(confirmation){
            this.props.handleDelete(id)
        }
        else{
            return
        }
    }

    handleClearSelection = (id) => {
        let newSelected = this.state.selected.filter(row => row !== id)

        this.setState(prevProps => ({
            selected: newSelected,
        }), () => this.props.clearSelection(this.props.headerTitle, this.state.selected))
    }

    render() {
        const { classes, rows, data, headerTitle, editMode, handleDelete, disableEdit, isSelectable } = this.props;
        const { /* data, */ order, orderBy, rowsPerPage, page, selected } = this.state;
        const { setEditMode, unsetEditMode } = this;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        console.log(headerTitle)
        return (
                <Paper className={classes.root}>
                    <EnhancedTableToolbar
                        headerTitle={headerTitle}
                        AddComponent={this.props.AddComponent}
                        actionBar={this.props.actionBar}
                        selected={selected}
                        selectedData={data.filter(row => selected.find(id => row.row_id === id))}
                        handleClearSelection={this.handleClearSelection}
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
                                { data.length === 0 ? 
                                    <Typography align='center' variant='overline'>Nothing To Show Here...</Typography> :
                                    stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(data => {
                                        let isSelected = editMode || this.isSelected(data.row_id)
                                        return (
                                            <TableRow
                                                role="checkbox"
                                                tabIndex={-1}
                                                aria-checked={isSelected}
                                                selected={isSelected}
                                                key={data.row_id}
                                                classes={{
                                                    root: classes.row,
                                                }}
                                                className={isSelected && classes.selected}
                                            >
                                                {
                                                    this.props.actions &&
                                                        <div id='row-actions' className={classes.rowActions}>
                                                            <TableCell
                                                                align="left"
                                                                padding="none"
                                                                classes={{ root: classes.tableCellAction }}
                                                            >
                                                            { editMode ?  isSelected ?
                                                                <Tooltip title="Edit">
                                                                    <IconButton aria-label="Cancel" onClick={() => unsetEditMode(data, headerTitle)}>
                                                                        <CancelIcon />
                                                                    </IconButton>
                                                                </Tooltip> : 
                                                                <Tooltip title="Edit">
                                                                    <IconButton aria-label="Edit" onClick={() => setEditMode(data, headerTitle)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip> :
                                                                <Tooltip title="Edit">
                                                                <IconButton aria-label="Edit" disabled={disableEdit} onClick={() => setEditMode(data, headerTitle)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            }
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                padding="none"
                                                                classes={{ root: classes.tableCellAction }}
                                                            >
                                                                <Tooltip title="Delete">
                                                                    <IconButton disabled={editMode} aria-label="Delete" onClick={() => this.handleDelete(data.row_id)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </div>
                                                }
                                                <div 
                                                    id='selectable-row'
                                                    style={ !isSelectable ? { cursor: 'auto'} : {} }
                                                    className={classes.selectableRow} 
                                                    onClick={isSelectable ? event => this.selectEntity(event, data.row_id, data.bu_id ) : null}
                                                >
                                                    {
                                                        rows.map(row => {
                                                            let cellValue = this.getCellValue(data, row.id)

                                                            return(
                                                                <Tooltip title={cellValue}>
                                                                    <TableCell
                                                                        key={data.row_id}
                                                                        component="th"
                                                                        scope="row"
                                                                        padding="none"
                                                                        classes={{ root: classes[`tableCell${row.lengthRatio}`] }}
                                                                    >
                                                                        { 
                                                                            !row.type || row.type === 'text' ? 
                                                                                !row.date ? 
                                                                                    cellValue : 
                                                                                    getDate(cellValue).toDateString() :
                                                                            this.getRowComponent(row.type, row.id, data)
                                                                        }
                                                                    </TableCell>
                                                                </Tooltip>
                                                            )
                                                        })
                                                    }
                                                </div>
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