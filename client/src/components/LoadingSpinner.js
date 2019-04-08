import React from 'react'
import LoadingIcon from '@material-ui/icons/Replay'

class LoadingSpinner extends React.Component{

    render() {
        return(
            <div style={{height: '100%', width: 'auto'}}>
                <LoadingIcon />
            </div>
        )
    }
}

export default LoadingSpinner