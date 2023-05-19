import * as request from '../utils/request';

export const login = async (data) => {
    try {
        const res = await request.post('login', {
            account: data.account,
            password: data.password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
