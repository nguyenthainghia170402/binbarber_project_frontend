import * as request from '../utils/request';

export const getListCusImages = async () => {
    try {
        const res = await request.getMethod('cusimages');

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};
