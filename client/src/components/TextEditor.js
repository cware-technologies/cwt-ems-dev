import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import 'draft-js/dist/Draft.css';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        position: 'relative',
        gridColumn: '1 / -1',
        width: '99%',
        height: '300px',
        borderBottom: '1px solid black',
        borderRadius: '5px 0px 5px 0px',
        overflowX: 'scroll',
        backgroundColor: theme.palette.grey[500],
        paddingLeft: theme.spacing.unit * 1.5,
        paddingRight: theme.spacing.unit * 1.5,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    editorLabel: {
        fontSize: '16px',
        color: 'white',
        padding: '8px',
        // position: 'absolute',
        // top: '0px',
    },
    button: {
        border: 'none',
        backgroundColor: 'darkslategrey',
        color: 'white',
    },
})

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChangeDraft = (editorState) => this.setState({ editorState });
    }

    _onBoldClick() {
        this.onChangeDraft(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    _onItalicClick() {
        this.onChangeDraft(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Typography variant="subheading" gutterBottom component="p" align="left" color="textSecondary" classes={{ root: classes.editorLabel }}>
                    Message
                </Typography>
                <button className={classes.button} onClick={this._onBoldClick.bind(this)}>Bold</button>
                <button className={classes.button} onClick={this._onItalicClick.bind(this)}>Italic</button>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChangeDraft}
                />
            </div>
        );
    }
}

export default withStyles(styles)(TextEditor);