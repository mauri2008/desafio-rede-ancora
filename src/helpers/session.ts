const keys = {
    token: '@spotify:token',
    user: '@spotify:user',
}


export function setSession(key:'token'|'user', token: string) {

    if(!key) throw new Error('Key is required');

    sessionStorage.setItem(keys[key], token);
}

export function getSession(key:'token'|'user') {

    if(!key) throw new Error('Key is required');

    return sessionStorage.getItem(keys[key]);
}