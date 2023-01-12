import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, resetAuth } from '../features/auth/auth-slice';
import { useLogoutHook } from '../features/auth/auth-hooks';
import { showToastr } from '../features/toastr/toastr-slice';
import CircularSpinner from '../components/circular-spinner';

const MainContainer = styled('div')`
    background: linear-gradient(-90deg,#02203c,#001528);
`

const CircularSpinnerWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`

function Logout() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { message, severity, isLoading, isSuccess, isError } = useLogoutHook();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch])

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(showToastr({message, severity}));
            dispatch(resetAuth('activate'));
            navigate('/login');
        }
    }, [message, severity, isSuccess, isError, dispatch, navigate])

    return (
        <MainContainer>
            <CircularSpinnerWrapper>
                {
                    isLoading 
                    ? <CircularSpinner sizeSpinner={120} fontSizeText='14px' text='Loading...' color='#fff'/>
                    : null
                }
            </CircularSpinnerWrapper>
        </MainContainer>
    )
}

export default Logout;