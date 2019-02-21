import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
});

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="body1" component="p" align="left" >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, officiis nulla! Vitae, exercitationem molestias. Aperiam, nisi? Veniam dolor laboriosam sed debitis adipisci numquam veritatis possimus velit maiores nobis, vel libero.
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