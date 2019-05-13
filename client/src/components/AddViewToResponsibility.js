import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const data = []

class AddViewToResponsibility extends React.Component {
    render(){
        let { classes } = this.props

        return(
            <div className={classes.formSection}>
                <Typography variant="h6" gutterBottom component="h6" className={ classes.heading }>
                    Add A View To Responsibility
                </Typography>
                <TextField
                    // error={errors.email}
                    // helperText={errors.email && <ul className={classes.errorList}> {errors.email.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                    id="name"
                    label="Name"
                    // value={entity.name}
                    // onChange={this.handleChange}
                    // onBlur={this.validate}
                    classes={{
                        root: classes.inputRoot,
                    }}
                    // className={classNames(classes.textField, classes.dense)}
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
                    id="parent"
                    select
                    label={`Parent`}
                    className={classNames(classes.textField, classes.dense)}
                    // value={entity.parent}
                    // onChange={this.handleChange}
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
                    {data.map(option => (
                        <option key={option.row_id} value={option.row_id}>
                            {option.name}
                        </option>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    className={classNames(classes.button, classes.textField)}
                    onClick={this.handleSubmit}
                >
                    Add
                </Button>
            </div>
        )
    }
}

export default withStyles(formStyle)(AddViewToResponsibility)