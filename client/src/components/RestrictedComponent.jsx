import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getViews } from '../reducers/authReducer';

class RestrictedComponent extends Component {
    findViewByPermission = (permission) => {
        let views = this.props.views
        let viewID = this.props.viewID
        console.log("views: ", this.props.views)
        let found = views.filter(view => view.row_id == viewID && view[permission])
        return found.length > 0
    }

    render() {
        const { children } = this.props
        console.log(children)
        return (
            this.findViewByPermission('write') ? 
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