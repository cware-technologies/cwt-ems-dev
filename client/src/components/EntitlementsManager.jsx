import React, { Component, lazy, Suspense } from 'react'

import TabContainer from './TabContainer';
import Entitlements from './Entitlements';
import AttachEntitlements from './AttachEntitlements';
import Container from './MainContainer';

export class EntitlementsManager extends Component {
    render() {
        return (
            <Container>
                <TabContainer
                    title="Entitlements Manager"
                    components={
                        [
                            {
                                label: "Add",
                                component: <Entitlements />
                            },
                            {
                                label: "Attach",
                                component: <AttachEntitlements />,
                            }
                        ]
                    }
                />
            </Container>
        )
    }
}

export default EntitlementsManager
