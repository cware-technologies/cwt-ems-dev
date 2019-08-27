import React from 'react';
import PropTypes from 'prop-types';
import TabContainer from './TabContainer';
import Container from './MainContainer';
import LeaveRequest from './LeaveRequest';
import LeaveHistory from './LeaveHistory';
import LeaveEnitlements from './LeaveEntitlements'
import LeaveEmployeeRequests from './LeaveEmployeeRequests'

class LeaveManager extends React.Component {
    state = {
        isFetching: true,
        success: null,
    };

    render() {
        return (
            <Container>
                <TabContainer
                    title="Leave Manager"
                    components={
                        [
                            { label: "Request", component: <LeaveRequest /> },
                            { label: "History", component: <LeaveHistory /> },
                            { label: "Entitlements", component: <LeaveEnitlements /> },
                            { label: "Employee Requests", component: <LeaveEmployeeRequests /> },
                        ]
                    }
                />
            </Container>
        );
    }
}

LeaveManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default LeaveManager