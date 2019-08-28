import React, { Component } from 'react'
import TabContainer from './TabContainer';
import Container from './MainContainer';
import HRDocsNew from './HRDocsNew';
import HRDocsHistory from './HRDocsHistory';

export default class HRDocs extends Component {
    render() {
        return (
            <Container>
                <TabContainer
                    title="HR Requests"
                    components={
                        [
                            { label: "New HR Request", component: <HRDocsNew /> },
                            { label: "HR Documents History", component: <HRDocsHistory /> },
                        ]
                    }
                />
            </Container>
        )
    }
}