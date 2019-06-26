import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles/form'
import validate from 'validate.js';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { getDateFormValue } from '../helpers/utils'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

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
        response: {},
        errors: {},
    }

    handleSubmit = async (e, component) => {
        if(!this.props.editMode){
            // let keys = Object.keys
        }

        if(await this.allValid()){
            this.props.handleSubmit(e, component)
        }
    }

    validate = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        let val_errors;

        val_errors = validate.single(value, this.props.schema[target]);
        
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [target]: val_errors,
            },
        }));
    }

    validateAll = async () => {
        return new Promise(async(resolve, reject) => {
        
            let val_errors = await validate(this.props.object, this.props.schema)

            let errors = val_errors ? Object.filter(val_errors, property => property !== undefined) : {}
            this.setState(prevState => ({
                errors
            }), resolve());
        })
    }

    allValid = async() => {
        // let localConstraints

        // if(this.props.editMode)
        //     localConstraints = (({login, fst_name, last_name, emp_num, bu_id, div_id}) => ({login, fst_name, last_name, emp_num, bu_id, div_id}))(constraints)
        // else
        //     localConstraints = constraints
        
        await this.validateAll(this.props.object, this.props.schema)

        if(Object.keys(this.state.errors.constructor === Object && this.state.errors).length === 0 ){
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
    
    getFormElement = (field, object, selectOptions) => {
        let { classes, handleChange } = this.props
        let { errors } = this.state

        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        id={field.id}
                        label={field.label}
                        value={object[field.id]}
                        disabled={field.readOnly}
                        defaultValue={field.defaultValue}
                        error={errors[field.id]}
                        helperText={errors[field.id] && <ul className={classes.errorList}> {errors[field.id].map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onBlur={this.validate}
                        onChange={(e) => handleChange(e, this.props.headerTitle)}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        classes={{
                            root: classes.inputRoot,
                        }}
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
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        value={field.defaultValue ? field.defaultValue : object[field.id]}
                        disabled={field.readOnly}
                        defaultValue={field.defaultValue}
                        onChange={(e) => handleChange(e, this.props.headerTitle)}
                        error={errors[field.id]}
                        helperText={errors[field.id] && <ul className={classes.errorList}> {errors[field.id].map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onBlur={this.validate}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
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
            case 'date':
                return(
                    <TextField
                        id={field.id}
                        type='date'
                        label={field.label}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        value={this.props.editMode ? getDateFormValue(object[field.id]) : object[field.id]}
                        disabled={field.readOnly}
                        defaultValue={field.defaultValue}
                        onChange={(e) => handleChange(e, this.props.headerTitle)}
                        error={errors[field.id]}
                        helperText={errors[field.id] && <ul className={classes.errorList}> {errors[field.id].map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                        onBlur={this.validate}
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
                    />
                )
            case 'number':
                    return(
                        <TextField
                            id={field.id}
                            type='number'
                            label={field.label}
                            className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                            value={getNumberFieldValue(object[field.id], field.inputProps)}
                            disabled={field.readOnly}
                            defaultValue={field.defaultValue}
                            onChange={(e) => handleChange(e, this.props.headerTitle)}
                            error={errors[field.id]}
                            helperText={errors[field.id] && <ul className={classes.errorList}> {errors[field.id].map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                            onBlur={this.validate}    
                            margin="dense"
                            variant="filled"
                            classes={{
                                root: classes.inputRoot,
                            }}
                            InputProps={{
                                className: classes.input,
                                inputProps: field.inputProps
                            }}
                            InputLabelProps={{
                                className: classes.inputLabel,
                                shrink: true,
                            }}
                        />
                    )
            default:
                return 'Unknown step';
        }
    }

    render(){
        let { fields, object, classes, editMode, headerTitle, handleSubmit } = this.props
        let { response, errors } = this.state

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
                    <FormHelperText>{response.status && <ul className={response.status<300?classes.successList:classes.errorList}><li className={classes.errorListItem}>{response.message}</li></ul>}</FormHelperText>
                    <Button 
                        className={classes.fullSpanInput}
                        style={{width: 100, position: 'absolute', right: '4%', bottom: '4%'}}
                        onClick={(e) => this.handleSubmit(e, headerTitle)} 
                        variant='contained'
                        fullWidth={false}
                        color='primary'>{editMode ? 'Update' : "Add"}
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}

AddEditForm.defaultProps = {
   schema: {},
   editMode: false,
}

export default withStyles(formStyle)(AddEditForm)