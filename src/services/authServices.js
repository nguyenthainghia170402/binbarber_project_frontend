import * as request from '../utils/request';

export const login = async (data) => {
    try {
        const res = await request.postMethod('login', data);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};

export const register = async (data) => {
    try {
        const res = await request.postMethod('register', data);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};

export const logout = async () => {
    try {
        const res = await request.getMethod('logout');

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};

export const checkLogin = async () => {
    try {
        const res = await request.getMethod('customer');

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};
