import React from 'react'
import debounce from 'lodash.debounce'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator';
// import AutoComplete from './AutoComplete'

import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Button, IconButton } from '@material-ui/core';

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Container from './MainContainer';
import { ReactComponent as LoadingSpinner } from '../assets/loading.svg'

const style = theme => ({
    container: {
        margin: 'auto',
        width: '100%',
        position: 'relative',
    },
    filterButtonContainer: {
        display: 'inline'
    },
    input: {
        height: '50px',
        width: '100%',
        fontSize: 16,
        padding: '5px 10px 5px 40px',
        borderColor: 'transparent',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.10),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.25),
        },
    },
    suggestionsContainer: {
        display: 'none',
    },
    suggestion: {
        listStyleType: 'none',
        cursor: 'pointer',
        padding: '10px 20px'
    },
    suggestionHighlighted: {
        backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    containerOpen: {
        margin: 'auto',
        padding: 0,
    },           /* 'react-autosuggest__container--open', */
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },              /* 'react-autosuggest__input--open', */
    inputFocused: {
        outline: 'none',
    },            /* 'react-autosuggest__input--focused', */
    suggestionsContainerOpen: {
        display: 'block',
        position: 'absolute',
        zIndex: 5,
        margin: 0,
        padding: 0,
        border: '1px solid #aaa',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: '100%',
        backgroundColor: 'gray',
    },/* 'react-autosuggest__suggestions-container--open', */
    suggestionsList: {
        padding: 0,
        margin: 0,
    },         /* 'react-autosuggest__suggestions-list', */
    suggestionFirst: {

    },         /* 'react-autosuggest__suggestion--first', */
    sectionContainer: {
        display: 'none',
    },        /* 'react-autosuggest__section-container', */
    sectionContainerFirst: {
        display: 'none',
    },   /* 'react-autosuggest__section-container--first', */
    sectionTitle: {
        display: 'none',
    },            /* 'react-autosuggest__section-title' */
    inputContainer: {
        position: 'relative',
    },     
    icon: {
        position: 'absolute',
        top: '13px',
        left: '10px',
        width: '24px',
        height: '24px',
    },
    matched: {
        color: 'blue',
        fontWeight: 'bold',
    },
    filterIcon: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fade(theme.palette.common.black, 0.20),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.35),
        },
    },
    iconButtonRoot: {
        borderRadius: '0px',
        height: '100%',
    },
})

const renderInputComponent = (inputProps, classes, isLoading) => (
    <div className={classes.inputContainer}>
      {isLoading && <div ><LoadingSpinner className={classes.icon}/></div>}
      <input {...inputProps} />
    </div>
)

const getSuggestionValue = suggestion => suggestion.full_name

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion, { query }) => {
    // console.log("SUGGESTIONNNNNNN:", suggestion, suggestion.name, query)
    // const matches = AutosuggestHighlightMatch(getSuggestionValue(suggestion), query);
    // const parts = AutosuggestHighlightParse(getSuggestionValue(suggestion), matches);

    // console.log(parts, matches)
    // return (
    //         <span>
    //             {parts.map((part, index) => {
    //                 const className = part.highlight ? this.props.classes.matched : null;

    //                 return (
    //                 <span className={className} key={index}>
    //                     {part.text}
    //                 </span>
    //                 );
    //             })}
    //         </span>
    // )
    return <span>
        {suggestion.full_name}
    </span>
}

class AutoSuggestContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            filter: 'name',
            userMenuAnchorEl: null,
        }
        this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 500);
    }

    loadSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        this.setState({
            isLoading: true
        });

        return inputLength === 0 ? [] : this.props.apiCall()

        
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.debouncedLoadSuggestions(value);
    };

    onSuggestionsClearRequested = () => {
        this.props.onClear()
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.props.onSelect(suggestion)
    }

    shouldRenderSuggestions = (value) => {
        return value.trim().length > 2;
    }

    handleMenu = event => {
        this.setState({ userMenuAnchorEl: event.currentTarget });
    };
    
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
    
    render() {
        const { value, suggestions, onChange, classes, isLoading, searchFilterProps } = this.props
        const inputProps = {
            placeholder: "Search",
            type: 'search',
            value,
            onChange: onChange
        };
        let { userMenuAnchorEl } = this.state;
        const userMenuOpen = Boolean(userMenuAnchorEl);

        return (
            <div className={classes.container}>
                { searchFilterProps &&
                    <div className={classes.filterButtonContainer}>
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
                <Autosuggest
                    theme={classes}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    renderInputComponent={(inputProps) => renderInputComponent(inputProps, classes, isLoading)}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        )
    }
}

export default withStyles(style)(AutoSuggestContainer)