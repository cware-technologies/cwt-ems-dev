import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from './AppBar';
import Drawer from './Drawer';
import SimpleCard from './SimpleCard';
import Container from './MainContainer'
import Employees from './EmployeesBoard';
import Announcements from './AnnouncementsBoard';
import ExternalFeedsBoard from './ExternalFeedsBoard';
import NewsBoard from './NewsBoard';

const styles = theme => ({
  board: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto 100vh 60vh 60vh',
    gridTemplateAreas: '". ." "news news" "announcements employees" "feed feed"',
    rowGap: '20px',
    columnGap: '20px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto 60vh 60vh 60vh',
      gridTemplateAreas: '"." "news" "announcements" "employees" "feed"',
      gridAutoFlow: 'column dense',
    },
  },
});

class Dashboard extends React.Component {
  state = {
    drawerOpen: true,
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container _className={classes.board}>
        <div className={classes.appBarSpacer} />
        <NewsBoard />
        <Announcements />
        <Employees />
        <ExternalFeedsBoard />
      </Container>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);