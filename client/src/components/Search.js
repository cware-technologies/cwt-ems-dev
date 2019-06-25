import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
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
    form: {
        width: '100%',
        height: '100%',
    },
    searchIcon: {
        height: '100%',
        width: theme.spacing.unit * 9,
        position: 'absolute',
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
})

class SearchBar extends React.Component {
    state = {

    }

    submitHandler = (e) => {
        e.preventDefault()

        this.props.submitHandler()
    }

    render(){
        const { classes, match, title, submitHandler, changeHandler, query, isSearching } = this.props
        let { userMenuAnchorEl } = this.state;
        const userMenuOpen = Boolean(userMenuAnchorEl);
        console.log(isSearching)

        return (
            <React.Fragment>
                <div className={classes.search}>
                    
                    <form onSubmit={this.submitHandler} target="_top" className={classes.form}>
                        <InputBase
                            id='query'
                            onChange={changeHandler}
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
                            
                                <IconButton type='submit' key="search" aria-label="Search" color="inherit">
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