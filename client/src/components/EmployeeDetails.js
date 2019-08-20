import React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { connect } from 'react-redux'
import EmployeeDetailSection from './EmployeeDetailSection'
import AttributesManager from './AttributesManager'
import { alertActions } from '../actions';

const officialRows = [
    { label: 'Department',  title: 'Department', id: ['division', 'name'], type: 'text'},
    { label: 'Manager', title: 'Manager', id: ['manager', 'full_name'], type: 'text'},
    { label: 'Location', title: 'Location', id: 'ATTRIB_01', type: 'text'},
]

const officialSchema = yup.object().shape({
    
});

const payrollRows = [
    { label: 'Basic Salary', title: 'Basic Salary', id: 'ATTRIB_01', type: 'text'},
    { label: 'Travelling Allowance', title: 'Travelling Allowance', id: 'ATTRIB_01', type: 'text'},
    { label: 'Rental Allowance', title: 'Rental Allowance', id: 'ATTRIB_01', type: 'text'},
    { label: 'Bank Account', title: 'Bank Account', id: 'ATTRIB_01', type: 'text'},
    { label: 'Bank Name', title: 'Bank Name', id: 'ATTRIB_01', type: 'text'},
]

const payrollSchema = yup.object().shape({
    
});

const bankRows = [
    { label: 'Bank Name', title: 'Bank Name', id: 'ATTRIB_01', type: 'text'},
    { label: 'Branch Name/Code', title: 'Branch Name/Code', id: 'ATTRIB_01', type: 'text'},
    { label: 'City', title: 'City', id: 'ATTRIB_01', type: 'text'},
    { label: 'Account Number', title: 'Account Number', id: 'ATTRIB_01', type: 'text'},
    { label: 'IBAN Number', title: 'IBAN Number', id: 'ATTRIB_01', type: 'text'},
]

const bankSchema = yup.object().shape({
    
});

const assetsRows = [
    { label: 'Vehicle', title: 'Vehicle', id: 'ATTRIB_01', type: 'text'},
    { label: 'Laptop', title: 'Laptop', id: 'ATTRIB_01', type: 'text'},
]

const assetsSchema = yup.object().shape({
    
});

const insuranceRows = [
    { label: 'Life Insurance', title: 'Life Insurance', id: 'ATTRIB_01', type: 'text'},
    { label: 'Health Insurance', title: 'Health Insurance', id: 'ATTRIB_01', type: 'text'},
]

const insuranceSchema = yup.object().shape({
    
});

const dependantRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'First Name' },
    { id: 'ATTRIB_01', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Last Name'},
    { id: 'ATTRIB_18', date: true, disablePadding: true, lengthRatio:'Title', label: 'DOB'},
    { id: 'ATTRIB_12', disablePadding: true, lengthRatio:'Title', label: 'Age'},
    { id: 'ATTRIB_03', disablePadding: true, lengthRatio:'Title', label: 'Relation'},
]

const dependantFields = [
    { id: 'ATTRIB_03', type:'select', selectOptions: [
        {value:'husband', name:'Husband'},
        {value:'wife', name:'Wife'},
        {value:'father', name:'Father'},
        {value:'mother', name:'Mother'},
        {value:'sibling', name:'Sibling'},
        {value:'child', name:'Child'},
    ], label: 'Relation' },
    { id: 'name', type: 'text', label: 'First Name' },
    { id: 'ATTRIB_01', type: 'text', label: 'Last Name'},
    { id: 'ATTRIB_18', type: 'date', label: 'DOB'},
    { id: 'ATTRIB_12', type: 'number', label: 'Age', inputProps: { min: '0', max: '100', step: '1' }},
]

const designationRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
    { id: 'ATTRIB_01', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Division' },
    { id: 'ATTRIB_02', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Organization'},
    { id: 'ATTRIB_12', disablePadding: true, lengthRatio:'Title', label: 'Grade'},
]

const designationFields = [
    { id: 'name', type: 'text', label: 'Name' },
    { id: 'ATTRIB_01', type:'select', label: 'Division', indeterminate: true, requestParams: {
        endPoint: '/admin/org-struct/division',
        selectMapping: ['name', 'name', null, 'desc'], 
    }},
    { id: 'ATTRIB_02', type:'select', label: 'Organization', indeterminate: true, requestParams: {
        endPoint: '/admin/org-struct/organization',
        selectMapping: ['name', 'name', null, 'desc'], 
    }},
    { id: 'ATTRIB_12', type: 'number', label: 'Grade', inputProps: { min: '1', max: '10', step: '1' }},
]

class EmployeeDetails extends React.Component{
    state = {
        selected: null,
        data: [],
    }

    async componentDidUpdate(prevProps, prevState){
        let emp_id = this.props.object && this.props.object.row_id

        if(this.props.object === null){
            this.setState(prevState => ({
                data: [],
            }))
        }
        if(prevProps.object === null){
            this.getEmployeeDetails()
        }
        else if(this.props.object !== null && emp_id !== prevProps.object.row_id){
            this.getEmployeeDetails()
        }
    }

    getEmployeeDetails = async () => {
        let response
        let emp_id = this.props.object.row_id

        try{
            response = await axios({
                method: 'get',
                url: '/admin/employee/details',
                params: {
                    employee: emp_id,
                },
            })
            
            this.setState(prevState => ({
                data: response.data.result,
            }))
        }
        catch(err){
            this.props.error(err)
        }
    }

    handleSubmit = async (values, { setSubmitting }, detailType, associations) => {
        let keys = Object.keys(values)
        let postData = []
        let updateData = []
        
        keys.forEach(key => {
            if(values[key] === undefined){
                return 
            }
            let value = this.state.data.filter(element => element.name === key && element.ATTRIB_11 === null )[0]
            let update = this.state.data.filter(element => element.function ? element.function.val === key : false )[0]

            if(update){
                updateData.push({
                    ...update,
                    name: key,
                    ATTRIB_01: values[key],
                    ATTRIB_11: associations ? associations[key] : null,
                })
            }
            else if(!value){
                postData.push({
                    name: key,
                    type: detailType,
                    ATTRIB_01: values[key],
                    ATTRIB_11: associations ? associations[key] : null,
                    emp_id: this.props.object.row_id,
                })
            }
            else if(value){
                postData.push({
                    ...value,
                    ATTRIB_01: values[key],
                    ATTRIB_11: associations ? associations[key] : null,
                })
            }
        })

        postData = postData.filter(element => !!element)
        updateData = updateData.filter(element => !!element)

        axios.all([postData && this.postDetails(postData), this.updateDetails(updateData)])
        .then(axios.spread((postRes, updateRes) => {
            console.log("UPSERT RESPONSE: ", postRes, updateRes)

            if(postRes === null && updateRes.data.status === 200){
                this.props.success("Employee Updated Successfully.")
            }
            else if(postRes !== null && postRes.data.status === 200){
                this.props.success("Employee Updated Successfully.")
            }
            else if(postRes.data.status === 200 || updateRes.data.status === 200){
                this.props.success("Employee Updated Successfully.")                
            }
            else if(postRes.data.status === 400 || updateRes.data.status === 400){
                this.props.error(postRes.data)
            }
            setSubmitting(false);
            this.getEmployeeDetails()
        }))
        .catch(err => {
            console.log("EXCEPTION IN AXIOS.ALL!!!", err)
        })
        
    }

    updateDetails = async (data) => {
        return axios({
                method: 'put',
                url: '/admin/employee/details',
                data: {
                    records: data,
                },
            })
    }

    postDetails = async (data) => {
        return axios({
                method: 'post',
                url: '/admin/employee/details',
                data: {
                    records: data,
                },
            })
    }

    render(){
        let { classes, object } = this.props
        let { data } = this.state
        let emp_id = this.props.object ? this.props.object.row_id : ""

        return(
            object &&
                <React.Fragment>
                    <EmployeeDetailSection
                        headerTitle="Official Details"
                        detailType='official_details'
                        rows={officialRows}
                        link={'/employee-manager'}
                        search={`?id=${object.row_id}`}
                        schema={officialSchema}
                        data={object}
                        handleSubmit={this.handleSubmit}
                    />
                    <EmployeeDetailSection
                        headerTitle="Bank Details"
                        detailType='bank_details'
                        rows={bankRows}
                        schema={bankSchema}
                        data={data.filter(row => row.type === 'bank_details')}
                        handleSubmit={this.handleSubmit}
                    />
                    <EmployeeDetailSection
                        headerTitle="Assets Details"
                        detailType='assets_details'
                        indeterminate={true}
                        endpoint="/admin/employee/attachedAssets"
                        schema={assetsSchema}                    
                        data={data.filter(row => row.type === 'assets_details').map(ele => ({ ...ele, name: ele.function && ele.function.val}))}
                        handleSubmit={this.handleSubmit}
                    />
                    <EmployeeDetailSection
                        headerTitle="Insurance Details"
                        detailType='insurance_details'
                        indeterminate={true}
                        endpoint="/admin/employee/eligibility"
                        schema={insuranceSchema}                    
                        data={data.filter(row => row.type === 'insurance_details').map(ele => ({ ...ele, name: ele.function && ele.function.val}))}
                        handleSubmit={this.handleSubmit}
                    />
                    <AttributesManager
                        headerTitle={'Dependants'}
                        rows={dependantRows}
                        fields={dependantFields}
                        entity={emp_id}
                        endpoint='/admin/employee/details/dependants'
                    />
                    <AttributesManager
                        headerTitle={'Designations'}
                        rows={designationRows}
                        fields={designationFields}
                        entity={emp_id}
                        endpoint='/admin/employee/details/designation'
                    />
                </React.Fragment>
        )
    }
}

export default connect(()=>{}, {...alertActions})(EmployeeDetails)