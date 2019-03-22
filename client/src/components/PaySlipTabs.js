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
import PaySlipForm from './PaySlipForm';

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

class IconLabelTabs extends React.Component {
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
                        <Tab icon={<SvgIcon><g>
    <path d="M0,11Q0,5.81,0,.59C0,0,0,0,.61,0H12.8a1.15,1.15,0,0,1,.84.33Q16.56,3,19.5,5.64a.82.82,0,0,1,.32.66c0,1,0,1.95,0,2.92,0,.35-.11.48-.47.48-1.37,0-1.16.19-1.18-1.14,0-.31,0-.63,0-.94,0-.67,0-.67-.69-.67H12.79c-.67,0-.67,0-.67-.65,0-1.45,0-2.89,0-4.34,0-.39-.1-.52-.5-.52q-4.79,0-9.58,0c-.33,0-.45.1-.45.44q0,9.15,0,18.3c0,.33.09.45.44.45H9.38c.55,0,.56,0,.56.54,0,1,.1.9-.88.9-2.83,0-5.67,0-8.5,0-.44,0-.56-.13-.55-.56C0,18,0,14.52,0,11ZM16.92,5.5l0-.09L13.73,2.48c0,1,0,1.89,0,2.78a.22.22,0,0,0,.25.23Z"/>
    <path d="M16.18,22.06c-.63,0-1.14,0-1.66,0s-.38-.12-.21-.4q.77-1.21,1.52-2.44c.15-.24.3-.27.52-.11a3.48,3.48,0,0,0,.38.2c.61.32.62.32.31.95-.1.2-.08.27.16.28a3.58,3.58,0,0,0,3-1.89,3.06,3.06,0,0,0-.55-3.39c-.26-.27-.24-.42,0-.64.87-.74.71-1,1.52.17a4.61,4.61,0,0,1-3,7.17A11.87,11.87,0,0,1,16.18,22.06Z"/>
    <path d="M16.5,13.9a3.77,3.77,0,0,0-3.27,2,3.07,3.07,0,0,0,.46,3.4c.33.35.27.52-.05.8-.78.69-.82.7-1.42-.17a4.65,4.65,0,0,1,2.39-7.1,6.36,6.36,0,0,1,2-.4c.73,0,1.46,0,2.19,0,.24,0,.37.07.22.33q-.7,1.25-1.39,2.52c-.12.21-.25.29-.48.17s-.54-.26-.82-.37-.3-.23-.15-.46S16.38,14.14,16.5,13.9Z"/>
  </g></SvgIcon>} label="Generate" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab icon={<DoubleTickIcon />} label="Available" classes={{ labelIcon: classes.tabLabel, }} />
                        <Tab icon={<HistoryIcon />} label="Download History" classes={{ labelIcon: classes.tabLabel, }} />
                    </Tabs>
                    <TabContainer>
                        {value === 0 && <PaySlipForm />}
                        {value === 1 && <LeavesList />}
                        {value === 2 && <LeavesList />}
                    </TabContainer>
                </Paper>
            </Container>
        );
    }
}

IconLabelTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);