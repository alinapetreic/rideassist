import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react'
import { Link as RouteLink, useNavigate } from 'react-router-dom'
import { Divider, TextField, Link } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Save } from '@mui/icons-material'
import { useLoginHook } from '../features/auth/auth-hooks';
import { useDispatch } from 'react-redux';
import { login, resetAuth } from '../features/auth/auth-slice';
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

const ForgotPasswordLinkWrapper = styled('div')`
    padding: 0 50px;
    display: flex;
    justify-content: flex-end;
    margin-top: -25px;
`

const ForgotPasswordLink = styled((props) => (<Link component={RouteLink} {...props} />))`
    color: #fff;
    font-size: 16px;
    text-decoration: none;
`

const RegisterLink = styled((props) => (<Link component={RouteLink} {...props} />))`
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

function Login() {
    console.log('RENDER LOGIN COMPONENT')

    const { message, severity, isLoading, isSuccess, isError } = useLoginHook();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isSubmitButtonDisabled = email === '' || password === '';

    const handleChangeEmail = (event) => setEmail(event.target.value)

    const handleChangePassword = (event) => setPassword(event.target.value)

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ email, password }));
    }

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(showToastr({ message, severity }));
            dispatch(resetAuth(FUNCTIONALITIES.LOGIN));
        }
        if (isSuccess) {
            navigate('/dashboard');
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
                        <InputField
                            type='password'
                            onChange={handleChangePassword}
                            label='Parola'
                        />
                    </FieldsContainer>
                    <ForgotPasswordLinkWrapper>
                        <ForgotPasswordLink component={RouteLink} to="/forgot-password">Ai uitat parola?</ForgotPasswordLink>
                    </ForgotPasswordLinkWrapper>
                    <SubmitButtonWrapper>
                        {
                            isLoading ?
                                <LoadingSubmitButton
                                    loading
                                    loadingPosition='start'
                                    startIcon={<Save />}
                                    variant='outlined'
                                >
                                    Autentificare
                                </LoadingSubmitButton>
                            :
                                <SubmitButton type='submit' disabled={isSubmitButtonDisabled}>
                                    Autentificare
                                </SubmitButton>
                        }
                    </SubmitButtonWrapper>
                    <LinkWrapper>
                        <LinkDivider>
                            <RegisterLink to='/register'>
                                Nu ai cont?
                            </RegisterLink>
                        </LinkDivider>
                    </LinkWrapper>
                </Form>
            </ContentWrapper>
        </MainContainer>
    )
}

export default Login;