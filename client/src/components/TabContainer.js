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

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){
        let { classes, title, components } = this.props
        const { value } = this.state

        return(
            <div className={classes.feed}>
                <Typography variant="h6" gutterBottom component="h2" align='center' className={classes.heading}>
                    {title}
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
                    {
                        components.map(component => <Tab label={component.label} classes={{ labelIcon: classes.tabLabel, }} />)
                    }
                </Tabs>
                <ViewContainer>
                    {components[value].component}
                </ViewContainer>
            </div>
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