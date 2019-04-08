import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
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
  cardContent: {
    height: '82%',
    padding: '10px',
  },
  cardActions: {
    display: 'flex',
    position: 'relative',
    height: '18%',
    width: '100%',
    padding: '0px',
    boxShadow: '2px 2px 10px 2px black',
    [theme.breakpoints.down('sm')]: {
      height: '5%',
    },
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
  newsHeading: {
    height: '10%',
    fontSize: '18px',
  },
  newsBody: {
    height: '80%',
    overflow: 'hidden',
    fontSize: '14px',
  },
  newsDate: {
    position: 'absolute',
    right: 0,
    justifySelf: 'flex-end',
  },
  readMore: {
    position: 'relative',
    padding: theme.spacing.unit,
    justifySelf: 'flex-start',
  },
});

function SimpleCard(props) {
  const { classes, _className } = props;

  const getDate = (datetime) => {
    var t, result = null;

    if( typeof datetime === 'string' )
    {
        t = datetime.slice(0, -5).split(/[- :T]/);
        console.log('T: ', t)

        //when t[3], t[4] and t[5] are missing they defaults to zero
        result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
    }

    return result
  }

  return (
    <Card className={classNames(classes.card, _className)}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} color="textSecondary" gutterBottom className={classes.newsHeading}>
          { props.title }
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body1" component="p" align="left" className={classes.newsBody}>
          { props.body }
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link
          component="button"
          variant="body2"
          color='primary'
          className={classes.readMore}
        >
          Read More
        </Link>
        <Typography variant="overline" component="p" align="right" color="textSecondary" className={classes.newsDate}>
          { getDate(props.date).toDateString() }
        </Typography>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);