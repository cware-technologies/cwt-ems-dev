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
        isFetching: true,
        success: null,
    };

    render() {
        return (
            <Container>
                <TabContainer
                    title="Leave Manager"
                    components={
                        [
                            { label: "Request", component: <LeaveRequest /> },
                            { label: "History", component: <LeaveHistory /> },
                            { label: "Entitlements", component: <LeaveEnitlements /> },
                            { label: "Employee Requests", component: <LeaveEmployeeRequests /> },
                        ]
                    }
                />
            </Container>
        );
    }
}

LeaveManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaveManager);