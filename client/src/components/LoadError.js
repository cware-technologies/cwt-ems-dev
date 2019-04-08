import React from 'react'

class LoadingError extends React.Component{

    render() {
        return(
            <div style={{height: '100%', width: 'auto'}}>
                <h4 style={{ textAlign: 'center' }}>Unable To Load</h4>
            </div>
        )
    }
}

export default LoadingError