import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Container from './MainContainer';
import { formStyle } from '../styles/form';

const getToday = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render(){
        let { classes } = this.props;

        return(
            <Container>
                <div className={classes.appBarSpacer} />
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Personal Information
                    </Typography>
                    <TextField
                        id="outlined-dense"
                        label="First Name"
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
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Last Name"
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
                        label="Father's Name"
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
                        label="CNIC"
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
                        label="Date Of Birth"
                        type="date"
                        defaultValue={getToday()}
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense)}
                        
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Religion"
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
                        label="Password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                            endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Confirm Password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                            endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                </div>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Contact Details
                    </Typography>
                    <TextField
                        id="outlined-dense"
                        label="Cell"
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
                        label="Landline"
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
                        label="Email Address"
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
                        label="Postal Address"
                        multiline
                        rows="2"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.fullSpanInput)}
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
                        label="Permanent Address"
                        multiline
                        rows="2"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.fullSpanInput)}
                        margin="dense"
                        variant="filled"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                </div>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Official Details
                    </Typography>
                    <TextField
                        id="outlined-dense"
                        label="Account No."
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
                        label="Designation"
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
                    <Button variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Submit
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(formStyle)(CreateAccount);