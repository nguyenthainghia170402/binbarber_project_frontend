import * as request from '../utils/request';

export const getBarberWorktime = async (id) => {
    try {
        const res = await request.getMethod(`worktime/${id}`);

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
