import React, { Component } from 'react'

import Container from './MainContainer'
import AttributesManager from './AttributesManager'

const certificationsRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Type' },
    { id: 'ATTRIB_01', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Title' },
    { id: 'ATTRIB_02', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Institute/Organization'},
    { id: 'ATTRIB_18', date: true, disablePadding: true, lengthRatio:'Title', label: 'From'},
    { id: 'ATTRIB_19', date: true, disablePadding: true, lengthRatio:'Title', label: 'To'},
]

const certificationsFields = [
    { id: 'name', type:'select', selectOptions: [
        {value:'Matriculation', name:'Matriculation'},
        {value:'Intermediate', name:'Intermediate'},
        {value:'Associate', name:'Associate'},
        {value:'Bachelors', name:'Bachelors'},
        {value:'Masters', name:'Masters'},
        {value:'Doctorate', name:'Doctorate'},
    ], label: 'Type' },
    { id: 'ATTRIB_01', type: 'text', label: 'Title' },
    { id: 'ATTRIB_02', type: 'text', label: 'Institute/Organization'},
    { id: 'ATTRIB_18', type: 'date', label: 'From'},
    { id: 'ATTRIB_19', type: 'date', label: 'To'},
]

class CertificationsPanel extends Component {
    render() {
        return (
            <Container>
                <AttributesManager
                    headerTitle={'Certifications'}
                    rows={certificationsRows}
                    fields={certificationsFields}
                    endpoint='/private/employee/details/certifications'
                />
            </Container>
        )
    }
}

export default CertificationsPanel
