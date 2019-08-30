import React from 'react';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RestrictedComponent from './RestrictedComponent';

import ModalTrigger from './ModalTrigger';

class AddButtonTable extends React.Component {
    modalRef = React.createRef()

    handleModalOpen = () => {
        this.modalRef.handleModalOpen()
    }

    render(){
        let props = this.props

        return (
            <RestrictedComponent
                restriction={props.restriction}
            >
                <ModalTrigger
                    IconButton={
                        <Tooltip title="Add">
                            <IconButton aria-label="Add">
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    button
                    innerRef={node => this.modalRef = node}
                    disabled={props.editMode}
                    onClose={props.unsetEditMode}
                >
                    {props.children}
                </ModalTrigger>
            </RestrictedComponent>
        )
    }
    
}

export default AddButtonTable