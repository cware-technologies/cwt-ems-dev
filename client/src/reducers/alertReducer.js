import { alertConstants } from '../constants/alertConstants'

export default alert = (state = {}, action) => {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'success-alert',
                message: action.message,
            }
        case alertConstants.ERROR:
            return {
                type: 'error-alert',
                message: action.message,
            }
        case alertConstants.CLEAR:
            return {}
        default:
            return state

    }
}