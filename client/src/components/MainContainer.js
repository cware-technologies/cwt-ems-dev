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
});

class Dashboard extends React.Component {
  render() {
    const { classes, children } = this.props;

    return (
      <main className={classNames(classes.content, this.props._className)}>
        {children}
      </main>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);