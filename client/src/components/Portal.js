import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Dashboard from './Dashboard';
import RegisterEmployeeForm from './RegisterEmployeeForm';
import LeaveTabs from './LeaveTabs';
import AdminLeaves from './AdminLeaves';
import LeaveForm from './LeaveForm';
import PaySlipTabs from './PaySlipTabs';
import ITTicketTabs from './ITTicketTabs';
import NewsAndUpdates from './NewsAndUpdates';
import PostUpdateForm from './PostUpdateForm';
import Profile from './Profile';
import ProfileEditForm from './ProfileEditForm';
import Attendance from './Attendance';
import Notifications from './Notifications';
import PasswordReset from './PasswordReset';

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
    console.log(`${match.path}/create`);

    return (
      <div className={classes.root}>
        <AppBar
          handleDrawerOpen={this.handleDrawerOpen}
          drawerOpen={this.state.drawerOpen}
        />
        <Drawer
          handleDrawerClose={this.handleDrawerClose}
          isOpen={this.state.drawerOpen}
        />
        <Switch>
          <Route path={`${match.path}dashboard`} component={Dashboard} />
          <Route path={`${match.path}create`} component={RegisterEmployeeForm} />
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
        </Switch>
      </div>
    );
  }
}

Portal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Portal);