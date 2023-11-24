export default function getUser() {
    return localStorage.getItem('user');
}

export function getToken() {
    return localStorage.getItem('token');
}

export function setUser(user) {
    localStorage.setItem('user', user);
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeUser() {
    localStorage.removeItem('user');
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}