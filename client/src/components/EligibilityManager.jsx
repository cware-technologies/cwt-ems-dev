import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import Container from './MainContainer';
import TabContainer from './TabContainer';
import LoadingSpinner from './LoadingSpinner';
import { getUserOrganization } from '../reducers/authReducer';

import AttachEligibilities from './AttachEligibilities';

const Table = lazy(() => import('./FunctionalTable'))

export class EligibilityManager extends Component {
    render() {
        return (
            <Container>
                <TabContainer
                    title="Eligibilities Manager"
                    components={[
                        {
                            label: "Add",
                            component: <Suspense fallback={<LoadingSpinner/>}>
                                            <Table
                                                title='eligibility'
                                                endpoint='/admin/employee/eligibility'
                                                headers={[
                                                    { id: 'val', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Name' },
                                                ]}
                                                fields={[
                                                    { id: 'val', type:'text', label: 'Name' },
                                                ]}
                                                const schema = {{}}
                                                organization={this.props.organization}
                                                // selectEntity={this.selectEntity}
                                                // clearSelection={this.clearSelection}
                                            />
                                        </Suspense>
                        },
                        {
                            label: "Attach",
                            component: <AttachEligibilities />
                        }
                    ]}
                    
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    organization: getUserOrganization(state),
})

export default connect(mapStateToProps, {})(EligibilityManager)
