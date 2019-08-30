import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getViews } from '../reducers/authReducer';

class RestrictedComponent extends Component {
    findViewByPermission = (permission) => {
        let views = this.props.views
        let viewID = this.props.viewID
        console.log("views: ", this.props.viewID, "  ", permission)
        let found = views.filter(view => view.row_id == viewID && view[permission])
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

export default connect(mapStateToProps, {})(RestrictedComponent)