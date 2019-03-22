import React from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: theme.spacing.unit * 2,
    }
});

class TabContainer extends React.Component {
    render(){
        const { classes, children } = this.props;

        return(
            <div className={classes.root}>
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(TabContainer);