import React, { Suspense, lazy } from "react";
import axios from 'axios'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'

import Container from './MainContainer';
import LoadingSpinner from './LoadingSpinner';

const Table = lazy(() => import('./FunctionalTable'))


const styles1 = theme => ({
    root: {
        width: '100%',
        padding: 0,
        backgroundColor: 'transparent',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
})

class RegisterOrganization extends React.Component {
    state = {
        activeStep: 0,
        organization: null,
        division: null,
        position: null,
        organizationLabel: '',
        divisionLabel: '',
        positionLabel: '',
    }

    associations = {
        0: 'organization',
        1: 'division',
        2: 'position',
    }

    selectEntity = (entity, value, label) => {
        let labelField = `${entity}Label`
        
        this.setState(prevState => ({
            [entity]: value,
            [labelField]: label,
        }))
    }

    getSteps = () => {
        return ['Organizations', 'Divisions', 'Positions'];
    }

    getNextStep = () => {
        return !this.state[this.associations[this.state.activeStep]]
    }
      
    getStepContent = (step) => {
        switch (step) {
          case 0:
            return (
                <Suspense fallback={<LoadingSpinner/>}>
                    <Table
                        title='organization'
                        endpoint='/admin/org-struct/organization'
                        headers={[
                            { id:'name', type: 'text', label: 'Name', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:['parent', 'name'], type: 'text', label:'Parent', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:'desc', type: 'text', label: 'Description', numeric: false, disablePadding: true, lengthRatio: 'Detail', },
                        ]}
                        fields={[
                            { id: 'name', type:'text', label: 'Name' },
                            { id: 'desc', type:'text', label: 'Description' },
                            { id: 'par_row_id', type:'select', label: 'Parent', indeterminate: true, requestParams: {endPoint: '/admin/org-struct/organization', selectMapping: ['name', 'row_id', 'desc'], } },
                        ]}
                        const schema = {{}}
                        selectEntity={this.selectEntity}
                        clearSelection={this.clearSelection}
                    />
                </Suspense>
            )
          case 1:
            return (
                <Suspense fallback={<LoadingSpinner/>}>
                    <Table 
                        title='division'
                        endpoint='/admin/org-struct/division'
                        headers={[
                            { id:'name', type: 'text', label: 'Name', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:['parent', 'name'], type: 'text', label:'Parent', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:['organization', 'name'], type: 'text', label:'Organization', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:'desc', type: 'text', label: 'Description', numeric: false, disablePadding: true, lengthRatio: 'Detail', },
                        ]}
                        fields={[
                            { id: 'name', type:'text', label: 'Name' },
                            { id: 'desc', type:'text', label: 'Description' },
                            {
                                id: 'par_row_id',
                                type:'select',
                                label: 'Parent',
                                indeterminate: true,
                                requestParams: {
                                    endPoint: '/admin/org-struct/division',
                                    selectMapping: ['name', 'row_id', 'desc'],
                                    params: {
                                        bu_id: this.state.organization
                                    }
                                }
                            },
                        ]}
                        const schema = {{}}
                        organization={this.state.organization}
                        selectEntity={this.selectEntity}
                        clearSelection={this.clearSelection}
                    />
                </Suspense>
            )
          case 2:
            return (
                <Suspense fallback={<LoadingSpinner/>}>
                    <Table 
                        title='position'
                        endpoint='/admin/org-struct/position'
                        headers={[
                            { id:'name', type: 'text', label: 'Name', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:['parent', 'name'], type: 'text', label:'Parent', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:['organization', 'name'], type: 'text', label:'Organization', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:['division', 'name'], type: 'text', label:'Division', numeric: false, disablePadding: true, lengthRatio: 'Title', },
                            { id:'desc', type: 'text', label: 'Description', numeric: false, disablePadding: true, lengthRatio: 'Detail', },
                        ]}
                        fields={[
                            { id: 'name', type:'text', label: 'Name' },
                            { id: 'desc', type:'text', label: 'Description' },
                            {
                                id: 'par_row_id',
                                type:'select',
                                label: 'Parent',
                                indeterminate: true,
                                requestParams: {
                                    endPoint: '/admin/org-struct/position',
                                    selectMapping: ['name', 'row_id', 'desc'],
                                    params: {
                                        bu_id: this.state.organization,
                                        div_id: this.state.division,
                                    },
                                },
                            },
                        ]}
                        const schema = {{}}
                        organization={this.state.organization}
                        division={this.state.division}
                        selectEntity={this.selectEntity}
                        clearSelection={this.clearSelection}
                    />
                </Suspense>
            )
          default:
            return 'Unknown step';
        }
      }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    setBackState = () => {
        let label = `${this.associations[this.state.activeStep]}Label`

        this.setState(prevState => ({
            [this.associations[this.state.activeStep]]: null,
            [label]: '',
        }))
    }

    handleBack = () => {
        this.setBackState()
        this.setState(state => ({
            activeStep: state.activeStep - 1,
            
        }), this.setBackState);
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    getLabel = (index) => {

        let step = this.associations[index]
        let name = `${step}Label`
        return this.state[name]
    }

    clearSelection = (entity, rest) => {
        let newValue = rest
        let labelField = `${entity}Label`

        if( rest.length <= 0 )
            newValue = null

        let newState = {
            [entity]: newValue,
            [labelField]: '',
        }

        this.setState(prevState => newState)
    }

    render() {
        let {classes} = this.props
        let {activeStep} = this.state
        let {getStepContent, getSteps, getLabel} = this
        let steps = getSteps()
        let next = this.getNextStep()

        return (
            <Container>
                <Stepper activeStep={activeStep} orientation="vertical" classes={{root: classes.root}}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{`${label}   `}<span style={{color: 'lightgray'}}>{getLabel(index)}</span></StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            disabled={next}
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        {/* <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button> */}
                    </Paper>
                )}
            </Container>
        )
    }
}

export default withStyles(styles1)(RegisterOrganization);