import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

class AddEditForm extends React.Component {
    state = {

    }
    
    getFormElement = (field, object, selectOptions) => {
        let { classes, handleChange } = this.props

        switch (field.type) {
            case 'text':
            return (
                <TextField
                    // error={errors.email}
                    // helperText={errors.email && <ul className={classes.errorList}> {errors.email.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                    id={field.id}
                    label={field.label}
                    value={object[field.id]}
                    disabled={field.readOnly}
                    defaultValue={field.defaultValue}
                    onChange={(e) => handleChange(e, this.props.headerTitle)}
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
            )
            case 'select':
            return (
                <TextField
                    id={field.id}
                    select
                    label={field.label}
                    className={classNames(classes.textField, classes.dense)}
                    value={field.defaultValue ? field.defaultValue : object[field.id]}
                    disabled={field.readOnly}
                    defaultValue={field.defaultValue}
                    onChange={(e) => handleChange(e, this.props.headerTitle)}
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
                    {field.selectOptions && field.selectOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </TextField>
            )
            default:
                return 'Unknown step';
        }
    }

    render(){
        let { fields, object, classes, editMode, headerTitle, handleSubmit } = this.props

        let Title = editMode ? `Edit ${headerTitle}` : `Add ${headerTitle}`
        return (
            <React.Fragment>
                <Typography variant='title' color='textPrimary'>{Title}</Typography>
                <div className={classes.formSection}>
                {
                    fields.map(field => 
                        this.getFormElement(field, object)
                    ) 
                }
                <Button onClick={(e) => handleSubmit(e, headerTitle)} variant='contained' color='primary'>{editMode ? 'Update' : "Add"}</Button>
                
                </div>
            </React.Fragment>
        )
    }
}

    export default withStyles(formStyle)(AddEditForm)