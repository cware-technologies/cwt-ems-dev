import { authConstants } from '../constants/authConstants'
import { alertActions } from './alertActions'
import { authServices } from '../services'

const getViews = (responsibility) => async (dispatch) => {
    const request  = (responsibility) => ({ type: authConstants.VIEWS_REQUEST, responsibility })
    const success  = (views) => ({ type: authConstants.VIEWS_SUCCESS, views })
    const failure  = (err) => ({ type: authConstants.VIEWS_FAILURE, err })
    
    dispatch(request({ responsibility }))

    try{
        let views = await authServices.getViews(responsibility)
        dispatch(success(views))
        dispatch(alertActions.success("Views Loaded"))
    }
    catch(err) {
        dispatch(failure(err))
        dispatch(alertActions.error(err))
        
    }
    
    return
}

const login = (username, password) => async (dispatch) => {
    const request = (user) => ({ type: authConstants.LOGIN_REQUEST, user });
    const success = (user) => ({ type: authConstants.LOGIN_SUCCESS, user });
    const failure = (err) => ({ type: authConstants.LOGIN_FAILURE, err });

    dispatch(request({ username }));

    try {
        let user = await authServices.login(username, password);
        dispatch(success(user));

        try{
            let views = await getViews(user.responsibility)(dispatch)
            dispatch(alertActions.success("Login Successful"));
            window.location.href = `${user.redirectURL}`;
        }
        catch(err){
            dispatch(failure(err));
            dispatch(alertActions.error(err));
            dispatch(logout())
        }
    }
    catch (err) {
        dispatch(failure(err));
        dispatch(alertActions.error(err));
    }
}

const logout = () => dispatch => {
    authServices.logout();
    dispatch({
        type: authConstants.LOGOUT,
    });
    window.location.href = `/signin`
}

const verifyUser = (user) => async (dispatch) => {
    const request = (user) => ({ type: authConstants.VERIFY_REQUEST, user });
    const success = (user) => ({ type: authConstants.VERIFY_SUCCESS, user });
    const failure = (err) => ({ type: authConstants.VERIFY_FAILURE, err });

    dispatch(request({ user }));

    try {
        let response = await authServices.verifyUser(user);
        dispatch(success(user));
        
        dispatch(alertActions.success("User Verified"));
        // window.location.href = `${user.redirectURL}`;
    }
    catch (err) {
        dispatch(failure(err));
        dispatch(alertActions.error(err));
        dispatch(logout())
        // window.location.href = `${err.response.data.redirectURL}`;
    }
}


export const authActions = {
    login,
    logout,
    getViews,
    verifyUser,
};