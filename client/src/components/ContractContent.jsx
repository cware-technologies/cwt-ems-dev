import React from 'react'

const ContractContent = ({ employee, publishDate, prevContractDate, prevContractExpiry, extendedDate }) => (
    <pre>{`
Date: ${publishDate}
To: ${employee.full_name}

Subject: Extension of Employment offer/contract.

Dear ${employee.full_name},
    This refers to the Employment Offer extension letter Dated ${prevContractDate}
that you have signed with us which will expire on ${prevContractExpiry}
Your contract will be further extended for one year from ${prevContractExpiry} 
to ${extendedDate}. If the contract is terminated for an illegal reason, 
the party that sustained damage due to termination shall be entitled to a 
compensation equivalent for one month of employee salary.

Thank you,

Truly yours,

HR Manager
${employee.organization.name}

                                    _____________________________

                                    I agree to the above.
                                    Signed electronically by ${employee.full_name}
                                    Capture Date:
                                    Capture Time:
    `}</pre>
)

ContractContent.defaultProps = {
    employee: {
        full_name: 'Sajeel Waien',
        organization: {
            name: 'Cware Technologies',
        }
    },
    publishDate: '22-07-2019',
    prevContractDate: '22-07-2018',
    prevContractExpiry: '22-07-2019',
    extendedDate: '22-07-2020',
}

export default ContractContent