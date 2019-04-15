import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SimpleCard from './SimpleCard';
import Container from './MainContainer'
import LoadingSpinner from './LoadingSpinner'
import LoadingError from './LoadError'
import ModalTrigger from './ModalTrigger'

const styles = theme => ({
    halfNotice: {
        gridArea: 'announcements',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit * 2,
        height: '100%',
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    // bubbles: {
    //     // backgroundColor: '#BAE0C7'/* #1a1a1a */,
    //     padding: '0.5em 0.5em',
    //     paddingLeft: '3em',
    //     // borderRight: '2px dotted cornflowerblue',
    //     // borderBottom: '2px dotted cornflowerblue',
    //     // borderBottomRightRadius: '30px',
    //     fontFamily: "'raleway', sans-serif",
    //     fontSize: '14px',
    //     fontWeight: 'bold',

    //     hr: {
    //         color: 'cornflowerblue',
    //     }
    // },
    // bubble: {
    //     position: 'relative',
    //     fontSize: '1.1em',
    //     margin: '2px 0px',
    //     lineHeight: '1.2em',
    //     marginBottom: '0.5em',
    //     color: 'black',
    //     padding: '5px',
    //     borderRadius: '3px',
    //     backgroundColor: 'cornflowerblue',
    //     boxShadow: '2px 2px 3px black',
    //     textAlign: 'left',

    //     '&:hover': {
    //         // backgroundColor: 'black',
    //     },

    //     '&:after': {
    //         content: '""',
    //         display: 'inline-block',
    //         position: 'absolute',
    //         top: '0px',
    //         left: '-28px',
    //         borderBottom: '10px solid transparent',
    //         borderTop: '20px solid cornflowerblue',
    //         borderLeft: '30px solid transparent',
    //     },

    //     '&:before': {
    //         content: '""',
    //         display: 'inline-block',
    //         // background-color: cornflowerblue,
    //         backgroundColor: '#6AB560',
    //         borderRadius: '50%',
    //         height: '12px',
    //         width: '12px',
    //         position: 'absolute',
    //         top: '0px',
    //         left: '-40px',
    //     },

    //     [theme.breakpoints.down('sm')]: {
    //         fontSize: '1em',
    //     },
    // },
    actionBar: {
        justifySelf: 'flex-end',
    },
})

class Announcements extends React.Component {
    state = {
        isFetching: true,
        success: null,
        news: [],
    };

    async componentDidMount() {
        let response;

        try {
            response = await axios({
                method: 'get',
                url: '/homepage/announcements',
            })
            console.log("RESPONSE: ", response)
            this.handleResponse(response)
        }
        catch (err) {
            console.log("ERROR: ", err);
            this.handleResponse(err.response)
        }
    }

    handleResponse = (res) => {
        let error = res.data.message;

        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetching: false,
                success: false,
            }))
            if (res.data.redirectURL)
                window.location.href = `${res.data.redirectURL}`;
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                news: res.data.news,
                isFetching: false,
                success: true,
            }))
        }
    }

    getDetails = (index) => {
        const data = (({ ATTRIB_01, ATTRIB_10, created }) => ({ ATTRIB_01, ATTRIB_10, created }))(this.state.news[index]);
        data.type = 'announcements'
        return data
    }

    render() {
        const { classes } = this.props;
        const { news, success, isFetching } = this.state;

        if (isFetching) {
            return <Paper className={classes.news} elevation={5}><LoadingSpinner /></Paper>
        }
        else if (!success) {
            return <Paper className={classes.news} elevation={5}><LoadingError /></Paper>
        }
        else{
            return (
                <Paper className={classes.halfNotice} elevation={5}>
                    <Typography variant="h6" gutterBottom component="h2" align='center'>
                        Latest Announcements
                    </Typography>
                    <div className={classes.content}>
                        <div className={classes.bubbles}>
                            {news.map((item, index) => <ModalTrigger title={item.ATTRIB_10} data={this.getDetails(index)}/> )}
                        </div>
                        <div className={classes.actionBar}>
                            <Button>See All</Button>
                        </div>
                    </div>
                </Paper>
            );
        }
    }
}

Announcements.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Announcements);