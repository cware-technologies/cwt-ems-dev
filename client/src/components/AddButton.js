import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

const AddButton = () => {
    return(
        <Tooltip title="Add">
            <IconButton aria-label="Add">
                <AddIcon />
            </IconButton>
        </Tooltip>
    )
}

export default AddButton