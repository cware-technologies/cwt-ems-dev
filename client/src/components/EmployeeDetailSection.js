import React from 'react'
import axios from 'axios';
import compose from 'recompose/compose'
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalTrigger from './ModalTrigger'
import { getCellValue, getDate, getDateFormValue } from '../helpers/utils'
import { getUserOrganization } from '../reducers/authReducer';

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
    state = {
        rows: [],
    }

    componentDidMount(){
        if(this.props.indeterminate)
            this.getRows()
        else
            this.setState(prevState => ({
                rows: this.props.rows,
            }))
    }

    getRows = async () => {
        let response
        let associations = {}
        let rows

        try{
            response = await axios({
                method: 'get',
                url: this.props.endpoint,
                params: {
                    bu_id: this.props.organization,
                }
            })

            console.log(response)
            rows = response.data.result.map(ele => ({ label: ele.val, title: ele.val, id: 'ATTRIB_01', type: 'text'}))
            response.data.result.forEach(ele => associations[ele.val] = ele.row_id )

            this.setState(prevState => ({
                rows,
                associations,
            }), () => console.log("STOOT: ",this.state))
        }
        catch(err){
            console.log("EXCEPTION!!!", err)
        }
    }
    
    getInitialValues = () => {
        let {data} = this.props
        let initialValues = {}
        
        if(!Array.isArray(data)){
            return data
        }

        this.state.rows.forEach(row => {
            let value = data.filter(element => element.name === row.label )[0]
            initialValues[row.label] = value && value.ATTRIB_01
        });
        return initialValues
    }

    render() {
        let { rows, associations } = this.state
        let { data, classes, headerTitle, detailType, link, search, expanded, defaultExpanded, indeterminate } = this.props
        // rows = indeterminate ? this.state.rows : this.props.rows
        console.log(this.props.headerTitle, '  ROWWWWWWSSSSSSSSSSSSSS', rows)
        return (
            <ExpansionPanel expanded={expanded} defaultExpanded={defaultExpanded} >
                <ExpansionPanelSummary classes={{ content: classes.division }} expandIcon={expanded || <ExpandMoreIcon />}>
                    <Typography variant="h6" gutterBottom component="h2" className={classes.headerTitle}>
                        {headerTitle}
                    </Typography>
                    {link ? 
                        <Link to={{ pathname: `/portal/employee-manager`, search: search }} style={{ textDecoration: 'none' }}>
                            <Button
                                component="button"
                                variant="outlined"
                                color='primary'
                            >Edit</Button>
                        </Link>
                    : 
                    <div>
                        <ModalTrigger
                            title="Edit"
                            button
                        >
                            <Formik
                                initialValues={this.getInitialValues()}
                                validate={this.props.schema}
                                onSubmit={(values, formikBag) => this.props.handleSubmit(values, formikBag, detailType, associations || null)}

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
                    </div>
                    }
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.infoContainer}>
                        {rows.map(row => {
                            console.log('DATA: ', data)
                            let value = Array.isArray(data) ? data.filter(item => {
                                return item.name === row.label
                            })[0] || {} : data
                            console.log(value)
                            value = getCellValue(value, row.id)
                            console.log("VALUE RENDER: ", value)
                            console.log(row.id)
                            return (
                                <React.Fragment>
                                    <Typography variant="body2" component="h5" color='default' className={classes.infoAttribute}>{row.title}</Typography>
                                    <Typography variant="body2" component="h6" color='secondary' className={classes.infoValue}>{value ? row.type === 'date' && value ? getDate(value).toDateString() : value : ""}</Typography>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

const mapStateToProps = (state) => ({
    organization: getUserOrganization(state),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {})
)(EmployeeDetailSection)