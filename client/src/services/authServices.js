import axios from 'axios'
import { addAuthHeaderAsBearerToken } from '../helpers/axiosConfig'
import { setAuthToken } from '../helpers/utils'

function login(username, password) {
    let user = {
        email: username,
        password: password,
    }

    return axios({
        method: 'post',
        url: '/auth/signin',
        data: user,
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(handleLoginResponse)
    .catch(err => handleLoginResponse(err.response))
}

async function getViews(responsibility){
    return axios({
        method: 'get',
        url: '/auth/resp-views',
        params: {
            resp_id: responsibility
        },
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(handleViewsResponse)
    .catch(err => handleViewsResponse(err.response))
}

function handleLoginResponse(res){
    let error = res.data.message;

    if (res.data.status >= 400) {
        throw error
    }

    else if (res.data.status >= 200 && res.data.status < 300) {
        setAuthToken({ token: res.data.token })
        addAuthHeaderAsBearerToken()
        return res.data
    }
}

function handleViewsResponse(res){
    let error = res.data.message;

    console.log("VIEWS RESPONSE: ", res)

    if (res.data.status >= 400) {
        throw error
    }

    else if (res.data.status >= 200 && res.data.status < 300) {
        // window.location.href = `${res.data.redirectURL}`;
        return res.data
    }
}

export const authServices = {
    login,
    getViews,
}