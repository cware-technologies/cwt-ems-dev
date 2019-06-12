import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Container from './MainContainer'
import DataTable from './DataTable'
import SelectableTable from './SelectableTable'
import ListView from './ListView'
import AddViewToResponsibility from './AddViewToResponsibility'
import { Button } from '@material-ui/core';
import { getUserOrganization } from '../reducers/authReducer';

const viewRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'desc', numeric: false, disablePadding: true, label: 'Description' },
]

const responsibilityViewRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name', },
    { id: 'desc', numeric: false, disablePadding: true, label: 'Description', },
    { id: 'readOnly', numeric: false, disablePadding: true, checkbox:true, label: 'Read Only', },
    { id: 'write', numeric: false, disablePadding: true, checkbox:true, label: 'Write', }, 
]

class AddResponsibility extends React.Component {
    state = {
        organization: null,
        responsibility: null,
        view: null,
        responsibilityData: [],
        viewData: [],
        isFetching: true,
        success: null,
        viewData: [],
        data: [],
        responsibilityData: [],
        responsibilityForm: {
            
        },
        viewForm: {

        },
    }

    async componentDidMount(){
        this.getData()
    }

    getData = async () => {
        axios.all([this.getViews(), this.getResponsibilities()])
            .then(axios.spread((views, responsibilities) => {
                console.log(views, responsibilities)
                this.setState(prevState => ({
                    viewData: views.data.result,
                    responsibilityData: responsibilities.data.result,
                }), () => console.log("STATUE:", this.state))
            }));
    }

    getViews = () => {
        return axios({
            method: 'get',
            url: '/admin/access-rights/view',
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
        }))
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
                        view_id: this.state.view,
                        bu_id: this.state.organization,
                    }
                })

                console.log("VIEW RESP POST RESPONSE: ", response)

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
        if(this.state.data.length > 0){
            let row = this.state.data.filter(row => row.row_id === this.state.responsibility)
            console.log("ROW: ", row)
            return row[0] ? row[0].name : ""
        }
        else
            return ""
    }

    handleChange = (event, element) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                [target]: value,
            }
        }), () => console.log('STSTSTSAAATTE: ', this.state))
    }

    postResponsibility = async(event, element) => {
        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                organization: this.props.organization,
            }
        }), () => {console.log('ORG: ', this.props.organization, this.state); this.sendPostRequest(element, '/admin/org-struct/responsibility')})

    }

    postView = async(event, element) => {
        this.setState(prevState => ({
            [`${element}Form`]: {
                ...prevState[`${element}Form`],
                organization: this.props.organization,
            }
        }), () => {console.log('ORG: ', this.props.organization, this.state); this.sendPostRequest(element, '/admin/access-rights/view')})

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
            console.log(response)
            this.handlePostResponse(err.response, element)
            return
        }
    }

    handlePostResponse = (res, element) => {
        if (res.data.status >= 400) {
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
        }
    }

    handleDelete = () => {

    }

    render(){
        let { responsibility, data, viewData, responsibilityData, responsibilityForm, viewForm } = this.state
        console.log("STATE RESPONSIBILITY: ", this.state)
        return (
            <Container>
                {/* <DataTable
                    headerTitle="All Views"
                    rows={viewRows}
                    endpoint='/access-rights/view'
                    params={{ organization: organization }}
                    data={data}
                /> */}
                <SelectableTable
                    title='responsibility'
                    endpoint='/admin/org-struct/responsibility'
                    updateState={this.setResponsibility}
                    actions
                    data={responsibilityData}
                    headers={[
                        {title:'Name', value:'name', type:'text'},
                        {title:'Organization', value:'organization', value2:'name', type:'select'},
                        {title:'Description', value:'desc', type:'text'}
                    ]}
                    fields={[
                        {label:'Name', id:'name', type:'text'},
                        {label:'Organization', id:'organization', value2:'name', type:'text', readOnly: true, defaultValue: `${this.props.organization}`, selectOptions:[{value: 'navbar', name:'Navbar'}, {value: 'user-menu', name:'User Menu'}]},
                        {label:'Description', id:'desc', type:'text'}
                    ]}
                    handleChange={this.handleChange}
                    handleSubmit={this.postResponsibility}
                    handleDelete={this.handleDelete}
                    selectEntity={this.selectEntity}
                    formData={responsibilityForm}
                />
                <SelectableTable
                    title='view'
                    endpoint='/'
                    updateState={this.setResponsibility}
                    actions
                    data={viewData}
                    headers={[
                        {title:'Name', value:'name', type:'text'},
                        {title:'Description', value:'desc', type:'text'}
                    ]}
                    fields={[
                        {label:'Name', id:'name', type:'text'},
                        {label:'Description', id:'desc', type:'text'},
                        {label:'Path', id:'path', type:'text'},
                        {label:'Location', id:'location', type:'select', selectOptions:[{value: 'navbar', name:'Navbar'}, {value: 'user-menu', name:'User Menu'},]}
                    ]}
                    handleChange={this.handleChange}
                    handleSubmit={this.postView}
                    handleDelete={this.handleDelete}
                    selectEntity={this.selectEntity}
                    formData={viewForm}
                />
                <Button onClick={this.handleSubmit} variant="contained" color="primary" /* className={classNames(classes.button, classes.textField)} */>
                    Add View
                </Button>
                <ListView 
                    headerTitle={this.getTitle()}
                    rows={responsibilityViewRows}
                    endpoint='/access-rights/view'
                    responsibility={responsibility}
                    data={data}
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

export default connect(mapStateToProps, {})(AddResponsibility)