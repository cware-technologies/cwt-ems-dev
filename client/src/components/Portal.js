import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Dashboard from './Dashboard';
import CreateAccount from './CreateAccount';
import LeaveTabs from './LeaveTabs';
import AdminLeaves from './AdminLeaves';
import LeaveForm from './LeaveForm';
import PaySlipTabs from './PaySlipTabs';
import ITTicketTabs from './ITTicketTabs';
import NewsAndUpdates from './NewsAndUpdates';
import PostUpdateForm from './PostUpdateForm';

const styles = theme => ({
  root: {
    display: 'flex',
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
          <Route path={`${match.path}create`} component={CreateAccount} />
          <Route path={`${match.path}leaves`} component={LeaveTabs} />
          <Route path={`${match.path}manage_leaves`} component={AdminLeaves} />
          <Route path={`${match.path}apply_leave`} component={LeaveForm} />
          <Route path={`${match.path}pay_slips`} component={PaySlipTabs} />
          <Route path={`${match.path}it_tickets`} component={ITTicketTabs} />
          <Route path={`${match.path}news_and_updates`} component={NewsAndUpdates} />
          <Route path={`${match.path}post_update`} component={PostUpdateForm} />
        </Switch>
      </div>
    );
  }
}

Portal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Portal);