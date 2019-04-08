import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DrawerMUI from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, AdminListItems } from './ListItems';
import { ReactComponent as Logo} from '../assets/ems-logo.svg';

const styles = theme => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: theme.drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen / 2,
        }),
        [theme.breakpoints.down('sm')]: {
          position: 'fixed',
        },
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen / 2,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.down('sm')]: {
          width: 0,
        },
      },
      logo: {
        height: '60%',
        width: '60%',
      },
    
})

class Drawer extends React.Component {
    render(){
        let { classes, handleDrawerClose, isOpen } = this.props;

        return (
            <DrawerMUI
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
                }}
                open={isOpen}
            >
                <div className={classes.toolbarIcon}>
                    <Logo className={classes.logo}/>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List component="nav">
                    <MainListItems />
                    <AdminListItems />
                </List>
            </DrawerMUI>
        ); 
    }
}

Drawer.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Drawer);