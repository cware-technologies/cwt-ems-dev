import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Container from './MainContainer';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { formStyle } from '../styles/form';

const leaveTypes = [
    {
        value: 'Casual Leave',
        label: 'Casual Leave',
    },
    {
        value: 'Sick Leave',
        label: 'Sick Leave',
    },
    {
        value: 'Annual Leave',
        label: 'Annual Leave',
    },
    {
        value: 'Urgent Leave',
        label: 'Urgent Leave',
    },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, that) {
    return {
        fontWeight:
            that.state.name.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaveType: null,
            applyTo: [],
        }
    }
    // handleChange = (e, field) => {
    //     // let target = e.target;
    //     // this.setState(prevState => ({
    //     //     [field]: target.value,
    //     // }));
    // }

    handleChange = event => {
        this.setState({ applyTo: event.target.value }, console.log(this.state.applyTo));
    };

    handleChangeTypeOfLeave = event => {

    }

    render() {
        let { classes } = this.props;

        return (
            <Container>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={classes.heading}>
                        Personal Information
                    </Typography>
                    <TextField
                        id="outlined-dense"
                        label="Department"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Start Date"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="End Date"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Duration"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                            endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="filled-select-leave-native"
                        select
                        label="Type of leave"
                        className={classNames(classes.textField, classes.dense)}
                        value={this.state.leaveType}
                        onChange={this.handleChangeTypeOfLeave}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        // helperText="Please select your currency"
                        margin="dense"
                        variant="filled"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    >
                        {leaveTypes.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-dense"
                        label="Other"
                        multiline
                        rows="5"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Detail"
                        multiline
                        rows="5"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <FormControl className={classNames(classes.formControl, classes.inputRoot, classes.textField)}>
                        <InputLabel htmlFor="apply-to" className={classes.inputLabel} style={{ zIndex: '1', marginLeft: '5px', }}>Apply To</InputLabel>
                        <Select
                            multiple
                            value={this.state.applyTo}
                            onChange={this.handleChange}
                            input={<FilledInput id="apply-to" className={classes.input} />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected && selected.map(value => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map(name => (
                                <MenuItem key={name} value={name} >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Apply
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(formStyle, { withTheme: true })(CreateAccount);