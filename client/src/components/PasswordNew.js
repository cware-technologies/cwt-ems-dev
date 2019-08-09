import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { formStyle } from '../styles/form';
import Container from './MainContainer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import axios from 'axios';
import { alertActions } from '../actions';
import { connect } from 'react-redux';

class PasswordNew extends React.Component {
    state = {
        password: '',
        password_confirm: '',
        email: '',
        token: '',
        passwordError: ''
    }

    async componentDidMount() {

        console.log(this.props.match.params.token)
        let token = this.props.match.params.token
        this.setState({
            token
        })
        try {
            const response = await axios({
                method: 'get',
                url: '/auth/password-reset',
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    resetPasswordToken: token
                },
            })

            console.log(response);
            if (response.data.message === 'password reset link a-ok') {
                this.setState({
                    email: response.data.email,
                });
            }
        } catch (error) {
            console.log(error.response.data);

        }
    }

    handleChange = (event) => {

        this.setState({
            [event.target.id]: event.target.value,
        });
        console.log(this.state)
    };

    validate = () => {
        let isError = false;

        const errors = {
            passwordError: ""
        };

        if (this.state.password !== this.state.password_confirm) {
            isError = true
            errors.passwordError = "Passwords Do Not Match"
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    }

    handleSubmit = async (event) => {
        console.log(this.state)
        const err = this.validate();
        if (!err) {
            let response
            try {
                response = await axios({
                    method: 'put',
                    url: '/auth/password-reset',
                    data: this.state
                })
                console.log(response)
                if(response.status==200){
                    this.props.success("Password Changed Successfully")
                    this.props.history.push(`/signin`)
                }
                return
            }
            catch (err) {
                console.log(err)
                //this.handlePostResponse(err.response, element)
                return
            }
        }
        else {
            console.log("Passwords do not match")
        }
    }

    render() {
        let { classes } = this.props;

        return (
            <div style={{ width: '35%', margin: 'auto', marginTop: '10%' }}>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={classes.heading}>
                        New Password
                    </Typography>
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        onChange={this.handleChange}
                        className={classes.fullSpanInput}
                        margin="dense"
                        variant="filled"
                        value={this.state.password}
                    />
                    <TextField
                        id="password_confirm"
                        type="password"
                        label="Confirm Password"
                        onChange={this.handleChange}
                        className={classes.fullSpanInput}
                        margin="dense"
                        variant="filled"
                        value={this.state.password_confirm}
                        
                        helperText={<p className={classes.errorList}>{this.state.passwordError}</p>}
                    />
                    <Button onClick={this.handleSubmit} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}

PasswordNew = withStyles(formStyle)(PasswordNew);
export default connect(()=>{}, { ...alertActions })(PasswordNew)