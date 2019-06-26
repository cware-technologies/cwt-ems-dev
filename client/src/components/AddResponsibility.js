import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Container from './MainContainer'
import DataTable from './DataTable'
import ListView from './ListView'
import AddEditForm from './AddEditForm'
import ModalTrigger from './ModalTrigger'
import { Button } from '@material-ui/core';
import { getUserOrganization } from '../reducers/authReducer';
import { alertActions } from '../actions';

const responsibilityRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
    { id: ['organization', 'name'], numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Organization' },
    { id: 'desc', numeric: false, disablePadding: true, lengthRatio: 'Detail', label: 'Description' },
]

const responsibilityFields = [
    { id: 'name', type:'text', label: 'Name' },
    { id: 'desc', type:'text', label: 'Description' },
]

const responsibilitySchema = {
    name: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    desc: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
}

const viewRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
    { id: 'desc', numeric: false, disablePadding: true, lengthRatio: 'Detail', label: 'Description' },
]

const viewFields = [
    { id: 'name', type:'text', label: 'Name' },
    { id: 'desc', type:'text', label: 'Description' },
    { id: 'ATTRIB_01', type:'text', label: 'Path' },
    { id: 'ATTRIB_02', type:'select', label: 'Location', selectOptions: [{ value: 'navbar', name: 'Navbar' }, { value: 'usermenu', name: 'User Menu' }]}
]

const viewSchema = {
    name: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    desc: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    ATTRIB_01: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
    ATTRIB_02: {
        presence: {
            allowEmpty: false,
            message: "Is Required"
        },
    },
}

const responsibilityViewRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name', },
    { id: 'desc', numeric: false, disablePadding: true, label: 'Description', },
    { id: 'readOnly', numeric: false, disablePadding: true, checkbox:true, label: 'Read Only', },
    { id: 'write', numeric: false, disablePadding: true, checkbox:true, label: 'Write', }, 
]

class AddResponsibility extends React.Component {
    responsibilityModalRef = React.createRef()
    viewModalRef = React.createRef()

    state = {
        editMode: false,
        organization: null,
        responsibility: null,
        view: null,
        isFetching: true,
        isFetchingRespViews: false,
        success: null,
        viewData: [],
        data: [],
        responsibilityData: [],
        responsibilityForm: {
            
        },
        viewData: [],
        viewForm: {

        },
        updates: {},
        openedWindow: null,
    }

    async componentDidMount(){
        this.getData()
    }

    setEditMode = (record, component) => {
        console.log("COMPONENT: ", component)
        this.setState(prevState => ({
            [`${component}Form`]: {
                ...prevState[`${component}Form`],
                ...record,
            },
            editMode: true,
            openedWindow: component,
        }), () => {console.log(this.state);this[`${component}ModalRef`].handleModalOpen()})
    }

    unsetEditMode = (data, component) => {
        let formdata = {}
        console.log(window)
        if(this.state.openedWindow === 'responsibility'){
            responsibilityFields.forEach(row => formdata[row.id] = '')
            this.setState(prevState => ({
                responsibilityForm: formdata,
                editMode: false,
                openedWindow: null,
            }))
        }
        else if(this.state.openedWindow === 'view'){
            viewFields.forEach(row => formdata[row.id] = '')
            this.setState(prevState => ({
                viewForm: formdata,
                editMode: false,
                openedWindow: null,
            }))
        }
    }

    getData = async () => {
        axios.all([this.getViews(), this.getResponsibilities()])
            .then(axios.spread((views, responsibilities) => {
                this.setState(prevState => ({
                    viewData: views.data.result,
                    responsibilityData: responsibilities.data.result,
                }))
            }))
            .catch(err => this.props.error({ message: "Could Not Load Data, Refresh To Try Again." }))
    }

    getViews = () => {
        return axios({
            method: 'get',
            url: '/admin/access-rights/vie\w',
            params: {
                bu_id: 1
            }
        })
    }

    getResponsibilities = () => {
        return axios({
            method: 'get',
            url: '/admin/org-struct/responsibility',
            params: {
                bu_id: this.props.organization
            }
        })
    }

    selectEntity = (entity, primary, organization) => {
        let labelField = `${entity}Label`

        this.setState(prevState => ({
            [entity]: primary,
            organization: organization !== null ? organization : prevState.organization,
            // [labelField]: label,
        }), () => {
            if(entity === 'responsibility'){
                this.getRespViews()
            }
        })
    }

