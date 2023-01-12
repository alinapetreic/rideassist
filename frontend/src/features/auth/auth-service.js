import { REQUEST_CONTENT_TYPE } from '../../constants/request';
import { get, post, put } from '../../utils/request';

const REGISTER_API_URL = '/auth/register';
const LOGIN_API_URL = '/auth/login';
const FORGOT_PASSWORD_API_URL = '/auth/forgot-password';
const UPDATE_API_URL = '/api/users';
const CHANGE_EMAIL_API_URL = '/auth/change-email';
const CHANGE_PASSWORD_API_URL = '/auth/change-password';
const LOGOUT_API_URL = '/auth/logout';

const register = async (requestPayload) => {
    return post(REGISTER_API_URL, requestPayload);
}

const login = async (requestPayload) => {
    return post(LOGIN_API_URL, requestPayload);
}

const forgotPassword = async (requestPayload) => {
    return post(FORGOT_PASSWORD_API_URL, requestPayload);
}

const update = async (requestPayload) => {
    const id = requestPayload.get('id');
    requestPayload.delete('id');
    return put(`${UPDATE_API_URL}/${id}`, requestPayload, REQUEST_CONTENT_TYPE.FORM_DATA);
}

const changeEmail = async (requestPayload) => {
    return post(CHANGE_EMAIL_API_URL, requestPayload);
}

const changePassword = async (requestPayload) => {
    return post(CHANGE_PASSWORD_API_URL, requestPayload);
}

const logout = () => {
    return get(LOGOUT_API_URL);
}

const authService = {
    register,
    login,
    forgotPassword,
    update,
    changeEmail,
    changePassword,
    logout
}

export default authService;