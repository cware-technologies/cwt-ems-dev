import { alertConstants } from "../constants/alertConstants";

const success = (message) => ({
    type: alertConstants.SUCCESS,
    message,
});

const error = (error) => ({
    type: alertConstants.ERROR,
    message: error.message,
});

const clear = () => ({
    type: alertConstants.CLEAR,
});

export const alertActions = {
    success,
    error,
    clear,
};