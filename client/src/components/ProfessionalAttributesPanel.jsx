import React, { Component } from 'react'

import Container from './MainContainer'
import AttributesManager from './AttributesManager'

const profAttributesRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Professional Attribute' },
    { id: 'ATTRIB_12', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Proficiency'},
    { id: 'ATTRIB_03', disablePadding: true, lengthRatio:'Detail', label: 'Description'},
]

const profAttributesFields = [
    { id: 'name', type: 'text', label: 'Professional Attribute' },
    { id: 'ATTRIB_12', type: 'number', label: 'Proficiency', inputProps: { min: '1', max: '5', step: '1' }},
    { id: 'ATTRIB_03', type: 'text', label: 'Description'},
]

class ProfessionalAttributesPanel extends Component {
    render() {
        return (
            <Container>
                <AttributesManager
                    headerTitle={'Professional Attributes'}
                    rows={profAttributesRows}
                    fields={profAttributesFields}
                    endpoint='/private/employee/details/professionalAttributes'
                />
            </Container>
        )
    }
}

export default ProfessionalAttributesPanel
