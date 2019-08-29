import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getViews } from '../reducers/authReducer';

const RestrictedHOC = (Component) => {
    class NewComponent extends Component{
        constructor(props){
            super(props)
        }

        findViewByPermission = (permission) => {
            let views = this.props.views
            let temp = this.props.match.path.split('/')
            let location = temp[temp.length - 1]
            console.log("LOCATION: ", location, "  ", permission)
            let found = views.filter(view => view.ATTRIB_01 == location && view[permission])
            console.log("ALLOWED: ", found, "  ", found.length > 0)
            return found.length > 0
        }

        render(){
            return (
                <Component
                    writePermission={this.findViewByPermission('write')}
                    readPermission={this.findViewByPermission('readOnly')}
                    {...this.props}
                />
            )
        }
    }

    const mapStateToProps = (state) => ({
        views: getViews(state)
    })
    
    return connect(mapStateToProps, null)(withRouter(NewComponent))
}



export default RestrictedHOC
