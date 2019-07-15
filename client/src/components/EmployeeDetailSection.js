import React from 'react'
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalTrigger from './ModalTrigger'
import { getDate } from '../helpers/utils'
import { getDateFormValue } from '../helpers/utils'

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr auto 500px',
        gridTemplateAreas: '"header" "info" "chain"',
        rowGap: '20px',
    },
    infoContainer: {
        width: '100%',
        gridArea: 'info',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridAutoRows: '50px',
        gridAutoFlow: 'row',
    },
    infoAttribute: {
        // backgroundColor: theme.palette.secondary.dark,
        borderBottom: `3px solid ${theme.palette.secondary.dark}`,
        padding: theme.spacing.unit * 2,
    },
    infoValue: {
        // backgroundColor: theme.palette.secondary.light,
        borderBottom: `3px solid ${theme.palette.secondary.light}`,
        padding: theme.spacing.unit * 2,
    },
    headerTitle: {
        width: '70%',
    },
    division: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '80%',
    },
    divisionRoot: {

    },
})

const getFormElement = (row, values) => {
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

class EmployeeDetailSection extends React.Component {
    
    getInitialValues = () => {
        let {data} = this.props
        let initialValues = {}
        
        if(!Array.isArray(data)){
            return data
        }

        this.props.rows.forEach(row => {
            let value = data.filter(element => element.name === row.label )[0]
            initialValues[row.label] = value && value.ATTRIB_01
        });
        return initialValues
    }

    render() {
        let { data, rows, classes, headerTitle, detailType, match, link, search, expanded, defaultExpanded } = this.props
        console.log("MATCH: ", match)
        return (
            <ExpansionPanel expanded={expanded} defaultExpanded={defaultExpanded} >
                <ExpansionPanelSummary classes={{ content: classes.division }} expandIcon={expanded || <ExpandMoreIcon />}>
                    <Typography variant="h6" gutterBottom component="h2" className={classes.headerTitle}>
                        {headerTitle}
                    </Typography>
                    {link ? <Link to={{ pathname: `/portal/employee-manager`, search: search }} >Edit</Link>
                    : <ModalTrigger
                        title="Edit"
                        button
                    >
                        <Formik
                            initialValues={this.getInitialValues()}
                            validate={this.props.schema}
                            onSubmit={(values, formikBag) => this.props.handleSubmit(values, formikBag, detailType)}

                            render={formProps => {
                                return (
                                    <Form>
                                        {
                                            rows.map(row => getFormElement(row, formProps.values))
                                        }
                                        <button
                                            type="submit"
                                            disabled={formProps.isSubmitting}
                                            style={{ display: 'block', marginTop: '10px' }}
                                        >
                                            Save
                                       </button>
                                    </Form>
                                )
                            }
                            }
                        />
                    </ModalTrigger>
                    }
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.infoContainer}>
                        {rows.map(row => {
                            let value = Array.isArray(data) ? data.filter(item => {
                                return item.name === row.label
                            })[0] : data
                            console.log("VALUE RENDER: ", value)
                            console.log(row.id)
                            return (
                                <React.Fragment>
                                    <Typography variant="body2" component="h5" color='default' className={classes.infoAttribute}>{row.title}</Typography>
                                    <Typography variant="body2" component="h6" color='secondary' className={classes.infoValue}>{value ? row.type === 'date' && value[row.id] ? getDate(value[row.id]).toDateString() : value[row.id] : ""}</Typography>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default withRouter(withStyles(styles)(EmployeeDetailSection))