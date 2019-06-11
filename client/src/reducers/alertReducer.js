import { alertConstants } from '../constants/alertConstants'

export default alert = (state = {changed: 0}, action) => {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.message,
                changed: !action.changed,
            }
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.message,
                changed: !action.changed,
            }
        case alertConstants.INFO:
            return {
                type: 'info',
                message: action.message,
                changed: !action.changed,
            }
        case alertConstants.WARNING:
            return {
                type: 'warning',
                message: action.message,
                changed: !action.changed,
            }
        case alertConstants.CLEAR:
            return {}
        default:
            return state

    }
}

export const getAlert = (state) => state.alertReducer