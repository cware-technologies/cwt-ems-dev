import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { getUser } from '../reducers/authReducer';
import Container from './MainContainer'
import HierarchyChart from './HierarchyChart'
import ProfilePic from '../assets/profile-pic.jpg'
import { Typography } from '@material-ui/core';
import generateChart from '../helpers/generateChart';
import EmployeeBadge from './EmployeeBadge';
import ProfileDetails from './ProfileDetails';
import AttributesManager from './AttributesManager';
import EmployeeDetailSection from './EmployeeDetailSection'

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr auto 500px',
        gridTemplateAreas: '"header" "info" "chain"',
        rowGap: '20px',
    },
    infoContainer: {
        gridArea: 'info',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridTemplateRows: 'auto',
        gridAutoRows: '50px',
        gridAutoFlow: 'row',
    },
    infoAttribute: {
        backgroundColor: theme.palette.secondary.dark,
        borderBottom: `3px solid ${theme.palette.secondary.light}`,
        padding: theme.spacing.unit * 2,
    },
    infoValue: {
        backgroundColor: theme.palette.secondary.light,
        borderBottom: `3px solid ${theme.palette.secondary.dark}`,
        padding: theme.spacing.unit * 2,
    },
    chainContainer: {
        gridArea: 'chain',
        height: '100%',
        width: '100%',
        border: `2px solid ${theme.palette.secondary.light}`
    },
    chainHeader: {
        borderBottom: `2px solid ${theme.palette.secondary.light}`,
    }
})

const personalRows = [
    { label: 'ATTRIB_01', title: 'CNIC', id: 'ATTRIB_01', type: 'text'},
    { label: 'ATTRIB_18', title: 'Date Of Birth', id: 'ATTRIB_18', type: 'date'},
    { label: 'created', title: 'Date Of Joining', id: 'created', type: 'date', disabled: true },
]

const personalSchema = [

]

const certificationsRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Type' },
    { id: 'ATTRIB_01', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Title' },
    { id: 'ATTRIB_02', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Institute/Organization'},
    { id: 'ATTRIB_18', date: true, disablePadding: true, lengthRatio:'Title', label: 'From'},
    { id: 'ATTRIB_19', date: true, disablePadding: true, lengthRatio:'Title', label: 'To'},
]

const certificationsFields = [
    { id: 'name', type:'select', selectOptions: [
        {value:'Matriculation', name:'Matriculation'},
        {value:'Intermediate', name:'Intermediate'},
        {value:'Associate', name:'Associate'},
        {value:'Bachelors', name:'Bachelors'},
        {value:'Masters', name:'Masters'},
        {value:'Doctorate', name:'Doctorate'},
    ], label: 'Type' },
    { id: 'ATTRIB_01', type: 'text', label: 'Title' },
    { id: 'ATTRIB_02', type: 'text', label: 'Institute/Organization'},
    { id: 'ATTRIB_18', type: 'date', label: 'From'},
    { id: 'ATTRIB_19', type: 'date', label: 'To'},
]

const skillsRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Skill' },
    { id: 'ATTRIB_11', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Proficiency'},
    { id: 'ATTRIB_03', disablePadding: true, lengthRatio:'Detail', label: 'Description'},
]

const skillsFields = [
    { id: 'name', type: 'text', label: 'Skill' },
    { id: 'ATTRIB_11', type: 'number', label: 'Proficiency'},
    { id: 'ATTRIB_03', type: 'text', label: 'Description'},
]

const profAttributesRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Professional Attribute' },
    { id: 'ATTRIB_11', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Proficiency'},
    { id: 'ATTRIB_03', disablePadding: true, lengthRatio:'Detail', label: 'Description'},
]

const profAttributesFields = [
    { id: 'name', type: 'text', label: 'Professional Attribute' },
    { id: 'ATTRIB_11', type: 'number', label: 'Proficiency'},
    { id: 'ATTRIB_03', type: 'text', label: 'Description'},
]

const fields = [
    {
        attribute: 'Department',
        value: 'Nights Watch',
    },
    {
        attribute: 'Location',
        value: 'Castle Black',
    },
    {
        attribute: 'Manager',
        value: 'Mormont',
    },
    {
        attribute: 'Email',
        value: 'jon_snow@westeros.com',
    },
    {
        attribute: 'Mobile',
        value: '090078601',
    },
]

const hierarchy = {
    "name": "Ousaid Imtiaz",
    "position": "CEO",
    "children": [
        {
            "name": "Sajeel Waien",
            "position": "Manager",
            "children": [
                {
                    "name": "Ehsan Ul Hassan",
                    "position": "Peon",
                },
    //             {
    //                 "name": "Mariam Amin",
    //                 "value": 300
    //             },
    //             {
    //                 "name": "Suleman Ishtiaq",
    //                 "value": 200
    //             }
            ]
        },
    //     {
    //         "name": "Jeff Bezos",
    //         "value": 200
    //     }
    ]
}

class Profile extends React.Component {
    state = {
        chainLoaded: false,
        data: []
    }

    componentDidMount() {
        // generateChart(hierarchy);
        // this.setState(prevState => ({
        //     chainLoaded: true,
        // }))
        this.getData()
    }

    getData = async () => {

        axios.all([this.getUserData(), this.getHierarchy()])
            .then(axios.spread((user, hierarchy) => {
                console.log(user, hierarchy)
                this.setState(prevState => ({
                    data: user.data.result,
                    hierarchy: hierarchy.data.result,
                }))
            }));
        
    }

    getHierarchy = () => {
        return axios({
            method: 'get',
            url: '/public/employee/hierarchy',
            params: {
                employee: 2,
            },
        })
    }

    getUserData = () => {
        return axios({
            method: 'get',
            url: '/private/employee',
            params: {
                employee: this.props.user_id,
            },
        })
    }

    handleSubmit = async (values, { setSubmitting }, detailType) => {
        let response

        try{
            response = await axios({
                method: 'put',
                url: '/private/employee/personal-details',
                data: {
                    details: values,
                },
            })

            setSubmitting(false);
            this.setState(prevState => ({
                data: values,
            }))

        }
        catch(err){
        }
    }

    render() {
        let { classes, user_id } = this.props
        let { data } = this.state

        return (
            <Container _className={classes.container}>
                <EmployeeBadge
                    data={data}
                />
                <EmployeeDetailSection
                    headerTitle="Personal Details"
                    detailType='personal_details'
                    rows={personalRows}
                    schema={personalSchema}
                    data={data}
                    handleSubmit={this.handleSubmit}
                    defaultExpanded
                    expanded
                />
                {/* <div className={classes.infoContainer}>
                    {fields.map(item => {
                        return (
                            <React.Fragment>
                                <Typography variant="body2" component="h5" color='secondary' className={classes.infoAttribute}>{item.attribute}</Typography>
                                <Typography variant="body2" component="h6" color='default' className={classes.infoValue}>{item.value}</Typography>
                            </React.Fragment>
                        )
                    })}
                </div> */}
                <div className={classes.chainContainer}>
                    <Typography className={classes.chainHeader} variant='headline' component='h1' color='secondary'>
                        Reporting Chain
                    </Typography>
                    <HierarchyChart 
                        data={hierarchy}
                    />
                </div>
                <ProfileDetails
                    object={user_id}
                />
                <AttributesManager
                    headerTitle={'Certifications'}
                    rows={certificationsRows}
                    fields={certificationsFields}
                    endpoint='/private/employee/details/certifications'
                />
                <AttributesManager
                    headerTitle={'Skills'}
                    rows={skillsRows}
                    fields={skillsFields}
                    endpoint='/private/employee/details/skills'
                />
                <AttributesManager
                    headerTitle={'Professional Attributes'}
                    rows={profAttributesRows}
                    fields={profAttributesFields}
                    endpoint='/private/employee/details/professionalAttributes'
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_id: getUser(state)
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {}),
)(Profile)