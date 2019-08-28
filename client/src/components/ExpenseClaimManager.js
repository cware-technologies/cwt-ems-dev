import React, { Component } from 'react'
import TabContainer from './TabContainer';
import Container from './MainContainer';
import ExpenseClaimNew from './ExpenseClaimNew';
import ExpenseClaimHistory from './ExpenseClaimHistory';

export default class ExpenseClaim extends Component {
    render() {
        return (
            <Container>
                <TabContainer
                    title="Expense Claim"
                    components={
                        [
                            { label: "New Expense Claim", component: <ExpenseClaimNew /> },
                            { label: "Expense Claim History", component: <ExpenseClaimHistory /> }
                        ]
                    }
                />
            </Container>
        )
    }
}