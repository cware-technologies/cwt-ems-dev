import React from 'react';
import { withStyles } from '@material-ui/core/styles'

import { Typography, Tabs, Tab } from '@material-ui/core'

import Container from './MainContainer'

const viewContainerStyles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit * 2,
    }
});

const tabContainerStyles = theme => ({
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

class TabContainer extends React.Component {

    state = {
        value: 0,
    }

    render(){
        let { classes, title } = this.props
        const { value } = this.state

        return(
            <Container>
                <div className={classes.feed}>
                    <Typography variant="h6" gutterBottom component="h2" align='center' className={classes.heading}>
                        ${title}
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
                    <ViewContainer>
                        {value === 0 && <div></div>}
                        {value === 1 && <div></div>}
                        {value === 2 && <div></div>}
                        {value === 3 && <div></div>}
                    </ViewContainer>
                </div>
        </Container>
        )
    }
}

class ViewContainer extends React.Component {
    render(){
        const { classes, children } = this.props;

        return(
            <div className={classes.root}>
                {children}
            </div>
        )
    }
}

ViewContainer = withStyles(viewContainerStyles)(ViewContainer)
export default withStyles(tabContainerStyles)(TabContainer);