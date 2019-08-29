import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CommitIcon from '@material-ui/icons/Done'
import Container from './MainContainer'
import DataTable from './DataTable'
import ListView from './ListView'
import AddEditForm from './AddEditForm'
import ModalTrigger from './ModalTrigger'
import { Button } from '@material-ui/core';
import { getUserOrganization } from '../reducers/authReducer';
import { alertActions } from '../actions';
import { flattenObject } from '../helpers/utils';
import RestrictedComponent from './RestrictedComponent'

const responsibilityRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
    { id: ['organization', 'name'], numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Organization' },
    { id: 'desc', numeric: false, disablePadding: true, lengthRatio: 'Detail', label: 'Description' },
]

const responsibilityFields = [
    { id: 'name', type:'text', label: 'Name' },
    { id: 'desc', type:'text', label: 'Description' },
    { id: 'bu_id', name: 'organization', type:'select', label: 'Organization', indeterminate: true, requestParams: {endPoint: '/admin/org-struct/organization', selectMapping: ['name', 'row_id', null, 'desc'], } },
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

const respViewRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name', },
    { id: 'desc', numeric: false, disablePadding: true, lengthRatio: 'Detail',label: 'Description', },
    { id: ['C_RESP_VIEW', 'FLG_01'], type: 'toggle', numeric: false, disablePadding: true, lengthRatio: 'Action', label: 'Read Only' },
    { id: ['C_RESP_VIEW', 'FLG_02'], type: 'toggle', numeric: false, disablePadding: true, lengthRatio: 'Action', label: 'Write' },

    // { id: 'readOnly', numeric: false, disablePadding: true, checkbox:true, label: 'Read Only', },
    // { id: 'write', numeric: false, disablePadding: true, checkbox:true, label: 'Write', }, 
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
        isUpdating: false,
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
        checkboxRefs: {},
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
        let params = this.props.organization === 1 ? {} : {
            bu_id: this.props.organization
        }
        return axios({
            method: 'get',
            url: '/admin/org-struct/responsibility',
            params,
        })
    }

    selectEntity = (entity, primary, organization) => {
        let labelField = `${entity}Label`

        this.setState(prevState => ({
            [entity]: primary,
            organization: organization !== null ? organization : prevState.organization,
            checkboxRefs: {},
            // [labelField]: label,
        }), () => {
            console.log("STATE: ", this.state)
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
                        bu_id: this.props.organization,
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
        let method = this.state.editMode ? 'put' : 'post'

        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                organization: this.props.organization,
            }
        }), () => { this.sendPostRequest(element, '/admin/org-struct/responsibility', method) })

    }

    postView = async(event, element) => {
        let method = this.state.editMode ? 'put' : 'post'

        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                bu_id: this.props.organization,
            }
        }), () => { this.sendPostRequest(element, '/admin/access-rights/view', method) })

    }

    sendPostRequest = async (element, endpoint, method) => {
        let response;
        console.log(this.state[`${element}Form`])
        let data = flattenObject(this.state[`${element}Form`], '')
        console.log(data)

        try{
            response = await axios({
                method: method,
                url: `${endpoint}`,
                data,
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

            if(!res.data.inserted){
                this.props.success("Action Successfull!")

                this.setState(prevState => ({
                    [`${element}Data`]: [
                        ...prevState[`${element}Data`],
                        res.data.result,
                    ]
                }))
            }
            else if(res.data.inserted){
                this.props.warning("View Already Exists.")
            }
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

    handleDelete = async (id, row) => {
        let row_id = row.C_RESP_VIEW.row_id
        let response

        try{
            response = await axios({
                method: 'delete',
                url: '/admin/access-rights/responsibility-view',
                data: {
                    id: row_id,
                }
            })

            if(response.data.status === 200){
                this.props.success("Action Completed Successfully")
                let newData = this.state.data.filter(row => row.C_RESP_VIEW.row_id !== id)

                this.setState(prevState => ({
                    data: newData
                }))
            }
            else{
                this.props.error({message: "Action Could Not Be Completed"})
            }
        }
        catch(err){
            this.props.error({message: "Action Could Not Be Completed"})
        }
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
        else{
            this.props.error({ message: "Could Not Load Data, Refresh To Try Again." })
        }
    }

    handleCheckboxChange = (value, record, event) => {
        return new Promise((resolve, reject) => {
            let id = record.row_id
            let idx = record.C_RESP_VIEW.row_id
            let target = event.target
            let name = target.id
            // let value = target.checked
            let data = this.state.data
            let flag = name === 'readOnly' ? 'FLG_01' : 'FLG_02'


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
                },
                checkboxRefs: {
                    ...prevState.checkboxRefs,
                    [`${name}_${id}`]: {
                        target,
                        initial: !prevState.checkboxRefs[`${name}_${id}`] && !value,
                        dirty: true,
                    }
                }
            }), () => resolve())
        })
    }

    handleUpdate = async (event) => {
        let response
        this.setState(prevProps => ({
            isUpdating: true,
        }))

        try{
            response = await axios({
                method: 'put',
                url: '/admin/access-rights/responsibility-view',
                data: {
                    updates: this.state.updates,
                }
            })

            console.log(response)
            this.setState(prevProps => ({
                isUpdating: false,
            }))

            if(response.data.status >= 400){
                this.props.error({ message: "Could Not Update Data, Please Try Again." })
                this.resetCheckboxes()
            }
            else if(response.data.status == 200){
                this.setState(prevProps => ({
                    checkboxRefs: {},
                }))
                this.props.success("Data Updated Successfully!")
            }
        }
        catch(err){
            this.setState(prevProps => ({
                isUpdating: false,
            }), this.resetCheckboxes())

            this.props.error({ message: "Could Not Update Data, Please Try Again." })            
        }
    }

    resetCheckboxes = () => {
        let checkboxes = this.state.checkboxRefs
        let keys = Object.keys(checkboxes)

        keys.forEach(key => {
            checkboxes[key].target.checked = checkboxes[key].initial
        })
    }

    render(){
        let {
            responsibility,
            data,
            viewData,
            responsibilityData,
            responsibilityForm,
            viewForm,
            isFetchingRespViews,
            isUpdating,
        } = this.state

        let { editMode } = this.state

        let UpdateButton = 
            // <Tooltip title="Commit">
            //     <IconButton aria-label="Commit">
            //         <CommitIcon /> Commit
            //     </IconButton>
            // </Tooltip>
            <RestrictedComponent
                restriction='write'
            >
                <Button onClick={this.handleUpdate} disabled={!responsibility || isUpdating} variant="contained" color="default" /* className={classNames(classes.button, classes.textField)} */>
                    <CommitIcon /> Commit
                </Button>
            </RestrictedComponent> 

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
            <RestrictedComponent
                restriction='write'
            >
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
            </RestrictedComponent>

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
                
                {/* <ListView 
                    headerTitle={`${this.getTitle()} Views`}
                    rows={responsibilityViewRows}
                    handleCheckboxChange={this.handleCheckboxChange}
                    handleUpdate={this.handleUpdate}
                    handleDelete={this.handleDelete}
                    responsibility={responsibility}
                    data={data}
                    actions={[ViewAttachComp]}
                    disabled={isUpdating}
                /> */}
                <DataTable
                    headerTitle={`${this.getTitle()} Views`}
                    rows={respViewRows}
                    endpoint='/access-rights/view'
                    handleSwitchChange={this.handleCheckboxChange}
                    handleUpdate={this.handleUpdate}
                    handleDelete={this.handleDelete}
                    responsibility={responsibility}
                    data={data}
                    actions={true}
                    disableEdit={true}
                    actionBar={[UpdateButton, ViewAttachComp]}
                    disabled={isUpdating}
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