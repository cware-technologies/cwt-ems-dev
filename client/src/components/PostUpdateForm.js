import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { formStyle } from '../styles/form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from './MainContainer';
import TextEditor from './TextEditor';

const updateTypes = [
    {
        value:"official",
        label:"Official",
    },
    {
        value:"notification",
        label:"Notification",
    },
    {
        value:"holiday",
        label:"Holiday",
    },
]

class PostUpdateForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render(){
    const { classes } = this.props;
    
        return (
            <Container>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Reset Password
                    </Typography>
                    <TextField
                        id="filled-select-leave-native"
                        select
                        label="Type of Update"
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
                        {updateTypes.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextEditor />
                    <Button variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                            Post
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(formStyle)(PostUpdateForm);