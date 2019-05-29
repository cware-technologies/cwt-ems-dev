import React from 'react'
import { ReactComponent as LoadingIcon } from '../assets/loading.svg'

class LoadingSpinner extends React.Component{

    render() {
        return(
            <div style={{height: '100%', width: 'auto', position: "fixed", top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <LoadingIcon />
            </div>
        )
    }
}

export default LoadingSpinner