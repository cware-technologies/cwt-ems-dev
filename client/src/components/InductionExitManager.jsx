import React, { Component, lazy, Suspense } from 'react'

import TabContainer from './TabContainer';
import InductionChecklist from './InductionChecklist';
import EmployeeInductionExit from './EmployeeInductionExit';

import Container from './MainContainer';

export class InductionExitManager extends Component {
    render() {
        return (
            <Container>
                <TabContainer
                    title="Assets Manager"
                    components={
                        [
                            {
                                label: "Add",
                                component: <InductionChecklist />,
                            },
                            {
                                label: "Apply",
                                component: <EmployeeInductionExit />,
                            }
                        ]
                    }
                />
            </Container>
        )
    }
}

export default InductionExitManager
