import React from 'react';
import PropTypes, { bool } from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash.debounce'
import { withStyles, withTheme } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
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
import AsyncSelect from './AsyncSelect';

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

let constraints = {
    login: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    //   email: true,
    },
    hash_pwd: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    //   format: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s).{8,}/,
    //   length: {
    //     minimum: 8,
    //     message: "must be at least 8 characters"
    //   }
    },
    confirmPassword: {
        equality: "password",
    },
    fst_name: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    last_name: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    emp_num: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    "bu_id.value": {
        presence: {
            allowEmpty: false,
            message: "is Required"
        },
    },
    ATTRIB_18: {
        presence: {
            allowEmpty: false,
            message: "is Required"
        },
    },
    // div_id: {
        // presence: {
        //     allowEmpty: false,
        //     message: "is Required"
        // },
    // },
    // postn_held_id: {
    //     // presence: {
    //     //     allowEmpty: false,
    //     //     message: "Is Required"
    //     // },
    // },
    // resp_id: {
    //     // presence: {
    //     //     allowEmpty: false,
    //     //     message: "Is Required"
    //     // },
    // },
    // report_to_id: {

    // },
};

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                login:'',
                hash_pwd: '',
                fst_name: '',
                last_name: '',
                emp_num:'',
                bu_id: { label: '', value: null },
                div_id: { label: '', value: null },
                postn_held_id: { label: '', value: null },
                resp_id: null,
                report_to_id: null,
            },
            confirmPassword: '',
            errors: {
            
            },
            response: {

            },
            showPassword: false,
        }

        this.debouncedSelectChange = debounce(this.handleSelectChange, 500);
    }

    async componentDidMount(){
        this.setState(prevState => ({
            employee: this.props.employee,
        }))
    }

    handleSelectChange = (name, obj) => {
        if(name === 'bu_id'){
            this.setState(prevState => ({
                employee: {
                    ...prevState.employee,
                    [name] : obj,
                    div_id: { label : '', value: null },
                    postn_held_id: { label : '', value: null },
                    resp_id: { label : '', value: null },
                }
            }), () => {this.props.changeHandler(name, obj)})
        }
        else if(name === 'div_id')
            this.setState(prevState => ({
                employee: {
                    ...prevState.employee,
                    [name] : obj,
                    postn_held_id: { label : '', value: null },
                }
            }), () => {this.props.changeHandler(name, obj)})
        else {
            this.setState(prevState => ({
                employee: {
                    ...prevState.employee,
                    [name] : obj,
                }
            }), () => {this.props.changeHandler(name, obj)})
        }
    }

    handleTextChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        let ev = {
            target: {
                id: target,
                value: value,
            }
        }
        this.props.changeHandler(target, value)
        .then(result =>
            this.validate(ev)
        )
        .catch(err=>console.log)
    }

    handleConfirmPassChange = (event) => {
        event.target.id = 'confirmPassword'
        let target = event.target.id;
        let value = event.target.value;
        
        let ev = {
            target: {
                id: target,
                value: value,
            }
        }
        this.setState(prevState => ({
            confirmPassword: value,
        }), () => this.validate(ev))
    }

    handleClickShowPassword = () => {
        this.setState(state => ({
            showPassword: !state.showPassword
        }));
    };

    validate = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        let val_errors;
        let confirmPasswordVal;

        val_errors = validate.single(value, constraints[target]);

        if (this.props.employee.hash_pwd !== this.state.confirmPassword)
            confirmPasswordVal = ["Not the same as the password"]
        else
            confirmPasswordVal = undefined
        
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [target]: val_errors,
                confirmPassword: confirmPasswordVal,
            },
        }));
    }

    validateAll = async () => {
        let confirmPasswordVal;
        let val_errors
        let temp_errors = await validate(this.props.employee, constraints)

        if(!this.props.editMode){
            if (this.props.employee.hash_pwd !== this.state.confirmPassword)
            confirmPasswordVal = ["Not the same as the password"]

            val_errors = {
                confirmPassword: confirmPasswordVal,
                ...temp_errors,
            }
        }

        let errors = val_errors ? Object.filter(val_errors, property => property !== undefined) : {}
        this.setState(prevState => ({
            errors
        }));
    }

    allValid = async() => {
        let localConstraints

        if(this.props.editMode)
            localConstraints = (({login, fst_name, last_name, emp_num, bu_id, div_id}) => ({login, fst_name, last_name, emp_num, bu_id, div_id}))(constraints)
        else
            localConstraints = constraints
        
        await this.validateAll(this.props.employee, localConstraints)

        if(Object.keys(this.state.errors).length === 0 && this.state.errors.constructor === Object){
            this.setState(prevState => ({
                response: {}
            }))
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
        let response;
        let employee = this.state.employee

        if (await this.allValid()) {
            this.props.submitHandler()
        }
    }

    handleResponse = (res) => {
        let response = res.data;

        this.setState(prevState => ({
            response
        }))
    }

    render(){
        let { classes, editMode, employee } = this.props;
        let { errors, response,  } = this.state;

        console.log("EMPLOYEE: ", employee)
        return(
            <React.Fragment>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Login Details
                    </Typography>
                    <FormHelperText>{response.status && <ul className={response.status<300?classes.successList:classes.errorList}><li className={classes.errorListItem}>{response.message}</li></ul>}</FormHelperText>
                    <TextField
                        error={errors.login}
                        helperText={errors.login && <ul className={classes.errorList}> {errors.login.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        id="login"
                        label="Login"
                        required={true}
                        value={employee.login}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                    />
 
                    {!editMode && 
                    
                    <React.Fragment>
                        <TextField
                            id="hash_pwd"
                            label="Password *"
                            value={employee.hash_pwd}
                            error={errors.hash_pwd}
                            helperText={errors.hash_pwd && <ul className={classes.errorList}> {errors.hash_pwd.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                            onBlur={this.validate}
                            onChange={this.handleTextChange}
                            type={this.state.showPassword ? 'text' : 'password'}
                            className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                            margin="dense"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment tabIndex={-1} position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    tabIndex={-1}
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                            }}
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password *"
                            type={this.state.showPassword ? 'text' : 'password'}
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword && <ul className={classes.errorList}> {errors.confirmPassword.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                            value={this.state.confirmPassword}
                            onBlur={this.validate}
                            onChange={this.handleConfirmPassChange}
                            className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                            margin="dense"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment tabIndex={-1} position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    tabIndex={-1}
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                            }}
                        />
                    </React.Fragment>
                    }
                    <TextField
                        id="fst_name"
                        label="First Name *"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="outlined"
                        error={errors.fst_name}
                        helperText={errors.fst_name && <ul className={classes.errorList}> {errors.fst_name.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        value={employee.fst_name}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
                    />
                    <TextField
                        id="last_name"
                        label="Last Name *"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="outlined"
                        error={errors.last_name}
                        helperText={errors.last_name && <ul className={classes.errorList}> {errors.last_name.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        value={employee.last_name}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
                    />
                </div>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Employee Details
                    </Typography>
                    <TextField
                        id="emp_num"
                        label="Employee ID *"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="outlined"
                        value={employee.emp_num}
                        error={errors.emp_num}
                        helperText={errors.emp_num && <ul className={classes.errorList}> {errors.emp_num.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
                    />
                    <AsyncSelect
                        name='organization'
                        id='bu_id'
                        endpoint='/admin/org-struct/organization'
                        query={{}}
                        value={ employee.bu_id }
                        mapping={['name', 'row_id', null, 'desc']}
                        isDisabled={false}
                        handleSelectChange={this.debouncedSelectChange}
                    />
                    {errors["bu_id.value"] && <FormHelperText error><ul className={classes.errorList}> {errors["bu_id.value"].map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul></FormHelperText> }
                    <AsyncSelect
                        name='division'
                        id='div_id'
                        endpoint='/admin/org-struct/division'
                        query={ { bu_id: employee.bu_id.value } }
                        value={ employee.div_id }
                        mapping={['name', 'row_id', null, 'desc']}
                        isDisabled={ employee.bu_id.value }
                        handleSelectChange={ this.debouncedSelectChange }
                    />
                    <AsyncSelect
                        name='position'
                        id='postn_held_id'
                        endpoint='/admin/org-struct/position'
                        query={ { bu_id: employee.bu_id.value, div_id: employee.div_id.value } }
                        value={ employee.postn_held_id }
                        mapping={['name', 'row_id', null, 'desc']}
                        isDisabled={ employee.div_id.value }
                        handleSelectChange={ this.debouncedSelectChange }
                    />
                    <AsyncSelect
                        name='responsibility'
                        id='resp_id'
                        endpoint='/admin/org-struct/responsibility'
                        query={ { bu_id: employee.bu_id.value } }
                        value={ employee.resp_id }
                        mapping={['name', 'row_id', null, 'desc']}
                        isDisabled={ employee.bu_id.value }
                        handleSelectChange={ this.debouncedSelectChange }
                    />
                    <div className={classes.outlinedFormSection}>
                        <Typography variant="body1" gutterBottom component="p" className={ classes.heading }>
                            Reports To
                        </Typography>
                        <AsyncSelect
                            name='reports to position'
                            id='report_to_position'
                            endpoint='/admin/org-struct/position'
                            query={ { bu_id: employee.bu_id.value } }
                            value={ employee.report_to_position }
                            mapping={['name', 'row_id', ['division', 'name'], 'desc']}
                            isDisabled={ employee.postn_held_id.value }
                            handleSelectChange={ this.debouncedSelectChange }
                        />
                        <AsyncSelect
                            name='reports to'
                            id='report_to_id'
                            endpoint='/admin/getEmployees'
                            query={ { bu_id: employee.bu_id.value, postn_held_id: employee.report_to_position.value } }
                            value={ employee.report_to_id }
                            mapping={['full_name', 'row_id', ['division', 'name'], ['position_held', 'name']]}
                            isDisabled={ employee.report_to_position.value }
                            handleSelectChange={ this.debouncedSelectChange }
                        />
                    </div>
                    <TextField
                        id="ATTRIB_01"
                        label="Location"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="outlined"
                        value={employee.ATTRIB_01}
                        error={errors.ATTRIB_01}
                        helperText={errors.ATTRIB_01 && <ul className={classes.errorList}> {errors.ATTRIB_01.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
                    />
                    <TextField
                        id="ATTRIB_18"
                        type='date'
                        label="Date Of Contract"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="outlined"
                        value={employee.ATTRIB_18}
                        error={errors.ATTRIB_18}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText={errors.ATTRIB_18 && <ul className={classes.errorList}> {errors.ATTRIB_18.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
                    />
                </div>
                <FormHelperText>{response.status && <ul className={response.status<300?classes.successList:classes.errorList}><li className={classes.errorListItem}>{response.message}</li></ul>}</FormHelperText>
                <Button onClick={this.submitForm} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                    {editMode ? "Update" : "Register"}
                </Button>
            </React.Fragment>
        )
    }
}

export default withStyles(formStyle)(CreateAccount);