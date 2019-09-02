import React from 'react'
import { getDate } from '../helpers/utils'

const ContractContent = ({ employee, publishDate, prevContractDate, prevContractExpiry, extendedDate, extendDate, extension }) => {
    const getExtendedDate = () => {
        let extendedDate = new Date(prevContractExpiry)
        extendedDate.setFullYear(prevContractExpiry.getFullYear() + extension)
        // await extendDate(extendedDate)
        return extendedDate
    }

    return (
    <pre>{`
Date: ${publishDate.toDateString()}
To: ${employee.full_name}

Subject: Extension of Employment offer/contract.

Dear ${employee.full_name},
    This refers to the Employment Offer extension letter Dated ${prevContractDate.toDateString()}
that you have signed with us which will expire on ${prevContractExpiry.toDateString()}
Your contract will be further extended for one year from ${prevContractExpiry.toDateString()} 
to ${extendedDate ? extendedDate.toDateString() : getExtendedDate().toDateString()}. If the contract is terminated for an illegal reason, 
the party that sustained damage due to termination shall be entitled to a 
compensation equivalent for one month of employee salary.

Thank you,

Truly yours,

HR Manager
${employee.organization.name}

                                    _____________________________

                                    I agree to the above.
                                    Signed electronically by ${employee.full_name}
                                    Capture Date: ${new Date().toDateString()}
                                    Capture Time: ${new Date().toTimeString().substring(0, 8)}
    `}</pre>
)
}

ContractContent.defaultProps = {
    // employee: {
    //     full_name: 'Sajeel Waien',
    //     organization: {
    //         name: 'Cware Technologies',
    //     }
    // },
    // publishDate: '22-07-2019',
    // prevContractDate: '22-07-2018',
    // prevContractExpiry: '22-07-2019',
    // extendedDate: '22-07-2020',
}

export default ContractContent