import { useSelector } from 'react-redux'
import { FUNCTIONALITIES } from '../../constants/functionalities';
import { selectMessageByFunctionality, selectSeverityByFunctionality, selectStatusByFunctionality } from './auth-slice';

const useRegisterHook = () => {
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.REGISTER));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.REGISTER));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.REGISTER));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { message, severity, isLoading, isSuccess, isError };
}

const useActivateHook = () => {
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.ACTIVATE));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.ACTIVATE));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.ACTIVATE));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { message, severity, isLoading, isSuccess, isError };
}

const useLoginHook = () => {
    const data = useSelector((state) => state.auth.data);
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.LOGIN));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.LOGIN));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.LOGIN));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { data, message, severity, isLoading, isSuccess, isError };
}

const useForgotPasswordHook = () => {
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.FORGOT_PASSWORD));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.FORGOT_PASSWORD));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.FORGOT_PASSWORD));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { message, severity, isLoading, isSuccess, isError };
}

const useUpdateHook = () => {
    const data = useSelector((state) => state.auth.data);
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.UPDATE));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.UPDATE));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.UPDATE));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { data, message, severity, isLoading, isSuccess, isError };
}

const useChangeEmailHook = () => {
    const data = useSelector((state) => state.auth.data);
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.CHANGE_EMAIL));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.CHANGE_EMAIL));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.CHANGE_EMAIL));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { data, message, severity, isLoading, isSuccess, isError };
}

const useChangePasswordHook = () => {
    const data = useSelector((state) => state.auth.data);
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.CHANGE_PASSWORD));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.CHANGE_PASSWORD));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.CHANGE_PASSWORD));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { data, message, severity, isLoading, isSuccess, isError };
}

const useLogoutHook = () => {
    const data = useSelector((state) => state.auth.data);
    const message = useSelector((state) => selectMessageByFunctionality(state, FUNCTIONALITIES.LOGOUT));
    const severity = useSelector((state) => selectSeverityByFunctionality(state, FUNCTIONALITIES.LOGOUT));
    const status = useSelector((state) => selectStatusByFunctionality(state, FUNCTIONALITIES.LOGOUT));

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { data, message, severity, isLoading, isSuccess, isError };
}

export {
    useRegisterHook,
    useActivateHook,
    useLoginHook,
    useForgotPasswordHook,
    useUpdateHook,
    useChangeEmailHook,
    useChangePasswordHook,
    useLogoutHook
}