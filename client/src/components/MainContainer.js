import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBarSpacer: {
      ...theme.mixins.toolbar,
      gridColumn: 1 / -1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 12,
    margin: '0px 5%',
    display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto',
        gridAutoRows: 'auto',
        gridAutoFlow: 'row',
        columnGap: '10px',
        rowGap: '10px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      justifyContent: 'space-between',
    }
  },
  contained: {
    borderRadius: '5px',
    boxShadow: '0px 0px 10px -5px',
    padding: 10,
    margin: 0,
  },
});

class Dashboard extends React.Component {
  render() {
    const { classes, children, contained } = this.props;

    return (
      <main className={contained ? classNames(classes.content, classes.contained) : classNames(classes.content, this.props._className, contained && classes.contained)}>
        {children}
      </main>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);