import React from 'react'
import debounce from 'lodash.debounce'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator';
// import AutoComplete from './AutoComplete'
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Container from './MainContainer';
import { ReactComponent as LoadingSpinner } from '../assets/loading.svg'

const style = theme => ({
    container: {
        margin: 'auto',
        width: '70%',
        position: 'relative',
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
    }
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
        }
        this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 500);
    }

    loadSuggestions(value) {
        console.log("AUTOSUGGEST VALUE:", value)
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

    render() {
        const { value, suggestions, onChange, classes, isLoading } = this.props
        const inputProps = {
            placeholder: "Search",
            type: 'search',
            value,
            onChange: onChange
        };

        return (
            <React.Fragment>
                <Autosuggest
                    theme={classes}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderInputComponent={(inputProps) => renderInputComponent(inputProps, classes, isLoading)}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </React.Fragment>
        )
    }
}

export default withStyles(style)(AutoSuggestContainer)