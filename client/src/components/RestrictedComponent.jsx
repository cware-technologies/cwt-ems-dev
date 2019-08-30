import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getViews } from '../reducers/authReducer';

class RestrictedComponent extends Component {
    findViewByPermission = (permission) => {
        let views = this.props.views
        let temp = this.props.match.path.split('/')
        let location = temp[temp.length - 1]
        console.log("LOCATION: ", location, "  ", permission)
        let found = views.filter(view => view.ATTRIB_01 == location && view[permission])
        console.log("ALLOWED: ", found, "  ", found.length > 0)
        return found.length > 0
    }

    render() {
        const { children } = this.props
        console.log(children)
        return (
            this.findViewByPermission(this.props.restriction) ? 
                children
            :
                null
        )
    }
}

const mapStateToProps = (state) => ({
    views: getViews(state)
})

export default connect(mapStateToProps, {})(withRouter(RestrictedComponent))