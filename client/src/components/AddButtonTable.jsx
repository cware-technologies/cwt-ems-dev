import React from 'react';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RestrictedComponent from './RestrictedComponent';

import ModalTrigger from './ModalTrigger';

const AddButtonTable = (props) => {
    let modalRef = React.createRef()

    const handleModalTrigger = () => {
        modalRef.handleModalOpen()
    }

    return (
        <RestrictedComponent
            restriction={props.restriction}
            viewID={props.location.state.viewID}
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
                innerRef={node => modalRef = node}
                disabled={props.editMode}
                onClose={props.unsetEditMode}
            >
                {props.children}
            </ModalTrigger>
        </RestrictedComponent>
    )
}

export default AddButtonTable