import React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { withStyles } from '@material-ui/core/styles'
import EmployeeDetailSection from './EmployeeDetailSection'

const styles = theme => ({
    container: {
        width: '100%',
    }
})

const officialRows = [
    { label: 'Department',  title: 'Department', id: 'ATTRIB_01', type: 'text'},
    { label: 'Location', title: 'Location', id: 'ATTRIB_01', type: 'text'},
    { label: 'Manager', title: 'Manager', id: 'ATTRIB_01', type: 'text'},
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

class EmployeeDetails extends React.PureComponent{
    state = {
        selected: null,
        data: [],
    }

    async componentDidUpdate(prevProps, prevState){
        console.log("OBJECT: ", this.props.object)
        // console.log(this.props.object.row_id, "      ", prevProps.object.row_id)
        let emp_id = this.props.object && this.props.object.row_id

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

        }
    }

    handleSubmit = async (values, { setSubmitting }, detailType) => {
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
                    emp_id: this.props.object.row_id,
                }
            }
            else if(value){
                return {
                    ...value,
                    ATTRIB_01: values[key],
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

            setSubmitting(false);
            this.getEmployeeDetails()
            console.log("UPSERT RESPONSE: ", response)

        }
        catch(err){
            console.log("UPSERT ERROR: ", err)
        }
    }

    render(){
        let { classes, object } = this.props
        let { data } = this.state

        return(
            object &&
                <div className={classes.container}>
                    <EmployeeDetailSection
                        headerTitle="Official Details"
                        detailType='official_details'
                        rows={officialRows}
                        schema={officialSchema}
                        data={data.filter(row => row.type === 'official_details')}
                        handleSubmit={this.handleSubmit}
                    />
                    <EmployeeDetailSection
                        headerTitle="PayRoll Details"
                        detailType='payroll_details'
                        rows={payrollRows}
                        schema={payrollSchema}
                        data={data.filter(row => row.type === 'payroll_details')}
                        handleSubmit={this.handleSubmit}
                    />
                    <EmployeeDetailSection
                        headerTitle="Assets Details"
                        detailType='assets_details'
                        rows={assetsRows}
                        schema={assetsSchema}                    
                        data={data.filter(row => row.type === 'assets_details')}
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
                </div>
            
        )
    }
}

export default withStyles(styles)(EmployeeDetails)