import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import ForgotPassword from './pages/forgot-password';
import store from './store/store';
import App from './pages/app';
import Dashboard from './pages/dashboard';
import AccountDetails from './pages/account-details';
import Logout from './pages/logout';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/' element={<App />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/account-settings/*' element={<AccountDetails />} />
                    <Route path='/account-details/*' element={<AccountDetails />} />
                    <Route path='/logout' element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
