import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SvgIcon from '@material-ui/core/SvgIcon';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AllIcon from '@material-ui/icons/AllInclusive';
import PendingIcon from '@material-ui/icons/HourglassEmpty';
import DoubleTickIcon from '@material-ui/icons/DoneAll';
import HistoryIcon from '@material-ui/icons/History'
import TabContainer from './TabContainer';
import LeavesList from './LeavesList';
import Container from './MainContainer';

const styles = theme => ({
    root: {
        flexGrow: 1,
        // display: 'flex',
        // alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        maxWidth: 800,
    },
    content: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.unit * 3,
        boxSizing: 'border-box',
    },
    appBarSpacer: theme.mixins.toolbar,
    tabs: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
    },
    tabLabel: {
        color: 'white',
    }
});

class LeaveTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <Container>
                <Paper square className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        classes={{
                            root: classes.tabs,
                        }}
                    >
                        <Tab icon={<AllIcon />} label="All" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab icon={<PendingIcon />} label="Pending" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab icon={<HistoryIcon />} label="Availed" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab icon={<DoubleTickIcon />} label="Approved" classes={{ labelIcon: classes.tabLabel, }} />
                    </Tabs>
                    <TabContainer>
                        {value === 0 && <LeavesList />}
                        {value === 1 && <div>Item Two</div>}
                        {value === 2 && <div>Item Three</div>}
                        {value === 3 && <div>Item Four</div>}
                        {value === 4 && <div>Item Five</div>}
                    </TabContainer>
                </Paper>
            </Container>
        );
    }
}

LeaveTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaveTabs);