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

const contactRows = [
    { label: 'Cell Phone', title: 'Cell Phone', id: 'ATTRIB_01', type: 'text'},
    { label: 'Telephone', title: 'Telephone', id: 'ATTRIB_01', type: 'text'},
    { label: 'Email Id', title: 'Email Id', id: 'ATTRIB_01', type: 'text'},
    { label: 'Postal Address', title: 'Postal Address', id: 'ATTRIB_01', type: 'textarea'},
    { label: 'Permanent Address', title: 'Permanent Address', id: 'ATTRIB_01', type: 'textarea'},
    { label: 'Emergency Contact', title: 'Emergency Contact', id: 'ATTRIB_01', type: 'text'},
    { label: 'Next of Kin Name', title: 'Next of Kin Name', id: 'ATTRIB_01', type: 'text'},
    { label: 'Next of Kin Phone', title: 'Next of Kin Phone', id: 'ATTRIB_01', type: 'text'},
    { label: 'Next of Kin Address', title: 'Next of Kin Address', id: 'ATTRIB_01', type: 'textarea'},
]

const contactSchema = yup.object().shape({
    
});

const otherRows = [
    { label: 'Gender', title: 'Gender', id: 'ATTRIB_01', type: 'select', selectOptions: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}]},
    { label: 'Marital Status', title: 'Marital Status', id: 'ATTRIB_01', type: 'select', selectOptions: [{label: 'Single', value: 'single'}, {label: 'Married', value: 'married'}, {label: 'Divorced', value: 'divorced'}]},
    { label: 'Children', title: 'Children', id: 'ATTRIB_01', type: 'select', selectOptions: [{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]},
    { label: 'Date of Joining', title: 'Date of Joining', id: 'ATTRIB_01'},
]

const otherSchema = yup.object().shape({
    
});

class EmployeeDetails extends React.PureComponent{
    state = {
        selected: null,
        data: [],
    }

    async componentDidMount(prevProps, prevState){
        this.getEmployeeDetails()
    }

    getEmployeeDetails = async () => {
        let response
        let emp_id = this.props.object.row_id

        try{
            response = await axios({
                method: 'get',
                url: '/private/employee/details',
                params: {
                    employee: this.props.object,
                },
            })
            
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
                    emp_id: this.props.object,
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

        }
        catch(err){
        }
    }

    render(){
        let { classes, object } = this.props
        let { data } = this.state

        return(
            object &&
                <div className={classes.container}>
                    <EmployeeDetailSection
                        headerTitle="Contact Details"
                        detailType='contact_details'
                        rows={contactRows}
                        schema={contactSchema}
                        data={data.filter(row => row.type === 'contact_details')}
                        handleSubmit={this.handleSubmit}
                    />
                    <EmployeeDetailSection
                        headerTitle="Other Details"
                        detailType='other_details'
                        rows={otherRows}
                        schema={otherSchema}
                        data={data.filter(row => row.type === 'other_details')}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            
        )
    }
}

export default withStyles(styles)(EmployeeDetails)