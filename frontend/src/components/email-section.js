import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useChangeEmailHook } from "../features/auth/auth-hooks";
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { changeEmail, resetAuth } from "../features/auth/auth-slice";
import { showToastr } from "../features/toastr/toastr-slice";
import { FUNCTIONALITIES } from "../constants/functionalities";

const Section = styled('section')`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: rgb(140 152 164 / 13%) 0px 6px 24px 0px;
    flex-grow: 1;
    padding: 24px;
`

const Title = styled('h2')`
    font-size: 20px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 40px;
    color: rgb(52, 71, 103);
`

const Form = styled('form')`
`

const FieldsContainer = styled('div')`
    display: flex;
    gap: 20px;
    margin-bottom: 35px;
`

const SubmitButtonWrapper = styled('div')`
    display: flex;
    justify-content: flex-end;
`

const SubmitLoadingButton = styled(LoadingButton)`
    border-radius: 4px;
    background-color: #064C8C;
    color: #fff;
    text-transform: none;
    padding: 8px 16px;
    height: 40px;
    &.Mui-disabled {
        color: #fff;
    }
`

const SubmitButton = styled('button')`
    border-radius: 8px;
    background-color: #064C8C;
    color: #fff;
    text-transform: none;
    padding: 0 16px;
    height: 40px;
    border: 0;
    :disabled {
        background-color: rgba(200, 200, 200, 0.6);
        color: #000;
    }
    :hover:not(:disabled) {
        opacity: .7;
        cursor: pointer;
    }
`

const OutlinedTextField = styled((props) => (
    <TextField variant='outlined' {...props} />
))`
    flex-grow: 1;
    & .MuiOutlinedInput-root {
        border-radius: 4px;
    }
`

function EmailSection() {
    console.log('RENDER EMAIL SECTION')

    const { data: user, message, severity, isLoading, isSuccess, isError } = useChangeEmailHook();

    const dispatch = useDispatch();

    const [newEmail, setNewEmail] = useState('');

    const handleChangeNewEmail = (event) => setNewEmail(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestChangeEmail = {
            userId: user.id,
            newEmail
        }

        dispatch(changeEmail(requestChangeEmail));
    }

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(showToastr({ message, severity }));
            dispatch(resetAuth(FUNCTIONALITIES.CHANGE_EMAIL));
        }
    }, [message, severity, isSuccess, isError, dispatch])

    return (
        <Section>
            <Title>
                Schimbare e-mail
            </Title>
            <Form onSubmit={handleSubmit}>
                <FieldsContainer>
                    <OutlinedTextField label='Email' type='email' defaultValue={user.email} disabled={true} name="email" />
                    <OutlinedTextField label='Noul email' type='email' placeholder='example@gmail.com' onChange={handleChangeNewEmail} name="newEmail" />
                </FieldsContainer>
                <SubmitButtonWrapper>
                    {
                        isLoading ?
                            <SubmitLoadingButton loading loadingPosition="start" startIcon={<Save />} variant="outlined">
                                Schimba e-mail
                            </SubmitLoadingButton>
                            :
                            <SubmitButton type='submit' disabled={newEmail === ''}>Schimba e-mail</SubmitButton>
                    }
                </SubmitButtonWrapper>
            </Form>
        </Section>
    )
}

export default EmailSection;