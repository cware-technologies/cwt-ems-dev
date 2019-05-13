import React from 'react'
import Container from './MainContainer'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    actionBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    modal: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
})

class Checklist extends React.Component{
    render(){
        let { classes, data, handleToggle, updateHandler } = this.props
        console.log(data)
        return(
            <React.Fragment>
                <div></div>
                <List className={classes.root}>
                    {data.map(row => (
                            <ListItem key={row.row_id} role={undefined} dense >
                                <ListItemText primary={row.name} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        id="check"
                                        checked={row.FLG_01}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={(e) => handleToggle(e, row.row_id)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                    ))}
                </List>
                <Button variant='outlined' onClick={updateHandler}>Update</Button>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Checklist)