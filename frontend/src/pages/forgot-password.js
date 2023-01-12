import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react'
import { Link as RouteLink, useNavigate } from 'react-router-dom'
import { Divider, TextField, Link } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Save } from '@mui/icons-material'
import { useDispatch } from 'react-redux';
import { useForgotPasswordHook } from '../features/auth/auth-hooks';
import { forgotPassword, resetAuth } from '../features/auth/auth-slice';
import { showToastr } from '../features/toastr/toastr-slice';
import { FUNCTIONALITIES } from '../constants/functionalities';

const MainContainer = styled('div')`
    background: linear-gradient(-90deg,#02203c,#001528);
`

const ContentWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`

const Form = styled('form')`
    background-color: #02203c;
    width: 450px;
    padding: 40px 0 40px 0;
    border-radius: 4px;
    box-shadow: 0 45px 30px -17px rgb(0 0 0 / 40%), 45px 37px 30px -17px rgb(0 0 0 / 40%);
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const Title = styled('h2')`
    color: #fff;
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    margin: 0;
`

const FieldsContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 50px;
    margin-top: -10px;
    & .MuiTextField-root {
        margin: 5px 0;
    }
`

const SubmitButtonWrapper = styled('div')`
    display: flex;
    justify-content: center;
`

const LinkWrapper = styled('div')`
    padding: 0 50px 0px;
`

const SubmitButton = styled('button')`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    height: 36px;
    padding: 0px 20px;
    text-transform: uppercase;
    border: 0;
    cursor: pointer;
    &:disabled {
        background-color: rgba(255, 255, 255, 0.6);
        color: #000;
        cursor: default;
    }
`

const LoginLink = styled((props) => (<Link component={RouteLink} {...props} />))`
    color: #fff;
    font-size: 16px;
    text-decoration: none;
`

const InputField = styled((props) => (
    <TextField
        variant='standard'
        {...props}
    />))`
    width: 100%;
    & .MuiInputLabel-root {
        color: rgba(255, 255, 255, 0.7);
    }
    & .MuiInputLabel-root:has(.Mui-error) {
        color: #d32f2f;
    }
    & .MuiInputLabel-root.Mui-error:not(.Mui-focused):not(.MuiFormLabel-filled) {
        transform: translate(0, 5px) scale(1);
    }
    & .MuiInputLabel-root.Mui-error:not(.Mui-focused):not(.MuiFormLabel-filled) + div {
        margin-top: 0px;
    }
    & .MuiInput-root:before {
        border-bottom-color: rgba(255, 255, 255, 0.7)
    }
    & .MuiInput-root:hover:not(.Mui-disabled):before {
        border-bottom-color: #fff
    }
    & .MuiInput-input {
        color: #fff
    }   
`

const LoadingSubmitButton = styled(LoadingButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    height: 36px;
    padding: 0px 20px;
    background-color: #f0f0f0;
    border: 0;
    gap: 10px;
    &.Mui-disabled {
        color: #000;
    }
    & .MuiButton-startIcon {
        margin: 0;
    }
    & .MuiButton-startIcon>*:nth-of-type(1) {
        font-size: 16px;
    }
    & .MuiLoadingButton-loadingIndicator{
        left: 20px;
    }
`

const LinkDivider = styled(Divider)`
    &::before, &::after {
        border-color: rgba(255, 255, 255, 0.7);
    }
`

function ForgotPassword() {
    console.log('RENDER LOGIN COMPONENT')

    const { message, severity, isLoading, isSuccess, isError } = useForgotPasswordHook();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const isSubmitButtonDisabled = email === '';

    const handleChangeEmail = (event) => setEmail(event.target.value)

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(forgotPassword({ email }));
    }

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(showToastr({ message, severity }));
            dispatch(resetAuth(FUNCTIONALITIES.FORGOT_PASSWORD));
        }
        if (isSuccess) {
            navigate('/login');
        }
    }, [message, severity, isSuccess, isError, dispatch, navigate])

    return (
        <MainContainer>
            <ContentWrapper>
                <Form onSubmit={handleFormSubmit}>
                    <Title>
                        Autentificare
                    </Title>
                    <FieldsContainer>
                        <InputField
                            type='email'
                            onChange={handleChangeEmail}
                            label='E-mail'
                        />
                    </FieldsContainer>
                    <SubmitButtonWrapper>
                        {
                            isLoading ?
                                <LoadingSubmitButton
                                    loading
                                    loadingPosition='start'
                                    startIcon={<Save />}
                                    variant='outlined'
                                >
                                    Afla parola
                                </LoadingSubmitButton>
                                :
                                <SubmitButton type='submit' disabled={isSubmitButtonDisabled}>
                                    Afla parola
                                </SubmitButton>
                        }
                    </SubmitButtonWrapper>
                    <LinkWrapper>
                        <LinkDivider>
                            <LoginLink to='/login'>
                                Stii parola?
                            </LoginLink>
                        </LinkDivider>
                    </LinkWrapper>
                </Form>
            </ContentWrapper>
        </MainContainer>
    )
}

export default ForgotPassword;