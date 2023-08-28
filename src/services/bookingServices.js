import * as request from '../utils/request';

export const getListBooking = async () => {
    try {
        const res = await request.getMethod('admin/booking');
        // console.log(res, 'try');
        return res;
    } catch (error) {
        // console.log(error, 'err');
        return error.response;
    }
};

export const getListBookingByCusID = async (id) => {
    try {
        const res = await request.getMethod(`bookings/${id}`);
        // console.log(res, 'try');
        return res;
    } catch (error) {
        // console.log(error, 'err');
        return error.response;
    }
};

export const getBookingByID = async (id) => {
    try {
        const res = await request.getMethod(`booking/${id}`);
        // console.log(res, 'try');
        return res;
    } catch (error) {
        // console.log(error, 'err');
        return error.response;
    }
};

export const addNewBooking = async (data) => {
    try {
        const res = await request.postMethod('booking', data);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};

export const editBooking = async (id, data) => {
    try {
        const res = await request.putMethod(`booking/${id}`, data);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};

export const confirmBooking = async (id) => {
    try {
        const res = await request.putMethod(`admin/booking/${id}`);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};

export const deleteBooking = async (id) => {
    try {
        const res = await request.deleteMethod(`admin/booking/${id}`);

        console.log(res, 'try');
        return res;
    } catch (error) {
        console.log(error, 'err');
        return error.response;
    }
};
