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
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Container from './MainContainer';
import { formStyle } from '../styles/form';
// import  from 'simple-react-';
import validate from 'validate.js';

let constraints = {
    email: {
      presence: true,
      email: true,
    },
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
                isAdmin: false,
            },
            confirmPassword: '',
            errors: {
            
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
        
        console.log(val_errors);
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [target]: val_errors,
                confirmPassword: confirmPasswordVal,
            },
        }), console.log(this.state.errors));
    }

    allValid = () => {
        // let fields = Object.keys(this.state.employee)
        // let values = fields.map(field => this.state.employee[field])
        // let employee = {}
        // [fields, values].forEach(
        //     function (a) {
        //       [0, 1, 2].forEach(
        //         function (i) {
        //           // side-effect on an array outside the function
        //           employee[i] = a[i];
        //         }
        //       );
        //     }
        //   );
        // console.log(fields)
        // console.log(values)
        // console.log(employee)
        // // val_errors = validate(value, constraints[target]);
        return true;
    }

    submitForm = async() => {
        let employee = this.state.employee

        if (this.allValid()) {
            try{
                let response = await axios({
                    method: 'post',
                    url: '/auth/register',
                    data: employee,
                    headers: {
                        'content-type': 'application/json',
                    }
                })

                console.log('RESPONSE FROM EMS:', response);
            }
            catch(err){
                console.log('Error In AXIOS request ', err);
            }
        }

        // let employee = this.state.employee
        // try{
        //     let response = await axios({
        //         method: 'post',
        //         url: '/auth/register',
        //         data: employee,
        //         headers: {
        //             'content-type': 'application/json',
        //         }
        //     })

        //     console.log('RESPONSE FROM EMS:', response);
        // }
        // catch(err){
        //     console.log('Error In AXIOS request ', err);
        // }
    }

    render(){
        let { classes } = this.props;
        let { employee, errors } = this.state;

        return(
            <Container>
                <div className={classes.appBarSpacer} />
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Register An Employee
                    </Typography>
                    <TextField
                        error={errors.email}
                        helperText={errors.email && <ul className={classes.errorList}> {errors.email.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        id="email"
                        label="Email Address"
                        value={employee.email_id}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
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
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                id="isAdmin-checkbox"
                                checked={this.state.employee.isAdmin}
                                onChange={this.handleAdminChange}
                                value="isAdmin"
                            />
                        }
                        label="Make the Employee Admin?"
                    /> */}
                    <FormControl component="fieldset" className={classes.radioGroup}>
                        <FormLabel component="legend" className={classes.legend}>Access Rights</FormLabel>
                        <RadioGroup
                            aria-label="Access Rights"
                            name="access_rights"
                            className={classes.group}
                            value={this.state.value}
                            onChange={this.handleChange}
                            defaultValue="employee"
                        >
                            <FormControlLabel value="employee" control={<Radio />} label="Employee" />
                            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>

                    <Button onClick={this.submitForm} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Register
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(formStyle)(CreateAccount);