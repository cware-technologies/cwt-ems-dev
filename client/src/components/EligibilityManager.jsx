import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'

import Container from './MainContainer';
import LoadingSpinner from './LoadingSpinner';
import { getUserOrganization } from '../reducers/authReducer';

const Table = lazy(() => import('./FunctionalTable'))

export class EligibilityManager extends Component {
    render() {
        return (
            <Container>
                <Suspense fallback={<LoadingSpinner/>}>
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
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    organization: getUserOrganization(state),
})

export default connect(mapStateToProps, {})(EligibilityManager)
