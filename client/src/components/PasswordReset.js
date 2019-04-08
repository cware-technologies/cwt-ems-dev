import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Container from './MainContainer';
import { formStyle } from '../styles/form';
// import  from 'simple-react-';
import validate from 'validate.js';

let constraints = {
    password: {
      presence: true,
      format: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s).{8,}/,
      length: {
        minimum: 8,
        message: "must be at least 8 characters"
      }
    },
    confirmPassword: {
        equality: "password",
    }
};

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                email:'',
                password: '',
                firstName: '',
                lastName: '',          
                isAdmin: false,
            },
            confirmPassword: '',
            errors: {
            
            },
            response: {

            },
            showPassword: false,
        }
    }

    handleTextChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            employee: {
                ...prevState.employee,
                [target]: value,
            }
        }))
    }

    handleConfirmPassChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            confirmPassword: value,
        }))
    }

    handleClickShowPassword = () => {
        this.setState(state => ({
            showPassword: !state.showPassword
        }));
    };

    handleAdminChange = () => {
        this.setState(prevState => ({
            employee: {
                ...prevState.employee,
                isAdmin: !prevState.employee.isAdmin,
            }
        }))
    }

    validate = async(event) => {
        let target = event.target.id;
        let value = event.target.value;
        let val_errors;
        let confirmPasswordVal;

        
        val_errors = validate.single(value, constraints[target]);

        if (this.state.employee.password !== this.state.confirmPassword)
            confirmPasswordVal = ["Not the same as the password"]
        else
            confirmPasswordVal = undefined

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [target]: val_errors,
                confirmPassword: confirmPasswordVal,
            },
        }), console.log(this.state.errors));
    }

    allValid = () => {
        if(validate(this.state.employee, constraints) === undefined){
            return true
        }
        else{
            let response = {
                status: 412,
                message: 'Please Fill The Form Correctly',
            }

            this.setState(prevState => ({
                response,
            }))
            return false
        }
    }

    submitForm = async() => {
        let employee = this.state.employee
        let response;

        if (this.allValid()) {
            try{
                response = await axios({
                    method: 'post',
                    url: '/auth/register',
                    data: employee,
                    headers: {
                        'content-type': 'application/json',
                    }
                })
                console.log(response)
                this.handleResponse(response)
            }
            catch(err){
                this.handleResponse(err.response)
            }
        }
    }

    handleResponse = (res) => {
        let response = res.data;

        this.setState(prevState => ({
            response
        }))
    }

    render(){
        let { classes } = this.props;
        let { employee, errors, response } = this.state;

        return(
            <Container>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Reset Password
                    </Typography>
                    <FormHelperText className={classes.formResponseText}>{response.status && <ul className={response.status<300?classes.successList:classes.errorList}><li className={classes.errorListItem}>{response.message}</li></ul>}</FormHelperText>
                    <TextField
                        id="password"
                        label="Password"
                        value={employee.password}
                        error={errors.password}
                        helperText={errors.password && <ul className={classes.errorList}> {errors.password.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onBlur={this.validate}
                        onChange={this.handleTextChange}
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
                        id="confirmPassword"
                        label="Confirm Password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        error={errors.confirmPassword}
                        helperText={errors.confirmPassword && <ul className={classes.errorList}> {errors.confirmPassword.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onBlur={this.validate}
                        onChange={this.handleConfirmPassChange}
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
                    <Button onClick={this.submitForm} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Submit
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(formStyle)(CreateAccount);