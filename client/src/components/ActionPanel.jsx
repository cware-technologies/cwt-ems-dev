import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    actionPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})

class ActionPanel extends Component {
    render() {
        const { classes, children } = this.props

        return (
            <div className={classes.actionPanel}>
                { children }
            </div>
        )
    }
}

export default withStyles(styles)(ActionPanel)
