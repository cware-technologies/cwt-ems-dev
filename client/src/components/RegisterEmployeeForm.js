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
    bu_id: {
        presence: {
            allowEmpty: false,
            message: "is Required"
        },
    },
    div_id: {
        // presence: {
        //     allowEmpty: false,
        //     message: "is Required"
        // },
    },
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

let dropdowns = [
    {name:'dropdown_1', value: 'bu_id'},
    {name:'dropdown_2', value: 'div_id'},
    {name:'dropdown_3', value:'postn_held_id'},
    // {name:'dropdown_4', value:'resp_id'},
    // {name:'dropdown_5', value:'report_to_id'},
]

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                login:'',
                password: '',
                firstName: '',
                lastName: '',
                empNum:'',
                organization: null,
                division: null,
                position: null,
                responsibility: null,
                reportsTo: null,
            },
            confirmPassword: '',
            errors: {
            
            },
            response: {

            },
            showPassword: false,


            dropdown_1: {
                disabled:true,
                value: null,
                data: [],
            },
            dropdown_2: {
                disabled:true,
                value: null,
                data: [],
            },
            // dropdown_3: {
            //     disabled:true,
            //     value: null,
            //     data: [],
            // },
            // dropdown_4: {
            //     disabled:true,
            //     value: null,
            //     data: [],
            // },
            // dropdown_5: {
            //     disabled:true,
            //     value: null,
            //     data: [],
            // },
        }

        this.debouncedSelectChange = debounce(this.handleSelectChange, 500);
    }

    async componentDidMount(){
        let response
        
        try{
            response = await axios({
                method: 'get',
                url: '/admin/org-struct/organization',
            })

            this.handleGetResponse(response, 'dropdown_0')
        }
        catch(err){
            this.handleGetResponse(err.response, 'dropdown_0')
        }
    }

    handleGetResponse = (res, field) => {
        let data = res.data.result;
        let target = this.getNextDropdown(field)

        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetching: false,
                success: false,
            }))
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                [target]: {
                    ...prevState[target],
                    data,
                    disabled: false,
                },
                isFetching: false,
                success: true,
            }))
        }
    }

    getNextDropdown = (prevDD) => {
        let array = prevDD.split('_')
        let DDNo = parseInt(array[1])
        DDNo = DDNo + 1
        array[1] = DDNo
        let temp = array.join("_")
        return temp
    }

    handleOrganizationChange = () => {

    }

    handleSelectChange = (event) => {
        let name = event.target.id
        let state = dropdowns.find((dropdown) => {
            if(dropdown.name === name)
                return dropdown.value
        }).value
        let value = event.target.value
        let endpoint = event.target.name
        // event.target.id = state
        this.validate(event)

        this.setState(prevState => ({
            [name] : {
                ...prevState[name],
                value,
            }
        }), () => {
            console.log(this.state)
            return this.props.changeHandler(state, value)
            .then(res => this.OrgRequest(endpoint, name))
            .catch(err => { return })
            }
        )

    }

    OrgRequest = async(endpoint, name) => {

        if(this.state[name].value === null || this.state[name].value === ""){
            if(name === 'dropdown_1'){
                this.setState(prevState => ({
                    dropdown_2: {
                        disabled : true,
                        value : null,
                        data : []
                    },
                    dropdown_3: {
                        disabled : true,
                        value : null,
                        data : []
                    },
                    dropdown_4: {
                        disabled : true,
                        value : null,
                        data : []
                    },
                    dropdown_5: {
                        disabled : true,
                        value : null,
                        data : []
                    },
                }))
            }
            else if(name === 'dropdown_2'){
                this.setState(prevState => ({
                    dropdown_3: {
                        disabled : true,
                        value : null,
                        data : []
                    }
                }))
            }
            return
        }

        let response        
        try{
            response = await axios({
                method: 'get',
                url: `${endpoint}`,
                params: {
                    bu_id: this.state.dropdown_1.value && this.state.dropdown_1.value,
                    div_id: this.state.dropdown_2.value && this.state.dropdown_2.value,
                }
            })
            this.handleGetResponse(response, name)
        }
        catch(err){
            this.handleGetResponse(err.response, name)
        }
    }

    handleTextChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.validate(event)
        this.props.changeHandler(target, value)
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

    // setStateBeforeSubmit = () => {
    //     return new Promise((reject, resolve) => {
    //         dropdowns.map(dropdown => {
    //             this.setState(prevState => ({
    //                 employee: {
    //                     ...prevState.employee,
    //                     [dropdown.value]: this.state[dropdown.name].value,
    //                 }
    //             }), resolve)
    //         })
    //     })   
    // }

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
        let { classes, employee, editMode } = this.props;
        let { errors, response } = this.state;

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
                        label="Login *"
                        value={employee.login}
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
                            classes={{
                                root: classes.inputRoot,
                            }}
                            className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                            margin="dense"
                            variant="filled"
                            InputProps={{
                                className: classes.input,
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
                            InputLabelProps={{
                                className: classes.inputLabel,
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
                            classes={{
                                root: classes.inputRoot,
                            }}
                            className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                            margin="dense"
                            variant="filled"
                            InputProps={{
                                className: classes.input,
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
                            InputLabelProps={{
                                className: classes.inputLabel,
                            }}
                        />
                    </React.Fragment>
                    }
                    <TextField
                        id="fst_name"
                        label="First Name *"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        error={errors.fst_name}
                        helperText={errors.fst_name && <ul className={classes.errorList}> {errors.fst_name.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        value={employee.fst_name}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
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
                        id="last_name"
                        label="Last Name *"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        error={errors.last_name}
                        helperText={errors.last_name && <ul className={classes.errorList}> {errors.last_name.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        value={employee.last_name}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
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
                        Employee Details
                    </Typography>
                    <TextField
                        id="emp_num"
                        label="Employee ID *"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        value={employee.emp_num}
                        error={errors.emp_num}
                        helperText={errors.emp_num && <ul className={classes.errorList}> {errors.emp_num.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onChange={this.handleTextChange}
                        onBlur={this.validate}
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
                        id="dropdown_1"
                        name="/admin/org-struct/division"
                        select
                        label={`Organization *`}
                        error={errors.bu_id}
                        helperText={errors.bu_id && <ul className={classes.errorList}> {errors.bu_id.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        disabled={this.state.dropdown_1.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={employee.bu_id}
                        onChange={this.handleSelectChange}
                        onBlur={this.validate}
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
                            shrink: true,
                        }}
                    >
                        <option value={null}>
                            {''}
                        </option>
                        {this.state.dropdown_1.data.map(option => (
                            <option key={option.row_id} value={option.row_id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="dropdown_2"
                        name="/admin/org-struct/position"
                        select
                        label={`Division`}
                        error={errors.div_id}
                        helperText={errors.div_id && <ul className={classes.errorList}> {errors.div_id.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        disabled={!!this.state.dropdown_1.value}
                        className={classNames(classes.textField, classes.dense)}
                        value={employee.div_id}
                        onChange={this.handleSelectChange}
                        onBlur={this.validate}
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
                            shrink: true,
                        }}
                    >
                        <option value={null}>
                            {''}
                        </option>
                        {this.state.dropdown_2.data.map(option => (
                            <option key={option.row_id} value={option.row_id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                    {/* <TextField
                        id="dropdown_3"
                        name="/admin/org-struct/responsibility"
                        select
                        label={`Position`}
                        helperText={errors.postn_held_id && <ul className={classes.errorList}> {errors.postn_held_id.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        disabled={this.state.dropdown_3.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={employee.postn_held_id}
                        onChange={this.handleSelectChange}
                        onBlur={this.validate}
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
                            shrink: true,
                        }}
                    >
                        <option value={null}>
                            {''}
                        </option>
                        {this.state.dropdown_3.data.map(option => (
                            <option key={option.row_id} value={option.row_id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="dropdown_4"
                        name="/employee/employee"
                        select
                        label={`Responsibility`}
                        helperText={errors.resp_id && <ul className={classes.errorList}> {errors.resp_id.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        disabled={this.state.dropdown_4.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={employee.resp_id}
                        onChange={this.handleSelectChange}
                        onBlur={this.validate}
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
                            shrink: true,
                        }}
                    >
                        <option value={null}>
                            {''}
                        </option>
                        {this.state.dropdown_4.data.map(option => (
                            <option key={option.row_id} value={option.row_id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="dropdown_5"
                        name=""
                        select
                        label={`Reports To`}
                        helperText={errors.report_to_id && <ul className={classes.errorList}> {errors.report_to_id.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        disabled={this.state.dropdown_5.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={employee.report_to_id}
                        onChange={this.handleSelectChange}
                        onBlur={this.validate}
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
                            shrink: true,
                        }}
                    >
                        <option value={null}>
                            {''}
                        </option>
                        {this.state.dropdown_5.data.map(option => (
                            <option key={option.row_id} value={option.row_id}>
                                {`${option.fst_name} ${option.last_name}`}
                            </option>
                        ))}
                    </TextField> */}
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