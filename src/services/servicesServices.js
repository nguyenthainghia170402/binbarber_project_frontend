import * as request from '../utils/request';

export const getListServices = async () => {
    try {
        const res = await request.getMethod('services');

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};
