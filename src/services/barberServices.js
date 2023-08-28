import * as request from '../utils/request';

export const getListBarbers = async (data) => {
    try {
        const res = await request.getMethod('barbers', data);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};

export const addNewBarber = async (data) => {
    try {
        const res = await request.postMethod('barbers', data);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};
