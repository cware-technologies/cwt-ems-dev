import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Modal from './Modal'

const styles = theme => ({
    readMore: {
        position: 'relative',
        padding: theme.spacing.unit,
        justifySelf: 'flex-start',
        display: 'block',
    },
})

class ModalTrigger extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalOpen: false,
        }
        console.log("DATAAAAA: ", this.props.data)
    }

    handleModalOpen = (e) => {
        this.setState({ modalOpen: true });
    };
    
    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };

    render(){
        const { classes, title } = this.props

        return(
            <React.Fragment>
                <Link
                    component="button"
                    variant="body2"
                    color='primary'
                    className={classes.readMore}
                    
                    onClick={this.handleModalOpen}
                >
                    {title}
                </Link>

                <Modal
                    modalOpen={this.state.modalOpen}
                    handleModalClose={this.handleModalClose}
                    data={this.props.data}
                />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ModalTrigger)