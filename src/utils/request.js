import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

const request = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
    withCredentials: true,
    headers: {
        SameSite: 'None', // Thiết lập SameSite=None cho cookie
        Secure: true, // Thiết lập Secure cho cookie
        'X-CSRF-TOKEN': getCookie('access_token_cookie'),
    },
});

export const getMethod = async (path, options = {}) => {
    const response = await request.get(path, options);

    return response;
};

export const postMethod = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response;
};

export const putMethod = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response;
};

export const deleteMethod = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response;
};

export default request;
