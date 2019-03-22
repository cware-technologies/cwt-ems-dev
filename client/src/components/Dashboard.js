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
import { news as newsList } from '../assets/news';

const styles = theme => ({
  board: {
      width: '100%',
      padding: theme.spacing.unit,
      margin: theme.spacing.unit * 2,
      backgroundColor: theme.palette.grey[300],
    }
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
    const news = newsList.slice(0, 5);

    return (
      <Container>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.board} elevation={5}>
          <Typography variant="h4" gutterBottom component="h2">
            News And Updates
          </Typography>
          { news.map((item, index) => {
                return <SimpleCard 
                  title={item.title}
                  body={item.body}
                  date={item.date}
                />
              }
            )
          }
          <Button component={Link} to="news_and_updates">
            Show All
          </Button>
        </Paper>
        <Paper className={classes.board} elevation={5}>
          <Typography variant="h4" gutterBottom component="h2">
            Tasks
          </Typography>
        </Paper>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);