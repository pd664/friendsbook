export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(user))
}

export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

export const getUser = () => {
    const user = sessionStorage.getItem('user')
    return JSON.parse(user) || null;
}

export const clearToken = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user'); 
}