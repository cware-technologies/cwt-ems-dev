import React from 'react'
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalTrigger from './ModalTrigger'

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
                    { row.label }
                </label>
                <Field
                    type="text"
                    name={row.label}
                    placeholder={row.label}
                    value={values[row.label]}
                />
                <ErrorMessage name={row.label} />
            </React.Fragment>
        )
    }
    else if (row.type === 'select') {
        return (
            <React.Fragment>
                <label style={{display: 'block', marginTop: '10px'}} htmlFor={row.label}>
                    { row.label }
                </label>
                <Field
                    name={row.label}
                    component="select"
                    placeholder={row.label}>
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
    return
}

class EmployeeDetailSection extends React.Component {
    
    getInitialValues = () => {
        let {data} = this.props
        let initialValues = {}
    
        this.props.rows.forEach(row => {
            let value = data.filter(element => element.name === row.label )[0]
            initialValues[row.label] = value && value.ATTRIB_01
        });
        console.log("INITIAL: ", initialValues)
        return initialValues
    }

    render() {
        let { data, rows, classes, headerTitle, detailType } = this.props
        console.log('DATA: ', data)
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary classes={{ content: classes.division }} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" gutterBottom component="h2" className={classes.headerTitle}>
                        {headerTitle}
                    </Typography>
                    <ModalTrigger
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
                                            Submit Form
                                       </button>
                                    </Form>
                                )
                            }
                            }
                        />
                    </ModalTrigger>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.infoContainer}>
                        {rows.map(row => {
                            let value = data.filter(item => {
                                console.log(item.name, " ;:; ", row.label)
                                return item.name === row.label
                            })[0]
                            console.log("VALUE: ", value)
                            return (
                                <React.Fragment>
                                    <Typography variant="body2" component="h5" color='default' className={classes.infoAttribute}>{row.label}</Typography>
                                    <Typography variant="body2" component="h6" color='secondary' className={classes.infoValue}>{value && value.ATTRIB_01}</Typography>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(EmployeeDetailSection)