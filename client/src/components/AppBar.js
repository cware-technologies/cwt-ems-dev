import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBarMUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/PersonSharp';

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
        marginLeft: theme.drawerWidth,
        width: `calc(100% - ${theme.drawerWidth}px)`,
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
    constructor(props) {
        super(props);
        this.state = {
            userMenuAnchorEl: null,
        }
    }

    handleMenu = event => {
        this.setState({ userMenuAnchorEl: event.currentTarget });
      };
    
    handleClose = () => {
    this.setState({ userMenuAnchorEl: null });
    };

    render() {
        let { classes, handleDrawerOpen, drawerOpen } = this.props;
        let { userMenuAnchorEl } = this.state;
        const userMenuOpen = Boolean(userMenuAnchorEl);

        return (
            <AppBarMUI
                position="absolute"
                className={classNames(classes.appBar, this.props.drawerOpen && classes.appBarShift)}
            >
                <Toolbar disableGutters={!this.props.drawerOpen} className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(
                            classes.menuButton,
                            drawerOpen && classes.menuButtonHidden,
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
                    <IconButton
                        color="inherit"
                        aria-owns={userMenuOpen ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                    >
                        <PersonIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={userMenuAnchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        anchorPosition={{
                            left: 50,
                            top: 50,
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={userMenuOpen}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Edit Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBarMUI>
        )
    }
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AppBar);