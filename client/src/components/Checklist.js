import React from 'react'
import Container from './MainContainer'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

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

    state = {
        filter: 'all',
    }

    handleFilterChange = (e) => {
        let value = e.target.value

        this.setState(prevState => ({
            filter: value,
        }))
    }

    filterData = (data) => {
        if(this.state.filter === 'all')
            return data

        return data.filter(row => row.type === this.state.filter)
    }

    render(){
        let { classes, data, handleToggle, updateHandler, filterOptions } = this.props
        console.log(data)
        return(
            <React.Fragment>
                <div></div>
                <List className={classes.root}>
                    <TextField
                        id='filter-list'
                        select
                        label='Filter'
                        value={this.state.filter}
                        disabled={filterOptions.length === 0 ? true : false}
                        defaultValue=''
                        onChange={this.handleFilterChange}
                        SelectProps={{
                            native: true,
                        }}
                        margin="dense"
                        variant="outlined"
                    >
                        <option value={'all'}>
                            {'All'}
                        </option>
                        {filterOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                    {this.filterData(data).map(row => (
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
                <Button variant='outlined' onClick={updateHandler} disabled={!this.props.active}>Update</Button>
            </React.Fragment>
        )
    }
}

Checklist.defaultProps = {
    filterOptions: []
}

export default withStyles(styles)(Checklist)