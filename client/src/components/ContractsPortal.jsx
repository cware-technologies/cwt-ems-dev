import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { withStyles, useTheme } from '@material-ui/core/styles';
import compose from 'recompose/compose'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Container from './MainContainer'
import { alertActions } from '../actions';
import { getUser } from '../reducers/authReducer';
import EmployeeBadge from './EmployeeBadge';
import ContractContent from './ContractContent';

const portalStyles = theme => ({
    root: {
        width: '100%',
        backgroundColor: 'lightgray',
    },
    actionBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    modal: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },

    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    listItem: {
        borderLeft: `solid 3px ${theme.palette.primary.light}`,
    },
    confCheckboxLabel: {
        marginTop: 20,
    }
})

export class ContractsPortal extends Component {
    state = {
        user: {},
        contracts: [],
        selected: null,
        contractDialogOpen: false,
        acceptDialogOpen: false,
        rejectDialogOpen: false,
        confirmationCheckbox: false,
    }
    // theme = useTheme();

    componentDidMount() {
        axios.all([this.getEmployee(), this.getContracts()])
            .then(axios.spread((user, contracts) => {
                console.log(user, contracts)
                if (user.data.status === 200 && contracts.data.status === 200) {
                    this.setState(prevState => ({
                        user: user.data.result,
                        contracts: contracts.data.result,
                    }))
                }
                else if (user.data.status !== 200 || contracts.data.status !== 200) {
                    this.props.error({ message: "Couldn't fetch the employee record." })
                }
                else {
                    this.props.error({ message: "Couldn't fetch the employee record." })
                }
            }))
            .catch(err => {
                this.props.error({ message: "Couldn't fetch the employee record." })
            })
    }

    // fullScreen = useMediaQuery(this.theme.breakpoints.down('sm'));

    getContracts = async () => {
        return axios({
            method: 'get',
            url: '/private/employee/contracts',
            params: {
                employee: this.props.userId,
            }
        })
    }

    getEmployee = async () => {
        return axios({
            method: 'get',
            url: '/private/employee',
            params: {
                employee: this.props.userId,
            },
        })
    }

    handleAccept = () => {
        this.setState({
            acceptDialogOpen: true,
        })
    }

    acceptContract = async () => {
        let response

        try {
            response = await axios({
                method: 'get',
                url: '/private/employee/contracts/accept',
                params: {
                    contract_id: this.state.selected.row_id
                },
            })
            console.log(response)
            if(response.status === 200){
                this.props.success("Your acceptance has been sent to HR for further processing.")
                this.recomputeContracts()
            }
            else{
                this.props.error({message: "Your action was unsuccessful, Please try again!"})
            }
        }
        catch (err) {
            this.props.error({message: "Your action was unsuccessful, Please try again!"})
        }
    }

    handleReject = () => {
        this.setState({
            rejectDialogOpen: true,
        })
    }

    rejectContract = async () => {
        let response

        try {
            response = await axios({
                method: 'get',
                url: '/private/employee/contracts/reject',
                params: {
                    contract_id: this.state.selected.row_id
                },
            })
            console.log(response)

            if(response.status === 200){
                this.props.success("Your rejection has been sent to HR for further processing.")
                this.recomputeContracts(response.data.result.row_id)
            }
            else{
                this.props.error({message: "Your action was unsuccessful, Please try again!"})
            }
        }
        catch (err) {
            this.props.error({message: "Your action was unsuccessful, Please try again!"})
        }
    }

    recomputeContracts = (id) => {
        console.log("Recompute: ", id)
        let newData = this.state.contracts.filter(contract => contract.row_id !== this.state.selected.row_id)
        this.setState(prevState => ({
            contracts: newData,
        }))
        this.handleModalClose()
    }

    handleModalOpen = (e, contract) => {
        this.setState({
            contractDialogOpen: true,
            selected: contract,
        });
    };

    handleModalClose = () => {
        this.setState({
            contractDialogOpen: false,
            acceptDialogOpen: false,
            rejectDialogOpen: false,
            selected: null,
        });
    };

