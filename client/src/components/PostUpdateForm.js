import React from 'react';
import axios from 'axios';
import validate from 'validate.js'
import classNames from 'classnames';
import debounce from 'lodash.debounce'
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { formStyle } from '../styles/form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Container from './MainContainer';
import TextEditor from './TextEditor';
import { getUserOrganization } from '../reducers/authReducer';
import AsyncSelect from './AsyncSelect'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

const updateTypes = [
    {
        value: "Company News",
        label: "Company News",
    },
    {
        value: "Announcements",
        label: "Announcements",
    },
    {
        value: "Employee News",
        label: "Employee News",
    },
]

const externalFeedTypes = [
    {
        value: "Local",
        label: "Local",
    },
    {
        value: "Technology",
        label: "Technology",
    },
    {
        value: "Economy",
        label: "Economy",
    },
]

const options = [
    {
      label: 'Company News',
      options: updateTypes,
    },
    {
      label: 'External Feed',
      options: externalFeedTypes,
    },
];

class PostUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {
                type_cd: { label: '', value: null },
                category: { label: '', value: null },
                ATTRIB_10: '',
                ATTRIB_01: '',
                ATTRIB_02: '',
                status_cd: 'active',
                file: null,
                organization: null,
            },
            errors:{},
            response: {},
        };

        this.formRef = React.createRef()
        this.debouncedSelectChange = debounce(this.handleSelectChange, 500);
    }

    componentDidMount(){
        this.setState(prevState => ({
            news: this.props.data,
        }))
    }

    validate = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        let val_errors;

        console.log("VALIDATE")

        val_errors = validate.single(value, this.props.schema[target]);
        
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [target]: val_errors,
            },
        }));
    }

    validateAll = async () => {
        return new Promise(async(resolve, reject) => {
        
            let val_errors = await validate(this.state.news, this.props.schema)

            let errors = val_errors ? Object.filter(val_errors, property => property !== undefined) : {}
            this.setState(prevState => ({
                errors
            }), resolve());
        })
    }

    allValid = async() => {
        // let localConstraints

        // if(this.props.editMode)
        //     localConstraints = (({login, fst_name, last_name, emp_num, bu_id, div_id}) => ({login, fst_name, last_name, emp_num, bu_id, div_id}))(constraints)
        // else
        //     localConstraints = constraints
        
        await this.validateAll()


        if(Object.keys(this.state.errors.constructor === Object && this.state.errors).length === 0 ){
            this.setState(prevState => ({
                response: {}
            }))
            return true
        }
        else{
            let response = {
                status: 412,
                message: 'Please Fill The Form Correctly',
            }

            this.setState(prevState => ({
                response,
            }))
            return false
        }
    }

    handleSelectChange = (name, obj) => {
        this.setState(prevState => ({
            news: {
                ...prevState.news,
                [name] : obj,
            }
        }), () => {this.props.changeHandler(name, obj)})

    }

    handleTextChange = (e) => {
        let target = e.target
        let id = target.id
        let value
        if(id === 'file'){
            value = target.files[0]
        }
        else { value = target.value }

        this.validate(e)
        this.props.changeHandler(id, value)
        .then(res => this.setState(prevState => ({
            news: {
                ...prevState.news,
                [id] : value,
            }
        })))
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        if(await this.allValid()){
            this.props.submitHandler(e, this.formRef)
        }
    }

    render() {
        const { data, classes, changeHandler } = this.props;
        const { errors, response, news } = this.state;

        return (
            <form ref={node => this.formRef = node}>
                <div className={classes.formSection}>
                    <Typography variant="h6" gutterBottom paragraph component="h6" align="center" display="block" className={classes.heading}>
                        Post Update
                    </Typography>
                    <AsyncSelect
                        name='update type'
                        id='type_cd'
                        options={options}
                        value={news.type_cd}
                        isDisabled={false}
                        handleSelectChange={this.handleSelectChange}
                    />
                    {errors["type_cd.value"] && <FormHelperText error><ul className={classes.errorList}> {errors["type_cd.value"].map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul></FormHelperText> }
                    <TextField
                        id="ATTRIB_02"
                        label="Link"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="outlined"
                        disabled={externalFeedTypes.filter(item => item.value === news.type_cd.value).length <= 0}
                        value={news.ATTRIB_02}
                        onChange={this.handleTextChange}
                        error={errors.ATTRIB_02}
                        helperText={errors.ATTRIB_02 && <ul className={classes.errorList}> {errors.ATTRIB_02.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                    />
                    <TextField
                        id="ATTRIB_10"
                        label="Title"
                        className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}
                        margin="dense"
                        variant="outlined"
                        value={news.ATTRIB_10}
                        onChange={this.handleTextChange}
                        error={errors.ATTRIB_10}
                        helperText={errors.ATTRIB_10 && <ul className={classes.errorList}> {errors.ATTRIB_10.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                    />
                    <FormControl className={classNames(classes.textField, classes.dense, classes.singleSpanInput)}>
                        <InputLabel htmlFor="file" shrink={true} style={{zIndex:'1',marginLeft:'5px',}}><PhotoCamera />Image</InputLabel>
                        <OutlinedInput name="file" type="file" accept="image/*" id="file" disabled={news.type_cd.value !== 'Company News'} onChange={this.handleTextChange}/>
                    </FormControl>
                    <TextField
                        id="ATTRIB_01"
                        label="Body"
                        className={classNames(classes.textField, classes.dense, classes.fullSpanInput)}
                        multiline
                        rows={5}
                        disabled={updateTypes.filter(item => item.value === news.type_cd.value).length <= 0}
                        margin="dense"
                        variant="outlined"
                        value={news.ATTRIB_01}
                        onChange={this.handleTextChange}
                        error={errors.ATTRIB_01}
                        helperText={errors.ATTRIB_01 && <ul className={classes.errorList}> {errors.ATTRIB_01.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
                    />
                    {/* <TextEditor /> */}
                    <FormHelperText>{response.status && <ul className={response.status<300?classes.successList:classes.errorList}><li className={classes.errorListItem}>{response.message}</li></ul>}</FormHelperText>
                    <Button 
                        className={classes.fullSpanInput}
                        onClick={this.handleSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Post
                    </Button>
                </div>
            </form>
        )
    }
}

PostUpdateForm.defaultProps = {
    schema: {},
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