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
    
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
})

const Modal = ({ modalOpen, handleModalClose, data, classes }) => {

    const getDate = (datetime) => {
        var t, result = null;

        if (typeof datetime === 'string') {
            t = datetime.slice(0, -5).split(/[- :T]/);

            //when t[3], t[4] and t[5] are missing they defaults to zero
            result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
        }

        return result
    }
    
    const parseData = () => {
        let keys = Object.keys(data);
        if(data.type === 'news' || data.type === 'announcements' || data.type === 'employee news'){
            var i = keys.indexOf('ATTRIB_01');
            keys[i] = 'body';
            i = keys.indexOf('ATTRIB_10');
            keys[i] = 'title';
            let [type, ...others] = keys
            return (
                <React.Fragment>
                    <Typography variant='title' align='center' color='textSecondary'>{data.ATTRIB_10}</Typography>
                    <Typography variant='body1' align='center' color='textPrimary'>{data.ATTRIB_01}</Typography>
                    <Typography variant="overline" component="p" align="right" color="textSecondary">{getDate(data.created).toDateString()}</Typography>
                </React.Fragment>
            )
        }
    }

    return (
        <MUIModal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classNames(classes.modal, classes.paper)}>
                {
                    parseData()
                }
            </div>
        </MUIModal>  
    )
}

export default withStyles(styles)(Modal)