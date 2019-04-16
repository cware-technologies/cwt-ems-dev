import React from 'react';
import PropTypes, { bool } from 'prop-types';
import classNames from 'classnames';
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

let dropdowns = [
    {name:'dropdown_1', value: 'organization'},
    {name:'dropdown_2', value: 'division'},
    {name:'dropdown_3', value:'position'},
    {name:'dropdown_4', value:'responsibility'},
    {name:'dropdown_5', value:'reportsTo'},
]

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                email:'',
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
            dropdown_3: {
                disabled:true,
                value: null,
                data: [],
            },
            dropdown_4: {
                disabled:true,
                value: null,
                data: [],
            },
            dropdown_5: {
                disabled:true,
                value: null,
                data: [],
            },
        }
    }

    async componentDidMount(){
        let response
        
        try{
            response = await axios({
                method: 'get',
                url: '/admin/org-struct/organization',
            })
            console.log("RESPONSE: ", response.data)
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
            }), this.log)
        }
    }
    log(){
        console.log(this.state)
    }

    getNextDropdown = (prevDD) => {
        let array = prevDD.split('_')
        let DDNo = parseInt(array[1])
        DDNo = DDNo + 1
        array[1] = DDNo
        let temp = array.join("_")
        return temp
    }

    handleSelectChange = (event) => {
        let name = event.target.id
        let value = event.target.value
        let endpoint = event.target.name
        console.log("SELECT: ", name)
        let response

        this.setState(prevState => ({
            [name] : {
                ...prevState[name],
                value,
            }
        }), () => {console.log("STATE: ",this.state);this.OrgRequest(endpoint, name)})
    }

    OrgRequest = async(endpoint, name) => {

        if(this.state[name].value === null || this.state[name].value === ""){
            console.log('NNUUUULLLLLL')
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
            console.log("RESPONSE: ", response.data)
            this.handleGetResponse(response, name)
        }
        catch(err){
            this.handleGetResponse(err.response, name)
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
        console.log("IN ALL VALID")
        if(validate(this.state.employee, constraints) === undefined){
            console.log("NO ERRORS")
            return true
        }
        else{
            console.log("ERRORS FOUND")
            let response = {
                status: 412,
                message: 'Please Fill The Form Correctly',
            }

            this.setState(prevState => ({
                response,
            }), console.log(this.state))
            return false
        }
    }

    submitForm = async() => {
        let response;

        dropdowns.map(dropdown => {
            this.setState(prevState => ({
                employee: {
                    ...prevState.employee,
                    [dropdown.value]: this.state[dropdown.name].value,
                }
            }), ()=>console.log('SUBMIT STATE: ', this.state.employee))
        })

        let employee = this.state.employee

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
        }),console.log(this.state.response))
    }

    render(){
        let { classes } = this.props;
        let { employee, errors, response } = this.state;

        return(
            <Container>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Register An Employee
                    </Typography>
                    <FormHelperText>{response.status && <ul className={response.status<300?classes.successList:classes.errorList}><li className={classes.errorListItem}>{response.message}</li></ul>}</FormHelperText>
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
                    <TextField
                        id="firstName"
                        label="First Name"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        onChange={this.handleTextChange}
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
                        id="lastName"
                        label="Last Name"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        onChange={this.handleTextChange}
                        InputProps={{
                            className: classes.input,
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
                    {/* <FormControl component="fieldset" className={classes.radioGroup}>
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
                    </FormControl> */}
                </div>
                <div className={classes.formSection} style={{border: '1px dotted black', padding: '20px',}}>
                    <TextField
                        id="empNum"
                        label="Employee ID"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        value={this.state.employee.empNum}
                        onChange={this.handleTextChange}
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
                        label={`Organization`}
                        disabled={this.state.dropdown_1.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={this.state.dropdown_1.value}
                        onChange={this.handleSelectChange}
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
                        disabled={this.state.dropdown_2.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={this.state.dropdown_2.value}
                        onChange={this.handleSelectChange}
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
                    <TextField
                        id="dropdown_3"
                        name="/admin/org-struct/responsibility"
                        select
                        label={`Position`}
                        disabled={this.state.dropdown_3.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={this.state.dropdown_3.value}
                        onChange={this.handleSelectChange}
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
                        disabled={this.state.dropdown_4.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={this.state.dropdown_4.value}
                        onChange={this.handleSelectChange}
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
                        disabled={this.state.dropdown_5.disabled}
                        className={classNames(classes.textField, classes.dense)}
                        value={this.state.dropdown_5.value}
                        onChange={this.handleSelectChange}
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
                    </TextField>
                </div>
                <Button onClick={this.submitForm} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                    Register
                </Button>
            </Container>
        )
    }
}

export default withStyles(formStyle)(CreateAccount);