import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Container from './MainContainer'
import HierarchyChart from './HierarchyChart'
import ProfilePic from '../assets/profile-pic.jpg'
import { Typography } from '@material-ui/core';
import generateChart from '../helpers/generateChart';

const styles = theme => ({
    header: {
        width: '100%',
        // height: '300px',
        // backgroundColor: theme.palette.secondary.light,
        border: 'solid 1px gray',
        borderRadius: '10px',
        display: 'flex',
    },
    imgContainer: {
        height: '100%',
        width: 'auto',
        float: 'left',
        margin: theme.spacing.unit,
        boxSizing: 'border-box',
    },
    profilePic: {
        height: 'auto',
        width: 'auto',
        border: `3px solid ${theme.palette.secondary.dark}`,
        borderRadius: '50%',
        [theme.breakpoints.down('sm')]: {
            height: '120px',
            width: '120px',
        }
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
    },
    title: {
        float: 'right',
        margin: theme.spacing.unit / 1.5,
    },
})

class Profile extends React.Component {

    render() {
        let { classes } = this.props
        let data = this.props.data || null

        return (
            <React.Fragment>
                {data &&
                    <div className={classes.header}>
                        <div className={classes.imgContainer}>
                            <img src={ProfilePic} className={classes.profilePic}></img>
                        </div>
                        <div className={classes.titleContainer}>
                            <Typography variant="subtitle1" component="h5" className={classes.title}>{data.full_name}</Typography>
                            <Typography variant="subtitle2" component="h6" color='secondary' className={classes.title}>{data.position_held.name}</Typography>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Profile);