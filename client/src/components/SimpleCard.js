import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
    // width: '200px',
    // display: 'inline-block',
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[500],
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    height: '1px',
    // width: '80%',
    position: 'relative',
    // left: '50%',
    // transform: 'translateX(-50%)',
    backgroundColor: theme.palette.grey[1000],
    margin: '10px 0px',
  },
});

function SimpleCard(props) {
  const { classes } = props;

  const getDate = (ms) => {
    var date = new Date(ms);
    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
    };

    var result = date.toLocaleDateString('en', options);
    return result;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          { props.title }
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body1" component="p" align="left" >
          { props.body }
        </Typography>
        <Typography variant="overline" component="p" align="right" color="textSecondary">
          { getDate(props.date) }
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='text' size="small" color='primary'>Read More</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);