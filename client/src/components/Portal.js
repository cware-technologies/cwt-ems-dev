import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import { getAlert } from '../reducers/alertReducer';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoadingSpinner from './LoadingSpinner';
import AlertSnackbars from './AlertSnackbars'
import { authActions } from '../actions';
import { getLoggedIn } from '../reducers/authReducer';

const AppBar = lazy(() => import('./AppBar'));
const Drawer = lazy(() => import('./Drawer'));
const Dashboard = lazy(() => import('./Dashboard'));
const RegisterEmployeeForm = lazy(() => import('./RegisterEmployeeForm'));

const LeaveManager = lazy(() => import('./LeaveManager'));
const AdminLeaves = lazy(() => import('./AdminLeaves'));
const PaySlipTabs = lazy(() => import('./PaySlipTabs'));
const ITTicketTabs = lazy(() => import('./ITTicketTabs'));
const NewsAndUpdates = lazy(() => import('./NewsAndUpdates'));
const Profile = lazy(() => import('./Profile'));
const SkillsPanel = lazy(() => import('./SkillsPanel'));
const ProfileDetails = lazy(() => import('./ProfileDetails'));
const ProfessionalAttributesPanel = lazy(() => import('./ProfessionalAttributesPanel'));
const CertificationsPanel = lazy(() => import('./CertificationsPanel'));
const Attendance = lazy(() => import('./Attendance'));
const Notifications = lazy(() => import('./Notifications'));
const PasswordReset = lazy(() => import('./PasswordReset'));
const OrganizationStructure = lazy(() => import('./OrganizationStructure'));
const AccessRights = lazy(() => import('./AccessRights'))
const HRDocsUpload = lazy(() => import('./HRDocsUpload'))
const InductionChecklist = lazy(() => import('./InductionChecklist'));
const EmployeeInductionExit = lazy(() => import('./EmployeeInductionExit'));
const EntitlementsManager = lazy(() => import('./EntitlementsManager'));
const EmployeeAttendanceList = lazy(() => import('./EmployeeAttendanceList'));
const EmployeeDetailsSearch = lazy(() => import('./EmployeeDetailsSearch'));
const EmployeeManager = lazy(() => import('./EmployeeManager'));
const NewsManager = lazy(() => import('./NewsManager'));
const AssetManager = lazy(() => import('./AssetManager'));
const EligibilityManager = lazy(() => import('./EligibilityManager'));
const ContractsPortal = lazy(() => import('./ContractsPortal'));
const ContractsManager = lazy(() => import('./ContractsManager'));
const InductionExitManager = lazy(() => import('./InductionExitManager'));
const ITTickets = lazy(() => import('./ITTicketsManager'));
const ExpenseClaim = lazy(() => import('./ExpenseClaimManager'));
const HRDocs = lazy(() => import('./HRDocsManager'));
const ExpenseNatureManager = lazy(() => import('./ExpenseNatureManager'));
const ITTicketTypeManager = lazy(() => import('./ITTicketTypeManager'));
const HRDocsTypeManager = lazy(() => import('./HRDocsTypeManager'));

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
});

class Portal extends React.Component {
  state = {
    drawerOpen: true,
    alertOpen: false,
    alert: {
      type: null,
      message: '',
      changed: null,
    }
  };

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.alert.changed !== prevState.alert.changed){
      return {
        alertOpen: true,
        alert: nextProps.alert,
      }
    }
  }
  
  requireAuth = () => {
		console.log("AUTHHHHHHHHHHHHHHHHHHHHHHHH ", this.props.loggedIn)
		return this.props.loggedIn
	}

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleAlertOpen = (status) => {
    this.setState(prevProps => ({
      alertOpen: status,
    }))
  }

  render() {
    const { classes, match, alert } = this.props;
    const { alertOpen } = this.state

    console.log("APP RE RENDER: ", match);
    return (
      <div className={classes.root}>
        <AlertSnackbars
          open={alertOpen}
          setOpen={this.handleAlertOpen}
          type={alert.type && alert.type}
          message={alert.message && alert.message}
        />
        <Suspense fallback={<LoadingSpinner/>}>
          <AppBar
            handleDrawerOpen={this.handleDrawerOpen}
            drawerOpen={this.state.drawerOpen}
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner/>}>
          <Drawer
            handleDrawerClose={this.handleDrawerClose}
            isOpen={this.state.drawerOpen}
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner/>}>
          <Switch>
            <PrivateRoute path={`${match.path}dashboard`} component={Dashboard} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}register-user`} component={RegisterEmployeeForm} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}organization-structure`} component={OrganizationStructure} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}leave-manager`} component={LeaveManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}manage-leaves`} component={AdminLeaves} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}pay-slips`} component={PaySlipTabs} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}news-and-updates`} component={NewsAndUpdates} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}post-update`} component={NewsManager} accessFunction={this.requireAuth} />

            {/* My Profile */}
            <PrivateRoute path={`${match.path}my-profile`} component={Profile} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}my-details`} component={ProfileDetails} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}my-skills`} component={SkillsPanel} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}my-professional-attributes`} component={ProfessionalAttributesPanel} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}my-certifications`} component={CertificationsPanel} accessFunction={this.requireAuth} />


            <PrivateRoute path={`${match.path}attendance`} component={Attendance} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}notifications`} component={Notifications} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}password-reset`} component={PasswordReset} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}access-rights`} component={AccessRights} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}hr-documents`} component={HRDocsUpload} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}induction-list-admin`} component={InductionChecklist} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}employee-induction-exit`} component={EmployeeInductionExit} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}entitlements-manager`} component={EntitlementsManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}attendance-list`} component={EmployeeAttendanceList} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}employee-details`} component={EmployeeDetailsSearch} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}employee-manager`} component={EmployeeManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}asset-manager`} component={AssetManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}eligibility-manager`} component={EligibilityManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}my-contracts`} component={ContractsPortal} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}contracts-manager`} component={ContractsManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}induction-exit-manager`} component={InductionExitManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}it-tickets`} component={ITTickets} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}expense-claim`} component={ExpenseClaim} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}hr-docs`} component={HRDocs} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}expense-nature`} component={ExpenseNatureManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}it-ticket-type`} component={ITTicketTypeManager} accessFunction={this.requireAuth} />
            <PrivateRoute path={`${match.path}hr-docs-type`} component={HRDocsTypeManager} accessFunction={this.requireAuth} />
            <Redirect from='/' to='/portal/dashboard' />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

Portal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loggedIn: getLoggedIn(state),
    alert: getAlert(state),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {...authActions})
)(Portal);