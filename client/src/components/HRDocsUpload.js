import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import axios from 'axios'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { combineStyles } from '../helpers/utils'
import Container from './MainContainer'
import Modal from '@material-ui/core/Modal'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import { formStyle } from '../styles/form';
import { alertActions } from '../actions';
import RestrictedComponent from './RestrictedComponent';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    actionBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    modal: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});


class HRDocsUpload extends React.Component {
    state = {
        checked: [],
        file: null,
        name: null,
        modalOpen: false,
        data: [],
        isFetching: true,
        success: null,
    };

    async componentDidMount(){
        this.getDocs()
    }

    getDocs = async() => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: '/admin/hr-docs'
            })

            this.handleResponse(response)
        }
        catch(err){
            this.handleResponse(err.response)
        }
    }

    handleResponse = (res) => {
        let error = res.data.message;
        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetching: false,
                success: false,
            }))

            this.props.error({message: "Document Could Not Be Fetched!"})

            if (res.data.redirectURL)
                window.location.href = `${res.data.redirectURL}`;
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                data: res.data.result,
                isFetching: false,
                success: true,
            }))
        }
    }

    onFormSubmit = (e, formRef) => {
        e.preventDefault()

        this.fileUpload(this.state.file, this.state.name)
        .then((response)=>{

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: [...prevState.data, response.data.result],
                    name: null,
                    file: null,
                }))

                this.props.success("Document Uploaded Successfully!")
            }
            else{
                this.props.error(response.data)
            }

            formRef.reset()
            
        })
        .catch(err => {
            this.props.error({message: "Document Could Not Be Uploaded!"})
            formRef.reset()
        })
    }

    fileUpload = (file, name) => {
        const formData = new FormData();
        formData.append('file', file)
        formData.append('name', name)

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }

        return axios.post(
            '/admin/hr-docs/upload',
            formData,
            config,
        )
    }

    handleChange = (event) => {
        let target = event.target.id
        let value 

        if(target === 'file'){
            value = event.target.files[0]
            this.setState(prevState => ({
                file: value,
            }))
        }
        else{
            value = event.target.value
            this.setState(prevState => ({
                [target]: value
            }))
        }
    }

    handleDownload = async(e, path) => {
        window.open(`http://localhost:3001/admin/hr-docs/download?path=${path}`)
        
        // let response
        // try{
        //     response = await axios({
        //         method: 'get',
        //         url: '/admin/hr-docs/download',
        //         params: {
        //             path: path,
        //         }
        //     })
        // }
        // catch(err){
        //     console.log("Error: ", err)
        // }
    }

    handleDelete = async() => {
        let response

        try{
            response = await axios({
                method: 'delete',
                url: '/admin/hr-docs',
                data: {
                    documents: this.state.checked,
                }
            })

            this.handleDeleteResponse(response)
        }
        catch(err){
            this.handleDeleteResponse(err.response)
        }
    }

    handleDeleteResponse = (res) => {
        let error = res.data.message;

        if (res.data.status >= 400) {
            this.props.error({message: "Document Deletion Failed"})
            if (res.data.redirectURL)
                window.location.href = `${res.data.redirectURL}`;
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            let newData = this.state.data.filter(row => {
                return this.state.checked.filter(item => item.id === row.row_id).length <= 0
            })
            this.setState(prevState => ({
                data: newData,
                checked: []
            }))

            this.props.success("Document(s) Deleted Successfully!")
        }
    }

    handleToggle = (value, path) => () => {
        const { checked } = this.state;
        const currentIndex = checked.filter(row => row.id === value);
        const newChecked = [...checked];

        if (currentIndex.length <= 0) {
            newChecked.push({
                id: value,
                path,
            });
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    handleModalOpen = (e) => {
        this.setState({ modalOpen: true });
    };

    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };

    render() {
        const { classes, location } = this.props
        const { modalOpen, data } = this.state
        const { handleModalOpen, handleModalClose, handleDownload, handleDelete } = this

        console.log("LOCATION: ", location)

        return (
            <Container>
                <RestrictedComponent
                    restriction='write'
                    viewID={location.state.viewID}
                >
                    <div className={classes.actionBar}>
                        <Button
                            onClick={handleModalOpen}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Upload
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Delete
                        </Button>
                    </div>
                </RestrictedComponent>
                <List className={classes.root}>
                    {data.length <= 0 ? <ListItem dense ><ListItemText primary="No Documents Found" /></ListItem> : 
                    data.map(row => (
                        <ListItem key={row.row_id} role={undefined} dense >
                            <Checkbox
                                checked={this.state.checked.filter(item => item.id === row.row_id).length > 0}
                                tabIndex={-1}
                                disableRipple
                                onClick={this.handleToggle(row.row_id, row.path)}
                            />
                            <ListItemText primary={row.name} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Download" onClick={(e) => handleDownload(e, row.path)}>
                                    <DownloadIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <EnhancedUploadModal
                    onFormSubmit={this.onFormSubmit}
                    handleChange={this.handleChange}
                    fileName={this.state.name}
                    modalOpen={modalOpen}
                    handleModalClose={handleModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                />
            </Container>
        );
    }
}

HRDocsUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

const UploadModal = ({ onFormSubmit, fileName, handleChange, modalOpen, handleModalClose, classes }) => {
    let formRef = React.createRef()

    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classNames(classes.modal, classes.paper)}>
                <form ref={node => formRef = node}>
                    <FormControl className={classes.formControl} style={{ marginBottom: '10px', }}>
                        <InputLabel htmlFor="file" shrink={true} style={{zIndex:'1',marginLeft:'5px',}}><PhotoCamera />Document</InputLabel>
                        <FilledInput name="file" type="file" accept="image/*" id="file" onChange={handleChange}/>
                    </FormControl>
                    <FormControl className={classes.formControl} style={{ margin: '10px', }}>
                        <InputLabel htmlFor="name" style={{zIndex:'1',marginLeft:'5px'}}>Name</InputLabel>
                        <FilledInput name="name" type="text" id="name" value={fileName} onChange={handleChange}/>
                    </FormControl>
                    <Button onClick={(e) => onFormSubmit(e, formRef)} variant="contained" color="primary" className={classNames(classes.button, classes.textField)}>
                        Upload
                    </Button>
                </form>
            </div>
        </Modal>  
    )
}

let combinedStyles = combineStyles(styles, formStyle)
const EnhancedUploadModal = withStyles(combinedStyles)(UploadModal);

export default compose(
    withStyles(styles),
    connect(() => {}, { ...alertActions })
)(HRDocsUpload);