import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'

import TabContainer from './TabContainer';
import LoadingSpinner from './LoadingSpinner';
import AttachAssets from './AttachAssets';

import { getUserOrganization } from '../reducers/authReducer';

const Table = lazy(() => import('./FunctionalTable'))

export class AssetManager extends Component {
    render() {
        return (
            <TabContainer
                components={
                    {
                        "All Assets":  <Suspense fallback={<LoadingSpinner/>}>
                                            <Table
                                                title='assets'
                                                endpoint='/admin/employee/assets'
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
                                        </Suspense>,
                        "Attach Assets": <AttachAssets />

                    }
                }
            >
                <Suspense fallback={<LoadingSpinner/>}>
                    <Table
                        title='assets'
                        endpoint='/admin/employee/assets'
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
            </TabContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    organization: getUserOrganization(state),
})

export default connect(mapStateToProps, {})(AssetManager)
