import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Modal from './Modal'
import { Button } from '@material-ui/core';

const styles = theme => ({
    readMore: {
        position: 'relative',
        //padding: theme.spacing.unit,
        justifySelf: 'flex-start',
        display: 'block',
        height: 40,
    },
})

class ModalTrigger extends React.Component {
    state = {
        modalOpen: false,
    }
    
    handleModalOpen = (e) => {
        this.setState({ modalOpen: true });
    };
    
    handleModalClose = () => {
        this.setState({ modalOpen: false }, () => this.props.onClose && this.props.onClose());
    };

    render(){
        const { classes, title, children, button, disabled } = this.props

        return(
            <React.Fragment>
                <Button
                    component="button"
                    variant={button ? "outlined" : "text"}
                    color='primary'
                    className={classes.readMore}
                    onClick={this.handleModalOpen}
                    disabled={disabled ? true : false}
                >
                    {title}
                </Button>

                <Modal
                    modalOpen={this.state.modalOpen}
                    handleModalClose={this.handleModalClose}
                    data={this.props.data}
                >
                    { children }
                </Modal>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ModalTrigger)