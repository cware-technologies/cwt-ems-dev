import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBarMUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/PersonSharp';

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
});

class AppBar extends React.Component {

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    
    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render(){
        let { classes } = this.props;
        return (
            <AppBarMUI
                position="absolute"
                className={classNames(classes.appBar, this.props.drawerOpen && classes.appBarShift)}
            >
                <Toolbar disableGutters={!this.props.drawerOpen} className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden,
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    Welcome &#91;Enter Name Here&#93;
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit">
                    <PersonIcon />
                </IconButton>
                </Toolbar>
            </AppBarMUI>
        )
    }
}

export default withStyles(styles)(AppBar);