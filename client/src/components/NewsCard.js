import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import NewWindowIcon from '@material-ui/icons/OpenInNew'
import ModalTrigger from './ModalTrigger';

const styles = theme => ({
    card: {
        minWidth: 275,
        // width: '200px',
        // display: 'inline-block',
        margin: theme.spacing.unit,
        height: 400,
        // backgroundColor: theme.palette.grey[500],
        [theme.breakpoints.down('md')]: {
            height: '200px',
        },
    },
    cardContent: {
        height: '82%',
        padding: '0px',
    },
    cardActions: {
        display: 'flex',
        position: 'relative',
        height: '18%',
        width: '100%',
        padding: '0px',
        boxShadow: '2px 2px 5px 2px black',
        backgroundColor: 'lightgray',
        [theme.breakpoints.down('md')]: {
            height: '18%',
        },
    },
    title: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        background: 'rgb(26,26,26)',
        // background: 'radial-gradient(circle, rgba(26,26,26,1) 0%, rgba(26,26,26,0.8) 70%, rgba(26,26,26,0) 100%)',
        background: 'linear-gradient(0deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.8127450809425333) 22%, rgba(26,26,26,0.81) 85%, rgba(26,26,26,0) 100%)',
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
    titleRoot: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
    },
    newsHeading: {
        color: 'white',

    },
    mediaRoot: {
        position: 'relative',
    },
    media: {
        height: '100%',
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
    faded: {
        position: 'relative',

        '&::after': {
            content: '""',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            position: 'absolute',
            top: '0px',
            left: '0px',
        }
    }
});

const after = {
    content: '""',
    height: '100%',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.6)'
}

const externalNewsTypes = ['Economy', 'Technology', 'Local']

function SimpleCard(props) {
    const { classes, _className } = props;

    const getTitleVariant = () => {
        return props.big && props.big === true ? 'h3' : 'h6'
    }

    const getDate = (datetime) => {
        var t, result = null;

        if (typeof datetime === 'string') {
            t = datetime.slice(0, -5).split(/[- :T]/);

            //when t[3], t[4] and t[5] are missing they defaults to zero
            result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
        }

        return result
    }

    const getImageURL = () => {
        if(props.type === "Company News"){
            return props.img
        }
        else if(props.type === "Economy" ||
                props.type === "Technology" ||
                props.type === "Local"
        ){
            return "/images/news/covers/external-news-cover.png"
        }
        else if(props.type === "Employee News"){
            return "/images/news/covers/employee-news-cover.jpg"
        }
        else if(props.type === "Announcements"){
            return "/images/news/covers/announcements-cover.gif"
        }
    }

    return (
        <Card raised elevation={3} className={classNames(classes.card, _className)}>
            <CardContent className={classes.cardContent} classes={!props.current && {root: classes.faded}}>
                <CardMedia
                    className={classes.media}
                    image={getImageURL()}
                    title={props.title}
                    classes={{ root: classes.mediaRoot }}
                >   
                    {/* <img src={props.img} alt="Hell"/> */}
                    <div className={classes.title}>
                        <Typography variant={getTitleVariant()} color="inherit" align='center' classes={{ root: classes.newsHeading }} classes={{ root: classes.titleRoot }}>
                            {props.title}
                        </Typography>
                    </div>
                </CardMedia>
            </CardContent>
            <CardActions className={classes.cardActions}>
                {
                    externalNewsTypes.filter(type => type === props.type).length > 0 
                    ?
                        <Link
                            component='button'
                            variant='button'
                            underline='none'
                            TypographyClasses={{
                                component: 'button',
                                variant: 'button',
                            }}
                        >
                            <a
                                href={ props.link && props.link }
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: 'none' }}   
                            >
                                <NewWindowIcon/>Read More
                            </a>
                        </Link>
                    :
                        <ModalTrigger
                            title='Read More'
                        >
                            <React.Fragment>
                                <Typography variant='title' align='center' color='textSecondary'>{props.title}</Typography>
                                <Typography variant='body1' align='center' color='textPrimary'>{props.body}</Typography>
                                <Typography variant="overline" component="p" align="right" color="textSecondary">{getDate(props.date).toDateString()}</Typography>
                            </React.Fragment>
                        </ModalTrigger>
                }
               
                <Typography variant="overline" component="p" align="right" color="textSecondary" className={classes.newsDate}>
                    {getDate(props.date).toDateString()}
                </Typography>
            </CardActions>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);