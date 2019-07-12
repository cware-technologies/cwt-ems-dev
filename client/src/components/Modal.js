import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MUIModal from '@material-ui/core/Modal'

const styles = theme => ({
    modal: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    modalStyle: {
        overflow: 'visible',
    },
    paper: {
        position: 'relative',
        width: '80vw',
        height: '70vh',
        maxHeight: '100vh',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    topBar: {
        position: 'relative',
        height: 50,
        borderBottom: '1px solid gray',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50,
        opacity: '0.3',
        zIndex: 5,
        '&:hover': {
            opacity: 1,
        },
        '&:after': {
            position: 'absolute',
            left: '50%',
            top: '50%',
            content: '" "',
            height: '33px',
            width: '2px',
            backgroundColor: '#333',
            transform: 'translateY(-50%) rotate(45deg)',
        },
        '&:before': {
            position: 'absolute',
            left: '50%',
            top: '50%',
            content: '" "',
            height: '33px',
            width: '2px',
            backgroundColor: '#333',
            transform: 'translateY(-50%) rotate(-45deg)',
        },
    },
})

const Modal = ({ modalOpen, handleModalClose, data, classes, children }) => {

    const getDate = (datetime) => {
        var t, result = null;

        if (typeof datetime === 'string') {
            t = datetime.slice(0, -5).split(/[- :T]/);

            //when t[3], t[4] and t[5] are missing they defaults to zero
            result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
        }

        return result
    }

    return (
        <MUIModal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modalStyle}
        >
            <div className={classNames(classes.modal, classes.paper)}>
                <div className={classes.topBar}>
                    <div className={classes.closeButton} onClick={handleModalClose}></div>
                </div>
                { children }
            </div>
        </MUIModal>  
    )
}

export default withStyles(styles)(Modal)