import React, { Component } from 'react'

import Container from './MainContainer'
import AttributesManager from './AttributesManager'

const skillsRows = [
    { id: 'name', numeric: false, disablePadding: true, lengthRatio: 'Title', label: 'Skill' },
    { id: 'ATTRIB_12', numeric: false, disablePadding: true, lengthRatio:'Title', label: 'Proficiency'},
    { id: 'ATTRIB_03', disablePadding: true, lengthRatio:'Detail', label: 'Description'},
]

const skillsFields = [
    { id: 'name', type: 'text', label: 'Skill' },
    { id: 'ATTRIB_12', type: 'number', label: 'Proficiency', inputProps: { min: '1', max: '5', step: '1' }},
    { id: 'ATTRIB_03', type: 'text', label: 'Description'},
]

class SkillsPanel extends Component {
    render() {
        return (
            <Container>
                <AttributesManager
                    headerTitle={'Skills'}
                    rows={skillsRows}
                    fields={skillsFields}
                    endpoint='/private/employee/details/skills'
                />
            </Container>
        )
    }
}

export default SkillsPanel
