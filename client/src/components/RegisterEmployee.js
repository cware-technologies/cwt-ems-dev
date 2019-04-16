import React from "react";
import { Typography } from "@material-ui/core";
import Container from './MainContainer';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'

import axios from 'axios'

const styles1 = theme => ({
    root: {
        width: '98%',
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

class RegisterEmployee extends React.Component {
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
                <EnhancedTable
                    title='user'
                    endpoint='/admin/org-struct/organization'
                    headers={[
                        {title:'Name', value:'name',},
                        {title:'Parent Organization', value:'parent', value2:'name'},
                    ]}
                    selectEntity={this.selectEntity}
                />
            )
          case 1:
            return (
                <EnhancedTable 
                    title='division'
                    endpoint='/admin/org-struct/division'
                    headers={[
                        {title:'Name', value:'name',},
                        {title:'Parent Division', value:'parent', value2:'name'},
                        {title:'Organization', value:'organization', value2: 'name'},
                    ]}
                    organization={this.state.organization}
                    selectEntity={this.selectEntity}
                />
            )
          case 2:
            return (
                <EnhancedTable 
                    title='position'
                    endpoint='/admin/org-struct/position'
                    headers={[
                        {title:'Name', value:'name',},
                        {title:'Parent Position', value:'parent', value2:'name'},
                        {title:'Organization', value:'organization', value2: 'name'},
                        {title:'Division', value:'division', value2: 'name'},
                    ]}
                    organization={this.state.organization}
                    division={this.state.division}
                    selectEntity={this.selectEntity}
                />
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

    render() {
        let {classes} = this.props
        let {activeStep} = this.state
        let {getStepContent, getSteps, getLabel} = this
        let steps = getSteps()
        let next = this.getNextStep()

        return (
            <Container>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{`${label}   `}<span style={{color: 'lightgray'}}>{getLabel(index)}</span></StepLabel>
                                <StepContent>
                                    <Typography>{getStepContent(index)}</Typography>
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
                </div>
                
            </Container>
        )
    }
}

export default withStyles(styles1)(RegisterEmployee);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: 'capitalize',
    },
    addOrgFormRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        width: '100%',
        display: 'flex',
        cursor: 'pointer',
    },
    tableRow: {
        width: '100%',
    },
    selectedRow: {
        border: `2px solid ${theme.palette.secondary.light}`
    },
});

class SimpleTable extends React.Component {
    state = {
        selected: 0,
        entity: {
            name: '',
            parent: null,
            organization: null,
            division: null,
        },
        dropdown1: {
            value: null,
            data: [],
        },
        dropdown2: {
            value: null,
            data: [],
        },
        dropdown3: {
            value: null,
            data: [],
        },
        data: [],
        isFetching: false,
        success: null,
    }

    async componentDidMount(){
        this.getRequest()
    }

    getRequest = () => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: `${this.props.endpoint}`,
                params: {
                    bu_id: this.props.organization && this.props.organization,
                    div_id: this.props.division && this.props.division
                },
            })

            this.handleGetResponse(response)
        }
        catch (err) {
            this.handleGetResponse(err.response)
        }
    }

    handleGetResponse = (res) => {
        let error = res.data.message;

        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetching: false,
                success: false,
            }))
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                dropdown1: {
                    ...prevState.dropdown1,
                    data: res.data.result,
                },
                isFetching: false,
                success: true,
            }))
        }
    }

    handleChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            entity: {
                ...prevState.entity,
                [target]: value,
            }
        }))
    }

    handleSubmit = async() => {
        this.setState({
            entity: {
                ...this.state.entity,
                organization: this.props.organization,
                division: this.props.division,
            }
        }, this.sendPostRequest)

    }

    sendPostRequest = async () => {
        let response;

        try{
            response = await axios({
                method: 'post',
                url: `${this.props.endpoint}`,
                data: this.state.entity,
            })

            this.handlePostResponse(response)
            return
        }
        catch(err){
            this.handlePostResponse(err.response)
            return
        }
    }

    handlePostResponse = (res) => {
        if (res.data.status >= 400) {
            this.setState(prevState => ({
                
            }))
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                data: [
                    ...prevState.data,
                    res.data.result,
                ]
            }))
        }
    }

    isSelected = (id) => {
        return this.state.selected === id
    }

    selectOrganization = (event, id, name) => {
        this.setState(prevState => ({
            selected: id
        }), () => {
            this.props.selectEntity(this.props.title, this.state.selected, name)
        })
    }

    // getParents = () => {
    //     let foundOrg = this.props.headers.find(ele => ele.value === 'organization')
    //     let foundDiv = this.props.headers.find(ele => ele.value === 'division')

    //     if(foundOrg){
    //         this.state.data.map(row => {
    //             row.organization = row.C_BU.name
    //         })
    //     }

    //     if(foundDiv){
    //         this.state.data.map(row => {
    //             row.division = row.C_DIV.name
    //         })
    //     }

    //     // this.state.data.map(row => {
    //     //     row.parent = row.parent ? row.parent.name : 0
    //     // })
    // }

    render(){
        let {classes, title, headers} = this.props
        let {entity, data} = this.state

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {headers.map(header =>
                                <TableCell>{header.title}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => {
                            const isSelected = this.isSelected(row.row_id);
                            // this.getParents()             
                            return (
                                <TableRow
                                    tabIndex={-1}
                                    aria-checked={isSelected}
                                    selected={isSelected}
                                    key={row.row_id}
                                    hover
                                    classes= {{
                                        root: classes.tableRow,
                                        selected: classes.selectedRow,
                                    }}
                                    onClick={event => this.selectOrganization(event, row.row_id, row.name)}
                                >
                                    {headers.map(header =>
                                        <TableCell align="left">{header.value2 ? row[header.value] ? row[header.value][header.value2] : '' : row[header.value]}</TableCell>
                                    )}
                                </TableRow>
                        )})}
                    </TableBody>
                </Table>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Add {title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.addOrgFormRoot}>
                        <TextField
                            // error={errors.email}
                            // helperText={errors.email && <ul className={classes.errorList}> {errors.email.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                            id="name"
                            label="Name"
                            value={entity.name}
                            onChange={this.handleChange}
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
                            label={`Parent ${title}`}
                            className={classNames(classes.textField, classes.dense)}
                            value={entity.parent}
                            onChange={this.handleChange}
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        )
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

let EnhancedTable = withStyles(styles)(SimpleTable);