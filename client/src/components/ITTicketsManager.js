import React, { Component } from 'react'
import TabContainer from './TabContainer';
import Container from './MainContainer';
import ITTicketNew from './ITTicketNew';
import ITTicketHistory from './ITTicketHistory';
import ITTicketsRequests from './ITTicketsRequests';

export default class ITTickets extends Component {
    render() {
        console.log("ITTicketManager!!!!!!!!!!!!!!!!!!!!!")
        return (
            <Container>
                <TabContainer
                    title="IT TICKETS"
                    components={
                        [
                            { label: "New Ticket", component: <ITTicketNew /> },
                            { label: "Tickets History", component: <ITTicketHistory /> },
                            { label: "Tickets Requests", component: <ITTicketsRequests /> },
                        ]
                    }
                />
            </Container>
        )
    }
}