    handleSubmit = async() => {
        let response

        if(this.state.responsibility !== null && this.state.view !== null){
            try{
                response = await axios({
                    method: 'post',
                    url: '/admin/access-rights/responsibility-view',
                    data: {
                        resp_id: this.state.responsibility,
                        views: this.state.view,
                        bu_id: this.state.organization,
                    }
                })

                console.log(response)

                if(response.data.status === 200){
                    this.setState(prevState => {
                        let newViews = prevState.viewData.filter(row => {
                            for(let i = 0; i < response.data.result.length; i++){
                                if(response.data.result[i].view_id === row.row_id)
                                    return true
                            }

                            return false
                        })

                        newViews = newViews.map(row => {
                            return {
                                ...row,
                                C_RESP_VIEW: {
                                    FLG_01: true,
                                    FLG_02: false,
                                }
                            }
                        })


                        
                        console.log("NEW VIEWS: ", newViews)
                        return {
                            data: [
                                ...prevState.data,
                                ...newViews,
                            ]
                        }
                    })

                    this.props.success("Views Added Successfully!")
                }
                else{
                    this.props.error({ message: "Action Couldn't Be Completed, Try Again." })
                }
                
            }
            catch(err){

            }
        }
    }

    handleResponse = (res) => {
        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetching: false,
                success: false,
            }))
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                data: res.data.result,
                isFetching: false,
                success: true,
            }))
        }
    }

    getTitle = () => {
        if(this.state.responsibilityData.length > 0){
            let row = this.state.responsibilityData.filter(row => row.row_id === this.state.responsibility)
            return row[0] ? row[0].name : ""
        }
        else
            return ""
    }

    getViewData = () => {
        let { data } = this.state
        return this.state.viewData.filter(row => {
            for(let index = 0; index < data.length; index++) {
                if(data[index].row_id === row.row_id){
                    return false
                }
            }
            return true
        })
    }

    handleChange = (event, element) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                [target]: value,
            }
        }))
    }

    postResponsibility = async(event, element) => {
        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                organization: this.props.organization,
            }
        }), () => { this.sendPostRequest(element, '/admin/org-struct/responsibility') })

    }

    postView = async(event, element) => {
        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                organization: this.props.organization,
            }
        }), () => { this.sendPostRequest(element, '/admin/access-rights/view') })

    }

    sendPostRequest = async (element, endpoint) => {
        let response;

        try{
            response = await axios({
                method: 'post',
                url: `${endpoint}`,
                data: this.state[`${element}Form`],
            })
            console.log(response)
            this.handlePostResponse(response, element)
            return
        }
        catch(err){
            console.log(err)
            this.handlePostResponse(err.response, element)
            return
        }
    }

    handlePostResponse = (res, element) => {
        if (res.data.status >= 400) {
            this.props.error({ message: "Action Failed, Try Again!" })
            this.setState(prevState => ({
                
            }))
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                [`${element}Data`]: [
                    ...prevState[`${element}Data`],
                    res.data.result,
                ]
            }))

            this.props.success("Action Successful!")
        }
    }

    clearSelection = (entity, rest) => {
        let newValue = rest
        if( rest.length <= 0 )
            newValue = null

        let newState = {
            [entity]: newValue,
            data: entity === 'responsibility' ? [] : this.state.data,
        }

        this.setState(prevState => newState)
    }

    handleDelete = () => {

    }

    // VIEW PERMISSIONS METHODS

    getRespViews = async() => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: '/admin/access-rights/responsibility-view',
                params: {
                    resp_id: this.state.responsibility,
                }
            })

            console.log("RESP_VIEW_RESPONSE", response)
            this.handleRespViewResponse(response)
        }
        catch(err){
            this.handleRespViewResponse(err.response)
        }
    }

    handleRespViewResponse = (res) => {
        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetchingRespViews: false,
                success: false,
            }))

            this.props.error({ message: "Could Not Load Data, Refresh To Try Again." })
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                data: res.data.result[0].view && res.data.result[0].view,
                isFetchingRespViews: false,
                success: true,
            }),  () => console.log("LIST VIEW STATE: ", this.state))
        }
    }

    handleCheckboxChange = (event, id, idx) => {
        let target = event.target.id
        let value = event.target.checked
        let data = this.state.data
        let flag = target === 'readOnly' ? 'FLG_01' : 'FLG_02'

        console.log("Handle Checkbox Change")

        
        let index = 0
        for(index; index < data.length; index++) {
            if(data[index].row_id === id) 
                break;
        }
            

        // let selection = data.filter(row => row.row_id === id)
        // console.log("SELECTION: ", selection)
        // let index = selection[0] && selection[0].row_id

        data[index] = {
            ...data[index],
            C_RESP_VIEW: {
                ...data[index].C_RESP_VIEW,
                [flag]: value,
            }
        }

        this.setState(prevState => ({
            data: data,
            updates: {
                ...prevState.updates,
                [idx]: {
                    ...prevState.updates[idx],
                    [flag]: value,
                }
            }
        }), () => console.log("UPDATE STATE: ", this.state))
    }

    handleUpdate = async (event) => {
        let response
        console.log("UPPPPDDDAAATTTEEE!!!")
        try{
            response = await axios({
                method: 'put',
                url: '/admin/access-rights/responsibility-view',
                data: {
                    updates: this.state.updates,
                }
            })

            console.log(response)
            if(response.data.status >= 400){
                this.props.error({ message: "Could Not Update Data, Please Try Again." })
            }
            else if(response.data.status == 200){
                this.props.success("Data Updated Successfully!")
            }
        }
        catch(err){
            console.log(response)
            this.props.error({ message: "Could Not Update Data, Please Try Again." })            
        }
    }

    render(){
        let { 
            responsibility, 
            data, 
            viewData, 
            responsibilityData, 
            responsibilityForm, 
            viewForm, 
            isFetchingRespViews 
        } = this.state

        let { editMode } = this.state

        let RespAddComp = 
            <ModalTrigger
                IconButton={
                    <Tooltip title="Add">
                        <IconButton aria-label="Add">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
                innerRef={node => this.responsibilityModalRef = node}
                disabled={editMode}
                onClose={this.unsetEditMode}
            >
                <AddEditForm
                    headerTitle="responsibility"
                    fields={responsibilityFields}
                    schema={responsibilitySchema}
                    object={responsibilityForm}
                    handleChange={this.handleChange}
                    handleSubmit={this.postResponsibility}
                    editMode={editMode}
                />
            </ModalTrigger>

        let ViewAddComp =
            <ModalTrigger
                IconButton={
                    <Tooltip title="Add">
                        <IconButton aria-label="Add">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
                innerRef={node => this.viewModalRef = node}
                disabled={editMode}
                onClose={this.unsetEditMode}
            >
                <AddEditForm
                    headerTitle="view"
                    fields={viewFields}
                    schema={viewSchema}
                    object={viewForm}
                    handleChange={this.handleChange}
                    handleSubmit={this.postView}
                    editMode={editMode}
                />
            </ModalTrigger>

        let ViewAttachComp = 
            <ModalTrigger
                IconButton={
                    <Tooltip title="Add">
                        <IconButton aria-label="Add">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
                innerRef={node => this.viewModalRef = node}
                disabled={!responsibility && !isFetchingRespViews }
                onClose={this.unsetEditMode}
            >
                <React.Fragment>
                    <DataTable
                        headerTitle='view'
                        rows={viewRows}
                        data={this.getViewData()}
                        isSelectable
                        selectMultiple
                        setEditMode={this.setEditMode}
                        unsetEditMode={this.unsetEditMode}
                        handleDelete={this.handleDelete}
                        selectEntity={this.selectEntity}
                        clearSelection={this.clearSelection}
                        AddComponent={ViewAddComp}
                    />
                    <Button onClick={this.handleSubmit} variant="contained" color="primary" /* className={classNames(classes.button, classes.textField)} */>
                        Add View
                    </Button>
                </React.Fragment>
            </ModalTrigger>

        return (
            <Container>
                {/* <DataTable
                    headerTitle="All Views"
                    rows={viewRows}
                    endpoint='/access-rights/view'
                    params={{ organization: organization }}
                    data={data}
                /> */}
                <DataTable
                    headerTitle='responsibility'
                    rows={responsibilityRows}
                    data={responsibilityData}
                    actions
                    disableDelete
                    isSelectable
                    setEditMode={this.setEditMode}
                    unsetEditMode={this.unsetEditMode}
                    selectEntity={this.selectEntity}
                    clearSelection={this.clearSelection}
                    AddComponent={RespAddComp}
                />
                
                <ListView 
                    headerTitle={`${this.getTitle()} Views`}
                    rows={responsibilityViewRows}
                    endpoint='/access-rights/view'
                    handleCheckboxChange={this.handleCheckboxChange}
                    handleUpdate={this.handleUpdate}
                    responsibility={responsibility}
                    data={data}
                    actions={[ViewAttachComp]}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        organization: getUserOrganization(state)
    }
}

export default connect(mapStateToProps, {...alertActions})(AddResponsibility)