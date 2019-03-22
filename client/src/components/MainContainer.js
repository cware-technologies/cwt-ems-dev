import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBarSpacer: {
      ...theme.mixins.toolbar,
      gridColumn: 1 / -1,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    margin: '5vh 5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Dashboard extends React.Component {
  render() {
    const { classes, children } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);