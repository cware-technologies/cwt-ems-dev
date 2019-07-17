import React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { connect } from 'react-redux'
import EmployeeDetailSection from './EmployeeDetailSection'
import { alertActions } from '../actions';

const officialRows = [
    { label: 'Department',  title: 'Department', id: ['division', 'name'], type: 'text'},
    { label: 'Manager', title: 'Manager', id: ['manager', 'full_name'], type: 'text'},
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

class EmployeeDetails extends React.Component{
    state = {
        selected: null,
        data: [],
    }

    async componentDidUpdate(prevProps, prevState){
        console.log("OBJECT: ", this.props.object)
        // console.log(this.props.object.row_id, "      ", prevProps.object.row_id)
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
            
            console.log("RESPONSESSSSSSS: ", response)
            this.setState(prevState => ({
                data: response.data.result,
            }))
        }
        catch(err){
            this.props.error(err)
        }
    }

    handleSubmit = async (values, { setSubmitting }, detailType, associations) => {
        console.log("VALUES: ", values)
        console.log("ASSOCIATIONS: ", associations)
        let keys = Object.keys(values)
        let newData = keys.map(key => {
            if(values[key] === undefined){
                return 
            }
            let value = this.state.data.filter(element => element.name === key )[0]

            if(!value){
                return {
                    name: key,
                    type: detailType,
                    ATTRIB_01: values[key],
                    ATTRIB_11: associations ? associations[key] : null,
                    emp_id: this.props.object.row_id,
                }
            }
            else if(value){
                return {
                    ...value,
                    ATTRIB_01: values[key],
                    ATTRIB_11: associations ? associations[key] : null,
                }
            }
        }).filter(element => !!element)

        let response

        try{
            response = await axios({
                method: 'post',
                url: '/admin/employee/details',
                data: {
                    records: newData,
                },
            })

            if(response.data.status === 200){
                this.props.success("Employee Updated Successfully.")
            }
            else{
                this.props.error(response.data)
            }
            setSubmitting(false);
            this.getEmployeeDetails()
            console.log("UPSERT RESPONSE: ", response)

        }
        catch(err){
            this.props.error(err)
        }
    }

    render(){
        let { classes, object } = this.props
        let { data } = this.state

        console.log("OAIJODISJODIJASOIDJSAOIDJOS", data)

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
                        endpoint="/admin/employee/assets"
                        schema={assetsSchema}                    
                        data={data.filter(row => row.type === 'assets_details').map(ele => ({ ...ele, name: ele.function && ele.function.val}))}
                        handleSubmit={this.handleSubmit}
                    />
                    <EmployeeDetailSection
                        headerTitle="Insurance Details"
                        detailType='insurance_details'
                        rows={insuranceRows}
                        schema={insuranceSchema}                    
                        data={data.filter(row => row.type === 'insurance_details')}
                        handleSubmit={this.handleSubmit}
                    />
                </React.Fragment>
        )
    }
}

export default connect(()=>{}, {...alertActions})(EmployeeDetails)