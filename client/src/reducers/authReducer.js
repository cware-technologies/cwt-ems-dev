import { authConstants } from '../constants';
import { combineReducers } from 'redux'

let user = JSON.parse(localStorage.getItem('loggedInUser'))
const initialState = user ? { loggingIn: false, loggedIn: true, user} : {loggingIn: false, loggedIn: false, user: null}

const authentication = ( state = initialState, action ) => {
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
        case authConstants.VERIFY_REQUEST:
            return {
                loggingIn: true,
                loggedIn: false,
                user: action.user,
            }
        case authConstants.LOGIN_SUCCESS:
        case authConstants.VERIFY_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: true,
                user: action.user,
            }
        case authConstants.LOGIN_FAILURE:
        case authConstants.LOGOUT:
        case authConstants.VERIFY_FAILURE:
            return {
                loggingIn: false,
                loggedIn: false,
                user: null,
            }
        default:
            return state
    }
}

const views = ( state = [] , action ) => {
    switch(action.type){
        case authConstants.VIEWS_REQUEST:
            return []
        case authConstants.VIEWS_SUCCESS:
            console.log(action)
            let views = action.views.views

            return [
                ...views,
            ]
        case authConstants.VIEWS_FAILURE:
            return []
        default:
            return state
    }
}

export default combineReducers({
    authentication,
    views,
})

export const getViews = (state) => state.authReducer.views
export const getUser = (state) => state.authReducer.authentication.user.user_id
export const getUserInfo = (state) => state.authReducer.authentication.user
export const getUserOrganization = (state) => state.authReducer.authentication.user.organization
export const getLoggedIn = (state) => state.authReducer.authentication.loggedIn