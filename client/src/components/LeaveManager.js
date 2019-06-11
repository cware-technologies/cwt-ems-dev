import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SvgIcon from '@material-ui/core/SvgIcon';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AllIcon from '@material-ui/icons/AllInclusive';
import PendingIcon from '@material-ui/icons/HourglassEmpty';
import DoubleTickIcon from '@material-ui/icons/DoneAll';
import HistoryIcon from '@material-ui/icons/History'
import TabContainer from './TabContainer';
import LeavesList from './LeavesList';
import Container from './MainContainer';
import DataTable from './DataTable';
import { getUser } from '../reducers/authReducer';

const styles = theme => ({
    root: {
        flexGrow: 1,
        // display: 'flex',
        // alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        
    },
    appBarSpacer: theme.mixins.toolbar,
    tabs: {
        backgroundColor: theme.palette.secondary.light,
        color: 'white',
    },
    tabLabel: {
        color: 'white',
    }
});

const leaveRows = [
    // { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
    { id: 'ATTRIB_01', numeric: false, disablePadding: true, lengthRatio: 'Detail', label: 'Detail' },
    { id: 'strt_dt', date: true, numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Start Date' },
    { id: 'end_dt', date: true, numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'End Date' },
    { id: 'type_cd', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Type' },
    { id: 'stat_cd', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Status' },
]

const leaveFields = [
    { id: 'detail', type: 'text', label: 'Entitlement', selectOptions: [{ value: 'induction_checklist', name: 'Induction' }, { value: 'exit_checklist', name: 'Exit' }] },
    { id: 'application', type: 'select', label: 'Entitlement', selectOptions: [{ value: 'induction_checklist', name: 'Induction' }, { value: 'exit_checklist', name: 'Exit' }] },
    { id: 'application', type: 'select', label: 'Entitlement', selectOptions: [{ value: 'induction_checklist', name: 'Induction' }, { value: 'exit_checklist', name: 'Exit' }] },
    { id: 'application', type: 'select', label: 'Entitlement', selectOptions: [{ value: 'induction_checklist', name: 'Induction' }, { value: 'exit_checklist', name: 'Exit' }] },
]

class LeaveManager extends React.Component {
    state = {
        value: 0,
        data: [],
    };

    async componentDidMount(){
        this.getLeaves()
    }

    getLeaves = async () => {
        let response

        try{
            let response = await axios({
                method: 'get',
                url: '/private/employee/leaves',
                params: {
                    employee: this.props.employee,
                }
            })

            console.log("Leave RESPONSE: ", response)

            if(response.data.status < 400){
                this.setState(prevProps => ({
                    data: response.data.data,
                }))
            }
        }
        catch(err){

        }
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value, data } = this.state;

        return (
            // <Container>
            //      <ModalTrigger
            //         title="Add"
            //         button
            //         innerRef={node => this.modalRef = node}
            //         disabled={editMode}
            //     >
            //         <AddEditForm
            //             headerTitle="LeaveTypes"
            //             fields={formFields}
            //             object={formData}
            //             handleChange={this.handleChange}
            //             handleSubmit={this.handleSubmit}
            //             editMode={editMode}
            //         />
            //     </ModalTrigger>
            //     <Paper square className={classes.root}>
            //         <Tabs
            //             value={this.state.value}
            //             onChange={this.handleTabChange}
            //             variant="fullWidth"
            //             indicatorColor="primary"
            //             textColor="primary"
            //             classes={{
            //                 root: classes.tabs,
            //             }}
            //         >
            //             <Tab icon={<AllIcon />} label="All" classes={{ labelIcon: classes.tabLabel, }} />
            //             {/* <Tab icon={<PendingIcon />} label="Pending" classes={{ labelIcon: classes.tabLabel, }} /> */}
            //             <Tab icon={<HistoryIcon />} label="Availed" classes={{ labelIcon: classes.tabLabel, }} />
            //             {/* <Tab icon={<DoubleTickIcon />} label="Approved" classes={{ labelIcon: classes.tabLabel, }} /> */}
            //         </Tabs>
            //         <TabContainer>
            //             {value === 0 && 
            //                 <DataTable
            //                     headerTitle="Leaves"
            //                     rows={leaveRows}
            //                     endpoint='admin/employee/entitlements'
            //                     data={data}   
            //                 />
            //             }
            //             {value === 1 && <div>Item Two</div>}
            //             {value === 2 && <div>Item Three</div>}
            //             {value === 3 && <div>Item Four</div>}
            //             {value === 4 && <div>Item Five</div>}
            //         </TabContainer>
            //     </Paper>
            // </Container>
            null
        );
    }
}

LeaveManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return{
        employee: getUser(state),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {})
)(LeaveManager);