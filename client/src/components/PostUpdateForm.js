import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { formStyle } from '../styles/form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from './MainContainer';
import TextEditor from './TextEditor';
import { getUserOrganization } from '../reducers/authReducer';

const updateTypes = [
    {
        value: "Company News",
        label: "Company News",
    },
    {
        value: "Announcement",
        label: "Announcement",
    },
    {
        value: "Employees",
        label: "Employees",
    },
    {
        value: "external_feeds",
        label: "External Feeds",
    },
]

const externalFeedTypes = [
    {
        value: "local",
        label: "Local",
    },
    {
        value: "technology",
        label: "Technology",
    },
    {
        value: "economy",
        label: "Economy",
    },
]

let dropdowns = [
    { name: 'dropdown_1', value: 'type' },
    { name: 'dropdown_2', value: 'type' },
]

class PostUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {
                type: null,
                category: null,
                title: '',
                body: '',
                link: null,
                status: 'active',
                organization: null,
            },
            dropdown_1: {
                disabled: false,
                value: null,
                data: [],
            },
            dropdown_2: {
                disabled: true,
                value: null,
                data: [],
            },
            textField_1: {
                disabled: true,
                value: null,
            },
        };
    }

    handleSelectChange = (e) => {
        let target = e.target.id
        let value = e.target.value
        let state = dropdowns.find((dropdown) => {
            if (dropdown.name === target)
                return dropdown.value
        }).value

        if (target === 'dropdown_1' && value !== 'external_feeds') {
            this.setState(prevState => ({
                news: {
                    ...prevState.news,
                    [state]: value,
                    link: null,
                },
                dropdown_2: {
                    ...prevState.dropdown_2,
                    disabled: true,
                    value: null,
                },
                textField_1: {
                    disabled: true,
                    value: '',
                },
                [target]: {
                    ...prevState[target],
                    value: value,
                },
            }))
        }
        else if (target === 'dropdown_1') {
            this.setState(prevState => ({
                news: {
                    ...prevState.news,
                    [state]: value,
                    body: null,
                },
                dropdown_1: {
                    ...prevState.dropdown_2,
                    disabled: false,
                    value: value,
                },
                dropdown_2: {
                    ...prevState.dropdown_2,
                    disabled: false,
                    value: value,
                },
                textField_1: {
                    disabled: false,
                    value: '',
                },
            }))
        }
        else if (target === 'dropdown_2') {
            this.setState(prevState => ({
                news: {
                    ...prevState.news,
                    [state]: value,
                    body: null,
                },
                dropdown_2: {
                    ...prevState.dropdown_2,
                    disabled: false,
                    value: value,
                },
                textField_1: {
                    disabled: false,
                    value: '',
                },
            }))
        }

    }

    handleTextChange = (e) => {
        let target = e.target.id
        let value = e.target.value

        this.setState(prevState => ({
            news: {
                ...prevState.news,
                [target]: value,
            },
        }))
    }

    handleSubmit = async () => {
        let response
        let data = this.state.news
        data.organization = this.props.userOrganization

        try {
            response = await axios({
                method: 'post',
                url: '/admin/post',
                data: data,
            })

            console.log(response)
        }
        catch (err) {
            console.log(err.response)
        }
    }

    handleSubmitResponse = (res) => {
        let error = res.data.message;

        if (res.data.status >= 400) {
            if (res.data.redirectURL)
                window.location.href = `${res.data.redirectURL}`;
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            let newData = this.state.data.filter(row => {
                return this.state.checked.indexOf(row.row_id) === -1
            })
            console.log("New Data: ", newData)
            this.setState(prevState => ({
                data: newData,
                checked: []
            }))
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Container>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom component="h6" className={classes.heading}>
                        Post Update
                    </Typography>
                    <TextField
                        id="dropdown_1"
                        select
                        label="Type of Update"
                        className={classNames(classes.textField, classes.dense)}
                        disabled={this.state.dropdown_1.disabled}
                        value={this.state.dropdown_1.value}
                        onChange={this.handleSelectChange}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        // helperText="Please select your currency"
                        margin="dense"
                        variant="filled"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                            shrink: true,
                        }}
                    >
                        <option value={null}>
                            {''}
                        </option>
                        {updateTypes.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="dropdown_2"
                        select
                        label="External Feed Type"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        disabled={this.state.dropdown_2.disabled}
                        value={this.state.dropdown_2.value}
                        onChange={this.handleSelectChange}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        // helperText="Please select your currency"
                        margin="dense"
                        variant="filled"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                            shrink: true,
                        }}
                    >
                        <option value={null}>
                            {''}
                        </option>
                        {externalFeedTypes.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="link"
                        label="Link"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        disabled={this.state.textField_1.disabled}
                        value={this.state.news.link}
                        onChange={this.handleTextChange}
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="title"
                        label="Title"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="filled"
                        value={this.state.news.title}
                        onChange={this.handleTextChange}
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    <TextField
                        id="body"
                        label="Body"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        className={classNames(classes.textField, classes.dense, classes.fullSpanInput)}
                        multiline
                        rows={5}
                        disabled={!this.state.dropdown_2.disabled}
                        margin="dense"
                        variant="filled"
                        value={this.state.news.body}
                        onChange={this.handleTextChange}
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                        InputLabelProps={{
                            className: classes.inputLabel,
                        }}
                    />
                    {/* <TextEditor /> */}
                    <Button onClick={this.handleSubmit} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Post
                    </Button>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userOrganization: getUserOrganization(state)
    }
}

export default compose(
    withStyles(formStyle),
    connect(mapStateToProps, {})
)(PostUpdateForm);