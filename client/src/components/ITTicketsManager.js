import React, { Component } from 'react'
import TabContainer from './TabContainer';
import Container from './MainContainer';
import ITTicketNew from './ITTicketNew';
import ITTicketHistory from './ITTicketHistory';

export default class ITTickets extends Component {
    render() {
        return (
            <Container>
                <TabContainer
                    title="IT TICKETS"
                    components={
                        [
                            { label: "New Ticket", component: <ITTicketNew /> },
                            { label: "Tickets History", component: <ITTicketHistory /> }
                        ]
                    }
                />
            </Container>
        )
    }
}