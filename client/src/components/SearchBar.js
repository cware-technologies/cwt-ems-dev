import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PersonIcon from '@material-ui/icons/PersonSharp';
import NewsIcon from '@material-ui/icons/Receipt';
import DocumentsIcon from '@material-ui/icons/Description'

const styles = theme => ({
    search: {
        flexGrow:2,
        position: 'relative',
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.10),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        //   marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
    },
    filterBar: {
        width: 300,
        border: '1px solid',
        borderColor: fade(theme.palette.common.white, 0.15),
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        width: 'auto',
        height: '53%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        borderBottomWidth: '4px',
    },
    searchIcon: {
        height: '100%',
        width: theme.spacing.unit * 9,
        position: 'absolute',
        right: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterIcon: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    iconButtonRoot: {
        borderRadius: '0px',
    },
})

class SearchBar extends React.Component {
    state = {
        filter: 'employee',
        userMenuAnchorEl: null,
    }

    handleMenu = event => {
        this.setState({ userMenuAnchorEl: event.currentTarget });
    };
    
    handleClose = (event) => {
        const target = event.target.id;
        console.log("SearchBar: ", target)
        this.setState(prevState => ({
            filter: target || prevState.filter,
            userMenuAnchorEl: null
        }));
    };

    render(){
        const { classes, match } = this.props
        let { userMenuAnchorEl } = this.state;
        const userMenuOpen = Boolean(userMenuAnchorEl);

        return (
            <React.Fragment>
                <div className={classes.filterBar}>
                    <IconButton
                        disableRipple
                        color="inherit"
                        aria-owns={userMenuOpen ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        className={classes.filterIcon}
                        classes = {{
                            root: classes.iconButtonRoot,
                        }}
                    >
                        { this.state.filter === 'employee' ? <PersonIcon /> : this.state.filter === 'news' ? <NewsIcon /> : <DocumentsIcon />}
                        <ExpandMoreIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={userMenuAnchorEl}
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
                        <MenuItem id="employee" onClick={this.handleClose}>Employees</MenuItem>
                        <MenuItem id="news" onClick={this.handleClose}>News And Updates</MenuItem>
                        <MenuItem id="documents" onClick={this.handleClose}>Documents</MenuItem>
                    </Menu>
                </div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(SearchBar))