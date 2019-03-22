import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { formStyle } from '../styles/form';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from './MainContainer'

class PaySlipForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const {classes} = this.props;

        return (
            <Container>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                        Get Pay Slip
                    </Typography>
                    <TextField
                        id="outlined-dense"
                        label="CNIC"
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
                        label="Month"
                        type="date"
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
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Note (If Any)"
                        multiline
                        rows="5"
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
                    <Button variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Get
                    </Button>
                </div>
            </Container>
        );
    }

}

export default withStyles(formStyle)(PaySlipForm);