    render() {
        let { user, contracts, contractDialogOpen, selected } = this.state
        let { classes } = this.props

        return (
            <Container>
                <EmployeeBadge
                    data={user}
                />
                <List className={classes.root}>
                    {contracts.length <= 0 ? <ListItem dense ><ListItemText primary="No Contracts" /></ListItem> :
                        contracts.map(row => (
                            <React.Fragment>
                                <ListItem key={row.row_id} role={undefined} className={classes.listItem} dense >
                                    {/* <Checkbox
                                        checked={this.state.checked.filter(item => item.id === row.row_id).length > 0}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={this.handleToggle(row.row_id, row.path)}
                                    /> */}
                                    <ListItemText primary={row.ATTRIB_01} />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="View" onClick={(e) => this.handleModalOpen(e, row)}>
                                            <ViewIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </React.Fragment>
                        ))}

                        <EnhancedContractModal
                            title={selected && selected.ATTRIB_01}
                            modalOpen={contractDialogOpen}
                            handleModalClose={this.handleModalClose}
                            aria-labelledby="View Contract"
                            aria-describedby="Contract"
                            actions={[
                                { label: 'Accept', eventHandler: this.handleAccept, enabled: true },
                                { label: 'Reject', eventHandler: this.handleReject, enabled: true },
                            ]}
                        >
                            {
                                selected &&
                                    <ContractContent

                                    />
                            }
                        </EnhancedContractModal>

                    <EnhancedContractModal
                        title="Contract Renewal Confirmation"
                        modalOpen={this.state.acceptDialogOpen}
                        handleModalClose={this.handleModalClose}
                        aria-labelledby="Accept Confirmation"
                        aria-describedby="Dialogue to confirm the contract acception"
                        actions={[
                            { label: 'Accept', eventHandler: this.acceptContract, enabled: this.state.confirmationCheckbox },
                            { label: 'Cancel', eventHandler: this.handleModalClose, enabled: true },
                        ]}
                    >
                        You have chosen to renew your contract till {selected && selected.ATTRIB_19}. Do you want to proceed?
                        <FormControlLabel
                            value="accept"
                            control={
                                <Checkbox
                                    checked={this.state.confirmationCheckbox}
                                    color='primary'
                                    onChange={(e) => this.setState({
                                        confirmationCheckbox: e.target.checked,
                                    })}
                                />
                            }
                            label="I agree to electronically sign this document as my final approval of acceptance of the contract agreement."
                            labelPlacement="end"
                            className={classes.confCheckboxLabel}
                        />
                    </EnhancedContractModal>
                    <EnhancedContractModal
                        title="Contract Rejection Confirmation"
                        modalOpen={this.state.rejectDialogOpen}
                        handleModalClose={this.handleModalClose}
                        aria-labelledby="Reject Confirmation"
                        aria-describedby="Dialogue to confirm the contract rejection"
                        actions={[
                            { label: 'Yes', eventHandler: this.rejectContract, enabled: true },
                            { label: 'No', eventHandler: this.handleModalClose, enabled: true },
                        ]}
                    >
                        You have chosen to end your contract. Do you want to proceed further?
                    </EnhancedContractModal>
                </List>
            </Container>
        )
    }
}

const dialogStyles = theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
    dialogTitle: {

    },
})

const ContractModal = ({ title, children, actions, contract, modalOpen, handleModalClose, handleAccept, handleReject, classes }) => {

    const catchEvent = (e, eventHandler) => {

    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="contract"
        >
            <DialogTitle id="contract-title" className={classes.dialogTitle}>
                {title}
                <IconButton aria-label="Close" className={classes.closeButton} onClick={handleModalClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    actions.map(action =>
                        <Button onClick={action.eventHandler} color="primary" disabled={!action.enabled}>
                            {action.label}
                        </Button>
                    )
                }
            </DialogActions>
        </Dialog>
    )
}

const EnhancedContractModal = withStyles(dialogStyles)(ContractModal);

const mapStateToProps = (state) => ({
    userId: getUser(state),
})

const mapDispatchToProps = {
    ...alertActions,
}

export default compose(
    withStyles(portalStyles),
    connect(mapStateToProps, mapDispatchToProps),
)(ContractsPortal)
