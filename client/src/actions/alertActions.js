import { alertConstants } from "../constants/alertConstants";

const success = (message) => (dispatch, getState) => {
    let changed = getState().alertReducer.changed

    dispatch({
        type: alertConstants.SUCCESS,
        message,
        changed,
    })
}

const error = (error) => (dispatch, getState) => {
    let changed = getState().alertReducer.changed

    dispatch({
        type: alertConstants.ERROR,
        message: error.message,
        changed,
    })
}

const warning = (warning) => (dispatch, getState) => {
    let changed = getState().alertReducer.changed

    dispatch({
        type: alertConstants.WARNING,
        message: warning,
        changed,
    })
}

const clear = () => (dispatch, getState) => {
    dispatch({
        type: alertConstants.CLEAR,
    })
};

export const alertActions = {
    success,
    error,
    warning,
    clear,
};