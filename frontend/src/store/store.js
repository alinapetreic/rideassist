import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import toastrReducer from '../features/toastr/toastr-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        toastr: toastrReducer
    }
})

export default store