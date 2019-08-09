import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabContainer from './TabContainer';
import Container from './MainContainer';
import LeaveRequest from './LeaveRequest';
import LeaveHistory from './LeaveHistory';
import LeaveEnitlements from './LeaveEntitlements'
import LeaveEmployeeRequests from './LeaveEmployeeRequests'

const styles = theme => ({
    root: {
        flexGrow: 1,
        // display: 'flex',
        // alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        // maxWidth: 800,
        alignSelf: 'center'
    },
    feed: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit,
        // gridArea: 'feed',
        height: '100%',
    },
    tabs: {
        backgroundColor: theme.palette.grey[200],
        color: 'black',
    },
    tabLabel: {
        color: 'black',
    },
})

class LeaveManager extends React.Component {
    state = {
        value: 0,
        isFetching: true,
        success: null,
        news: [],
    };

    async componentDidMount() {
        let response;

        try {
            response = await axios({
                method: 'get',
                url: '/homepage/external-feeds',
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

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value, news } = this.state;

        return (
            <Container>
                <div className={classes.feed}>
                    <Typography variant="h6" gutterBottom component="h2" align='center'>
                        Leaves Manager
                    </Typography>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered
                        classes={{
                            root: classes.tabs,
                        }}
                    >
                        <Tab label="Request" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab label="History" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab label="Entitlements" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab label="Employee Requests" classes={{ labelIcon: classes.tabLabel, }} />
                    </Tabs>
                    <TabContainer>
                        {value === 0 && <div><LeaveRequest /></div>}
                        {value === 1 && <div><LeaveHistory /></div>}
                        {value === 2 && <div><LeaveEnitlements /></div>}
                        {value === 3 && <div><LeaveEmployeeRequests /></div>}
                    </TabContainer>
                </div>
            </Container>
        );
    }
}

LeaveManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaveManager);