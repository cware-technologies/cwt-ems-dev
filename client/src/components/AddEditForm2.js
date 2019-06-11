import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { getDateFormValue } from '../helpers/utils'
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';

const getNumberFieldValue = (value, inputProps) => {
    if(parseInt(value) > parseInt(inputProps.max)){
        return inputProps.max
    }
    else if(parseInt(value) < parseInt(inputProps.min)){
        return inputProps.min
    }
    else{
        return value
    }
}

class AddEditForm extends React.Component {
    state = {

    }
    
    getFormElement = (row, values) => {
        if (row.type === 'text') {
            return (
                <React.Fragment>
                    <label style={{display: 'block', marginTop: '10px'}} htmlFor={row.label}>
                        { row.title }
                    </label>
                    <Field
                        type="text"
                        name={row.label}
                        placeholder={row.title}
                        value={values[row.label]}
                        disabled={row.disabled}
                    />
                    <ErrorMessage name={row.label} />
                </React.Fragment>
            )
        }
        else if (row.type === 'select') {
            return (
                <React.Fragment>
                    <label style={{display: 'block', marginTop: '10px'}} htmlFor={row.label}>
                        { row.title }
                    </label>
                    <Field
                        name={row.label}
                        component="select"
                        placeholder={row.title}
                        value={values[row.label]}
                        disabled={row.disabled}
                    >
                        {
                            row.selectOptions.map(option =>
                                <option value={option.value}>{option.label}</option>
                            )
                        }   
                    </Field>
                    <ErrorMessage name={row.label} />
                </React.Fragment>
            )
        }
        else if (row.type === 'textarea') {
            return (
                <React.Fragment>
                    <label style={{display: 'block', marginTop: '10px'}} htmlFor={row.label}>
                        { row.title }
                    </label>
                    <Field
                        name={row.label}
                        component="textarea"
                        rows="2"
                        placeholder={row.title}
                        value={values[row.label]}
                        disabled={row.disabled}
                    />
                    <ErrorMessage name={row.label} />
                </React.Fragment>
            )
        }
        else if (row.type === 'date') {
            return (
                <React.Fragment>
                    <label style={{display: 'block', marginTop: '10px'}} htmlFor={row.label}>
                        { row.title }
                    </label>
                    <Field
                        name={row.label}
                        type='date'
                        placeholder={row.title}
                        value={getDateFormValue(values[row.label])}
                        disabled={row.disabled}
                    />
                    <ErrorMessage name={row.label} />
                </React.Fragment>
            )
        }
        return
    }

    render(){
        let { fields, object, classes, editMode, headerTitle, handleSubmit } = this.props

        let Title = editMode ? `Edit ${headerTitle}` : `Add ${headerTitle}`

        getDateFormValue(object['ATTRIB_18'])

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