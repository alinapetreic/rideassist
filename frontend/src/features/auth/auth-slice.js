import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UNKNOWN_ERROR } from '../../constants/errors';
import { SEVERITIES } from '../../constants/severities';
import { STATUSES } from '../../constants/statuses';
import { localStorageGetItem, localStorageSetItem } from '../../utils/local-storage';
import authService from './auth-service'

const authData = localStorageGetItem('authData', 'object');

const initialState = {
    data: authData,
    messages: {},
    severities: {},
    statuses: {},
}

export const register = createAsyncThunk(
    'auth/register',
    async (requestPayload, { rejectWithValue }) => {
        const response = await authService.register(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        return responsePayload;
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (requestPayload, { rejectWithValue }) => {
        const response = await authService.login(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        localStorageSetItem('authData', responsePayload.user);

        return responsePayload;
    }
)

export const forgotPassword = createAsyncThunk(
    'auth/forgot-password',
    async (requestPayload, { rejectWithValue }) => {
        const response = await authService.forgotPassword(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        return responsePayload;
    }
)

export const update = createAsyncThunk(
    'api/users/update',
    async (requestPayload, { rejectWithValue }) => {
        const response = await authService.update(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        localStorageSetItem('authData', responsePayload.user);

        return responsePayload;
    }
)

export const changeEmail = createAsyncThunk(
    'auth/change-email',
    async (requestPayload, { rejectWithValue }) => {
        const response = await authService.changeEmail(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        return responsePayload;
    }
)

export const changePassword = createAsyncThunk(
    'auth/change-password',
    async (requestPayload, { rejectWithValue }) => {
        const response = await authService.changePassword(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        return responsePayload;
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        const response = await authService.logout();

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        return responsePayload;
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state, { payload }) => {
            state.messages[payload] = undefined;
            state.severities[payload] = undefined;
            state.statuses[payload] = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.statuses.register = STATUSES.PENDING;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.statuses.register = STATUSES.FULFILLED;
                state.messages.register = payload.message;
                state.severities.register = payload.severity;
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.statuses.register = STATUSES.REJECTED;
                state.messages.register = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severities.register = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
            .addCase(login.pending, (state) => {
                state.statuses.login = STATUSES.PENDING;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.statuses.login = STATUSES.FULFILLED;
                state.messages.login = payload.message;
                state.severities.login = payload.severity;
                state.data = payload.user;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.statuses.login = STATUSES.REJECTED;
                state.messages.login = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severities.login = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.statuses.forgotPassword = STATUSES.PENDING;
            })
            .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.statuses.forgotPassword = STATUSES.FULFILLED;
                state.messages.forgotPassword = payload.message;
                state.severities.forgotPassword = payload.severity;
            })
            .addCase(forgotPassword.rejected, (state, { payload }) => {
                state.statuses.forgotPassword = STATUSES.REJECTED;
                state.messages.forgotPassword = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severities.forgotPassword = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
            .addCase(update.pending, (state) => {
                state.statuses.update = STATUSES.PENDING;
            })
            .addCase(update.fulfilled, (state, { payload }) => {
                state.statuses.update = STATUSES.FULFILLED;
                state.data = payload.user;
                state.messages.update = payload.message;
                state.severities.update = payload.severity;
            })
            .addCase(update.rejected, (state, { payload }) => {
                state.statuses.update = STATUSES.REJECTED;
                state.messages.update = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severities.update = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
            .addCase(changeEmail.pending, (state) => {
                state.statuses.changeEmail = STATUSES.PENDING;
            })
            .addCase(changeEmail.fulfilled, (state, { payload }) => {
                state.statuses.changeEmail = STATUSES.FULFILLED;
                state.messages.changeEmail = payload.message;
                state.severities.changeEmail = payload.severity;
            })
            .addCase(changeEmail.rejected, (state, { payload }) => {
                state.statuses.changeEmail = STATUSES.REJECTED;
                state.messages.changeEmail = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severities.changeEmail = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
            .addCase(changePassword.pending, (state) => {
                state.statuses.changePassword = STATUSES.PENDING;
            })
            .addCase(changePassword.fulfilled, (state, { payload }) => {
                state.statuses.changePassword = STATUSES.FULFILLED;
                state.messages.changePassword = payload.message;
                state.severities.changePassword = payload.severity;
            })
            .addCase(changePassword.rejected, (state, { payload }) => {
                state.statuses.changePassword = STATUSES.REJECTED;
                state.messages.changePassword = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severities.changePassword = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
            .addCase(logout.pending, (state) => {
                state.statuses.logout = STATUSES.PENDING;
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.statuses.logout = STATUSES.FULFILLED;
                state.data = {};
                state.messages.logout = payload.message;
                state.severities.logout = payload.severity;
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.statuses.logout = STATUSES.REJECTED;
                state.messages.logout = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severities.logout = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
    }
})

export const selectMessageByFunctionality = (state, functionality) => state.auth.messages[functionality]
export const selectSeverityByFunctionality = (state, functionality) => state.auth.severities[functionality]
export const selectStatusByFunctionality = (state, functionality) => state.auth.statuses[functionality]

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;