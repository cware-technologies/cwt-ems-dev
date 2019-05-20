import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
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
const RegisterOrganization = lazy(() => import('./RegisterOrganization'));
const AddResponsibility = lazy(() => import('./AddResponsibility'))
const HRDocsUpload = lazy(() => import('./HRDocsUpload'))
const InductionChecklist = lazy(() => import('./InductionChecklist'));
const EmployeeInductionExit = lazy(() => import('./EmployeeInductionExit'));
const EntitlementsManager = lazy(() => import('./EntitlementsManager'));
const AttachEntitlement = lazy(() => import('./AttachEntitlement'));
const EmployeeAttendanceList = lazy(() => import('./EmployeeAttendanceList'));
const EmployeeDetailsSearch = lazy(() => import('./EmployeeDetailsSearch'));

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
});

class Portal extends React.Component {
  state = {
    drawerOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppBar
            handleDrawerOpen={this.handleDrawerOpen}
            drawerOpen={this.state.drawerOpen}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Drawer
            handleDrawerClose={this.handleDrawerClose}
            isOpen={this.state.drawerOpen}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={`${match.path}dashboard`} component={Dashboard} />
            <Route path={`${match.path}register-user`} component={RegisterEmployeeForm} />
            <Route path={`${match.path}organization-structure`} component={RegisterOrganization} />
            <Route path={`${match.path}leaves`} component={LeaveTabs} />
            <Route path={`${match.path}manage-leaves`} component={AdminLeaves} />
            <Route path={`${match.path}apply-leave`} component={LeaveForm} />
            <Route path={`${match.path}pay-slips`} component={PaySlipTabs} />
            <Route path={`${match.path}it-tickets`} component={ITTicketTabs} />
            <Route path={`${match.path}news-and-updates`} component={NewsAndUpdates} />
            <Route path={`${match.path}post-update`} component={PostUpdateForm} />
            <Route path={`${match.path}edit-profile`} component={ProfileEditForm} />
            <Route path={`${match.path}my-profile`} component={Profile} />
            <Route path={`${match.path}attendance`} component={Attendance} />
            <Route path={`${match.path}notifications`} component={Notifications} />
            <Route path={`${match.path}password-reset`} component={PasswordReset} />
            <Route path={`${match.path}access-rights`} component={AddResponsibility} />
            <Route path={`${match.path}hr-documents`} component={HRDocsUpload} />
            <Route path={`${match.path}induction-list-admin`} component={InductionChecklist} />
            <Route path={`${match.path}employee-induction-exit`} component={EmployeeInductionExit} />
            <Route path={`${match.path}entitlements-manager`} component={EntitlementsManager} />
            <Route path={`${match.path}attach-entitlements`} component={AttachEntitlement} />
            <Route path={`${match.path}attendance-list`} component={EmployeeAttendanceList} />
            <Route path={`${match.path}employee-details`} component={EmployeeDetailsSearch} />
            <Redirect from='/' to='/portal/' />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

Portal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Portal);