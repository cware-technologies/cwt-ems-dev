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


class PasswordReset extends React.Component {
    state = {
        email: ''
    }

    handleChange = (event)=>{
        let value = event.target.value
        this.setState({
            email: value
        })

        console.log(this.state.email)
    }

    submitForm = async () => {
        let response
        
        try {
            response = await axios({
                method: 'post',
                url: '/auth/password-reset',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    email: this.state.email,

                },
            })

            if (response.data.status === 200) {

                console.log("Record Deleted Successfully!")


            }
            else {
                console.log("Could Not Delete The Record")
                console.log(response)
            }
        }
        catch (err) {
            console.log("Could Not Delete The Record")
        }

        console.log(this.state.email)

    }

    render() {
        let { classes } = this.props;

        return (
            <div style={{ width: '35%', margin: 'auto', marginTop: '10%' }}>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={classes.heading}>
                        Reset Password
                    </Typography>
                    <TextField
                        id="email"
                        value= {this.state.email}
                        label="Email"
                        onChange={this.handleChange}
                        className={classes.fullSpanInput}
                        margin="dense"
                        variant="filled"
                    />
                    <Button onClick={this.submitForm} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(formStyle)(PasswordReset);