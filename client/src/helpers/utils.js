export const setAuthToken = (token) => {
    localStorage.setItem('loggedInUser', JSON.stringify(token))
    return
}

export const getAuthToken = () => {
    let user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : false
}