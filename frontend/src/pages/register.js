import {
    FIRST_NAME_ERRORS,
    LAST_NAME_ERRORS,
    EMAIL_ERRORS,
    PASSWORD_ERRORS,
    CONFIRM_PASSWORD_ERRORS,
    PASSWORDS_NOT_THE_SAME
} from '../constants/register'
import { useEffect, useState } from 'react'
import { Link as RouteLink, useNavigate } from 'react-router-dom'
import { Divider, TextField, Link } from '@mui/material'
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab'
import { Save } from '@mui/icons-material'
import { useRegisterHook } from '../features/auth/auth-hooks';
import { useDispatch } from 'react-redux';
import { showToastr } from '../features/toastr/toastr-slice';
import { register, resetAuth } from '../features/auth/auth-slice';
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
    font-weight: 500;
    font-size: 22px;
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

function Register() {
    console.log('RENDER REGISTER COMPONENT')

    const { message, severity, isLoading, isSuccess, isError } = useRegisterHook();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstNameErrorText, setFirstNameErrorText] = useState('');
    const [lastNameErrorText, setLastNameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');

    const isSubmitButtonDisabled =
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        password === '' ||
        confirmPassword === '' ||
        firstNameErrorText !== '' ||
        lastNameErrorText !== '' ||
        emailErrorText !== '' ||
        passwordErrorText !== '' ||
        confirmPasswordErrorText !== '';

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value)

        if (event.target.value.length === 0) {
            setFirstNameErrorText(FIRST_NAME_ERRORS.REQUIRED)
            return;
        }

        if (event.target.value.length < 2) {
            setFirstNameErrorText(FIRST_NAME_ERRORS.MIN_LENGTH)
            return;
        }

        if (event.target.value.length > 30) {
            setFirstNameErrorText(FIRST_NAME_ERRORS.MAX_LENGTH)
            return;
        }

        if (event.target.value.trim().length === 0) {
            setFirstNameErrorText(FIRST_NAME_ERRORS.ONLY_SPACES)
            return;
        }

        if (!/^[a-zA-Z]+$/.test(event.target.value)) {
            setFirstNameErrorText(FIRST_NAME_ERRORS.ONLY_LETTERS)
            return;
        }

        setFirstNameErrorText('')
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value)

        if (event.target.value.length === 0) {
            setLastNameErrorText(LAST_NAME_ERRORS.REQUIRED)
            return;
        }

        if (event.target.value.length < 2) {
            setLastNameErrorText(LAST_NAME_ERRORS.MIN_LENGTH)
            return;
        }

        if (event.target.value.length > 30) {
            setLastNameErrorText(LAST_NAME_ERRORS.MAX_LENGTH)
            return;
        }

        if (event.target.value.trim().length === 0) {
            setLastNameErrorText(LAST_NAME_ERRORS.ONLY_SPACES)
            return;
        }

        if (!/^[a-zA-Z]+$/.test(event.target.value)) {
            setLastNameErrorText(LAST_NAME_ERRORS.ONLY_LETTERS)
            return;
        }

        setLastNameErrorText('')
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);

        if (event.target.value.length === 0) {
            setEmailErrorText(EMAIL_ERRORS.REQUIRED);
            return;
        }

        if (event.target.value.length < 6) {
            setEmailErrorText(EMAIL_ERRORS.MIN_LENGTH);
            return;
        }

        if (event.target.value.length > 100) {
            setEmailErrorText(EMAIL_ERRORS.MAX_LENGTH);
            return;
        }

        if (event.target.value.trim().length === 0) {
            setEmailErrorText(EMAIL_ERRORS.ONLY_SPACES);
            return;
        }

        if (!/^(.+)@(.+)\.(.+)$/.test(event.target.value)) {
            setEmailErrorText(EMAIL_ERRORS.INVALID);
            return;
        }

        setEmailErrorText('');
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)

        if (event.target.value.length === 0) {
            setPasswordErrorText(PASSWORD_ERRORS.REQUIRED)
            return;
        }

        if (event.target.value.length < 6) {
            setPasswordErrorText(PASSWORD_ERRORS.MIN_LENGTH)
            return;
        }

        if (event.target.value.length > 30) {
            setPasswordErrorText(PASSWORD_ERRORS.MAX_LENGTH)
            return;
        }

        if (event.target.value.trim().length === 0) {
            setPasswordErrorText(PASSWORD_ERRORS.ONLY_SPACES)
            return;
        }

        if (!/[a-z]/.test(event.target.value)) {
            setPasswordErrorText(PASSWORD_ERRORS.LOWERCASE_LETTER)
            return;
        }

        if (!/[A-Z]/.test(event.target.value)) {
            setPasswordErrorText(PASSWORD_ERRORS.UPPERCASE_LETTER)
            return;
        }

        if (!/[0-9]/.test(event.target.value)) {
            setPasswordErrorText(PASSWORD_ERRORS.DIGIT)
            return;
        }

        setPasswordErrorText('')
    }

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)

        if (event.target.value.length === 0) {
            setConfirmPasswordErrorText(CONFIRM_PASSWORD_ERRORS.REQUIRED)
            return;
        }

        if (event.target.value.length < 6) {
            setConfirmPasswordErrorText(CONFIRM_PASSWORD_ERRORS.MIN_LENGTH)
            return;
        }

        if (event.target.value.length > 30) {
            setConfirmPasswordErrorText(CONFIRM_PASSWORD_ERRORS.MAX_LENGTH)
            return;
        }

        if (event.target.value.trim().length === 0) {
            setConfirmPasswordErrorText(CONFIRM_PASSWORD_ERRORS.ONLY_SPACES)
            return;
        }

        if (!/[a-z]/.test(event.target.value)) {
            setConfirmPasswordErrorText(CONFIRM_PASSWORD_ERRORS.LOWERCASE_LETTER)
            return;
        }

        if (!/[A-Z]/.test(event.target.value)) {
            setConfirmPasswordErrorText(CONFIRM_PASSWORD_ERRORS.UPPERCASE_LETTER)
            return;
        }

        if (!/[0-9]/.test(event.target.value)) {
            setConfirmPasswordErrorText(CONFIRM_PASSWORD_ERRORS.DIGIT)
            return;
        }

        setConfirmPasswordErrorText('')
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            dispatch(showToastr({ message: PASSWORDS_NOT_THE_SAME, severity: 'error' }))
        }
        else {
            dispatch(register({ firstName, lastName, email, password }));
        }
    }

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(showToastr({ message, severity }));
            dispatch(resetAuth(FUNCTIONALITIES.REGISTER));
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
                        Inregistrare
                    </Title>
                    <FieldsContainer>
                        <InputField
                            error={lastNameErrorText.length !== 0}
                            onChange={handleChangeLastName}
                            label='Nume'
                            helperText={lastNameErrorText}
                        />
                        <InputField
                            error={firstNameErrorText.length !== 0}
                            onChange={handleChangeFirstName}
                            label='Prenume'
                            helperText={firstNameErrorText}
                        />
                        <InputField
                            type='email'
                            error={emailErrorText.length !== 0}
                            onChange={handleChangeEmail}
                            label='E-mail'
                            helperText={emailErrorText}
                        />
                        <InputField
                            type='password'
                            error={passwordErrorText.length !== 0}
                            onChange={handleChangePassword}
                            label='Parola'
                            helperText={passwordErrorText}
                        />
                        <InputField
                            type='password'
                            error={confirmPasswordErrorText.length !== 0}
                            onChange={handleChangeConfirmPassword}
                            label='Confirmare parola'
                            helperText={confirmPasswordErrorText}
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
                                    Inregistrare
                                </LoadingSubmitButton>
                                :
                                <SubmitButton type='submit' disabled={isSubmitButtonDisabled}>
                                    Inregistrare
                                </SubmitButton>
                        }
                    </SubmitButtonWrapper>
                    <LinkWrapper>
                        <LinkDivider>
                            <LoginLink to='/login'>
                                Ai deja cont?
                            </LoginLink>
                        </LinkDivider>
                    </LinkWrapper>
                </Form>
            </ContentWrapper>
        </MainContainer>
    )
}

export default Register;