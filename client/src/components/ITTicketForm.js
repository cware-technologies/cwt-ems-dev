import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { formStyle } from '../styles/form';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
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
                        Get IT Ticket
                    </Typography>
                    <TextField
                        id="outlined-dense"
                        label="Ticket No"
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
                        label="Problem"
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
                        label="Start Date"
                        type="date"
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
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="End Date"
                        type="date"
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
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-dense"
                        label="Description"
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
                    <FormControl className={classNames(classes.formControl, classes.inputRoot, classes.textField)}>
                        <InputLabel htmlFor="apply-to" className={classes.inputLabel} shrink={true} style={{zIndex:'1',marginLeft:'5px',}}><PhotoCamera />Pictures</InputLabel>
                        <FilledInput type="file" accept="image/*" id="icon-button-file" className={classes.input} />
                    </FormControl>
                    <Button variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Get
                    </Button>
                </div>
            </Container>
        );
    }

}

export default withStyles(formStyle)(PaySlipForm);