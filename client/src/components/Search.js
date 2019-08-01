import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search';
import { Button, IconButton } from '@material-ui/core';
import { ReactComponent as LoadingSpinner } from '../assets/loading.svg'

const styles = theme => ({
    search: {
        position: 'relative',
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.10),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        flexGrow: 3,
        flexBasis: '60%',
        [theme.breakpoints.up('sm')]: {
        //   marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
    },
    filterMenuContainer: {
        height: '100%'
    },
    form: {
        width: '100%',
        height: '100%',
    },
    searchIcon: {
        height: '100%',
        width: theme.spacing.unit * 9,
        position: 'absolute',
        boxSizing: 'border-box',
        right: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        height: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        height: '100%',
        boxSizing: 'inherit',
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    filterIcon: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fade(theme.palette.common.black, 0.10),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.25),
        },
    },
    iconButtonRoot: {
        borderRadius: '0px',
        height: '100%',
    },
})

class SearchBar extends React.Component {
    state = {
        filter: 'name',
        userMenuAnchorEl: null,
    }

    submitHandler = (e) => {
        e.preventDefault()

        this.props.submitHandler()
    }

    handleMenu = event => {
        this.setState({ userMenuAnchorEl: event.currentTarget });
    };

    changeHandler = (e) => {
        this.props.changeHandler(e)
    }
    
    handleClose = (event) => {
        const target = event.target.id;
        let filterProps = this.props.searchFilterProps
        let filter = filterProps.filterMapping[target]
        filterProps.changeFilter(filter)
        this.setState(prevState => ({
            filter: target || prevState.filter,
            userMenuAnchorEl: null
        }));
    };

    render(){
        const { classes, match, title, submitHandler, changeHandler, query, isSearching, searchFilterProps } = this.props
        let { userMenuAnchorEl } = this.state;
        const userMenuOpen = Boolean(userMenuAnchorEl);

        return (
            <React.Fragment>
                { searchFilterProps &&
                    <div className={classes.filterMenuContainer}>
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
                            {
                                searchFilterProps.filters.map(element => 
                                    <MenuItem id={element} onClick={this.handleClose}>{element}</MenuItem>                                
                                )
                            }
                        </Menu>
                        <div className={classes.filterBar}>
                            <Button
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
                                { this.state.filter }
                                <ExpandMoreIcon />
                            </Button>
                        </div>
                    </div>
                }
                <div className={classes.search}>                    
                    <form onSubmit={this.submitHandler} target="_top" className={classes.form}>
                        <InputBase
                            id='query'
                            onChange={this.changeHandler}
                            value={query}
                            placeholder={`Search ${title}…`}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                        <div className={classes.searchIcon}>
                            {
                                isSearching ? <div ><LoadingSpinner className={classes.icon}/></div> : 
                            
                                <IconButton type='submit' key="search" aria-label="Search" color="inherit" style={{boxSizing: 'border-box'}}>
                                    <SearchIcon />
                                </IconButton>
                            }
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(SearchBar))