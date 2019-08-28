import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'

import TabContainer from './TabContainer';
import LoadingSpinner from './LoadingSpinner';

import { getUserOrganization } from '../reducers/authReducer';
import Container from './MainContainer';

const Table = lazy(() => import('./FunctionalTable'))

export class ExpenseNatureManager extends Component {
    render() {
        return (
            <Container>
                <Suspense fallback={<LoadingSpinner />}>
                    <Table
                        title='Expense Nature'
                        endpoint='/admin/expense-nature'
                        headers={[
                            { id: 'val', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Type' },
                        ]}
                        fields={[
                            { id: 'val', type: 'text', label: 'Name' },
                        ]}
                        const schema={{}}
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

export default connect(mapStateToProps, {})(ExpenseNatureManager)