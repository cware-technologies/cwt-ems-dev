import React from 'react'
import axios from 'axios'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { withStyles } from '@material-ui/core/styles'
import EmployeeDetailSection from './EmployeeDetailSection'
import { getUser } from '../reducers/authReducer';
import Container from './MainContainer';

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
        let emp_id = this.props.userID.row_id

        try{
            response = await axios({
                method: 'get',
                url: '/private/employee/details',
                params: {
                    employee: this.props.userID,
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
                    emp_id: this.props.userID,
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
        let { classes, userID } = this.props
        let { data } = this.state

        return(
            userID &&
                <Container>
                    <EmployeeDetailSection
                        headerTitle="Contact Details"
                        detailType='contact_details'
                        rows={contactRows}
                        schema={contactSchema}
                        data={data.filter(row => row.type === 'contact_details')}
                        handleSubmit={this.handleSubmit}
                        defaultExpanded
                        expanded
                    />
                    <EmployeeDetailSection
                        headerTitle="Other Details"
                        detailType='other_details'
                        rows={otherRows}
                        schema={otherSchema}
                        data={data.filter(row => row.type === 'other_details')}
                        handleSubmit={this.handleSubmit}
                        defaultExpanded
                        expanded
                    />
                </Container>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userID: getUser(state)
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {}),
)(EmployeeDetails)