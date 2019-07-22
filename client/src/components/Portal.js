import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import { getAlert } from '../reducers/alertReducer';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner';
import LeaveManager from './LeaveManager';
import AlertSnackbars from './AlertSnackbars'

const AppBar = lazy(() => import('./AppBar'));
const Drawer = lazy(() => import('./Drawer'));
const Dashboard = lazy(() => import('./Dashboard'));
const RegisterEmployeeForm = lazy(() => import('./RegisterEmployeeForm'));
const LeaveTabs = lazy(() => import('./LeaveTabs'));
const AdminLeaves = lazy(() => import('./AdminLeaves'));
const LeaveForm = lazy(() => import('./LeaveForm'));
const PaySlipTabs = lazy(() => import('./PaySlipTabs'));
const ITTicketTabs = lazy(() => import('./ITTicketTabs'));
const NewsAndUpdates = lazy(() => import('./NewsAndUpdates'));
const PostUpdateForm = lazy(() => import('./PostUpdateForm'));
const Profile = lazy(() => import('./Profile'));
const ProfileEditForm = lazy(() => import('./ProfileEditForm'));
const Attendance = lazy(() => import('./Attendance'));
const Notifications = lazy(() => import('./Notifications'));
const PasswordReset = lazy(() => import('./PasswordReset'));
const OrganizationStructure = lazy(() => import('./OrganizationStructure'));
const AccessRights = lazy(() => import('./AccessRights'))
const HRDocsUpload = lazy(() => import('./HRDocsUpload'))
const InductionChecklist = lazy(() => import('./InductionChecklist'));
const EmployeeInductionExit = lazy(() => import('./EmployeeInductionExit'));
const EntitlementsManager = lazy(() => import('./EntitlementsManager'));
const AttachEntitlement = lazy(() => import('./AttachEntitlement'));
const EmployeeAttendanceList = lazy(() => import('./EmployeeAttendanceList'));
const EmployeeDetailsSearch = lazy(() => import('./EmployeeDetailsSearch'));
const EmployeeManager = lazy(() => import('./EmployeeManager'));
const NewsManager = lazy(() => import('./NewsManager'));
const AssetManager = lazy(() => import('./AssetManager'));
const EligibilityManager = lazy(() => import('./EligibilityManager'));
const ContractsPortal = lazy(() => import('./ContractsPortal'));

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
            <Route path={`${match.path}dashboard`} component={Dashboard} />
            <Route path={`${match.path}register-user`} component={RegisterEmployeeForm} />
            <Route path={`${match.path}organization-structure`} component={OrganizationStructure} />
            <Route path={`${match.path}leaves`} component={LeaveManager} />
            <Route path={`${match.path}manage-leaves`} component={AdminLeaves} />
            <Route path={`${match.path}apply-leave`} component={LeaveForm} />
            <Route path={`${match.path}pay-slips`} component={PaySlipTabs} />
            <Route path={`${match.path}it-tickets`} component={ITTicketTabs} />
            <Route path={`${match.path}news-and-updates`} component={Profile} />
            <Route path={`${match.path}post-update`} component={NewsManager} />
            <Route path={`${match.path}edit-profile`} component={ProfileEditForm} />
            <Route path={`${match.path}my-profile`} component={Profile} />
            <Route path={`${match.path}attendance`} component={Attendance} />
            <Route path={`${match.path}notifications`} component={Notifications} />
            <Route path={`${match.path}password-reset`} component={PasswordReset} />
            <Route path={`${match.path}access-rights`} component={AccessRights} />
            <Route path={`${match.path}hr-documents`} component={HRDocsUpload} />
            <Route path={`${match.path}induction-list-admin`} component={InductionChecklist} />
            <Route path={`${match.path}employee-induction-exit`} component={EmployeeInductionExit} />
            <Route path={`${match.path}entitlements-manager`} component={EntitlementsManager} />
            <Route path={`${match.path}attach-entitlements`} component={AttachEntitlement} />
            <Route path={`${match.path}attendance-list`} component={EmployeeAttendanceList} />
            <Route path={`${match.path}employee-details`} component={EmployeeDetailsSearch} />
            <Route path={`${match.path}employee-manager`} component={EmployeeManager} />
            <Route path={`${match.path}asset-manager`} component={AssetManager} />
            <Route path={`${match.path}eligibility-manager`} component={EligibilityManager} />
            <Route path={`${match.path}my-contracts`} component={ContractsPortal} />
            {/* <Redirect from='/' to='/portal/dashboard' /> */}
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
    alert: getAlert(state),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {})
)(Portal);