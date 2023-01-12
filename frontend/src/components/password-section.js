import { CheckCircleOutline, CircleOutlined, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { useChangePasswordHook } from "../features/auth/auth-hooks";
import { useDispatch } from 'react-redux';
import { changePassword, resetAuth } from "../features/auth/auth-slice";
import { showToastr } from "../features/toastr/toastr-slice";
import { hasDigit, hasLowerCase, hasUpperCase } from "../utils/string";
import { FUNCTIONALITIES } from "../constants/functionalities";

const Section = styled('section')`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: rgb(140 152 164 / 13%) 0px 6px 24px 0px;
    flex-grow: 1;
    padding: 24px;
`

const SectionTitle = styled('h2')`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 40px;
    color: rgb(52, 71, 103);
    margin-top: 0;
`

const Form = styled('form')`
`

const FieldsContainer = styled('div')`
    display: flex;
    gap: 20px;
    margin-bottom: 35px;
`

const BottomContainer = styled('div')`
    display: flex;
    justify-content: space-between;
`

const List = styled('div')`
`

const ListTitle = styled('p')`
    font-size: 16px;
    font-weight: 600;
    color: rgb(52, 71, 103);
    margin-bottom: 10px;
`

const Item = styled('div')`
    display: flex;
    align-items: center;
    color: rgb(103, 116, 142);
    font-size: 14px;
    gap: 5px;
`

const SubmitButtonWrapper = styled('div')`
    display: flex;
    align-items: flex-end;
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

const CircleOutlinedIcon = styled(CircleOutlined)`
    color: #011B33;
    &.MuiSvgIcon-root {
        font-size: 18px;
    }
`

const CheckCircleOutlineIcon = styled(CheckCircleOutline)`
    color: #011B33;
    &.MuiSvgIcon-root {
        font-size: 18px;
    }
`

const OutlinedFormControl = styled((props) => (<FormControl variant='outlined' {...props} />))`
    flex-grow: 1;
    & .MuiOutlinedInput-root {
        border-radius: 4px;
    }
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

const PasswordSection = () => {
    console.log('RENDER PASSWORD SECTION')

    const { data: user, message, severity, isLoading, isSuccess, isError } = useChangePasswordHook();

    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [passwordHasMinSix, setPasswordHasMinSix] = useState(false);
    const [passwordHasLower, setPasswordHasLower] = useState(false);
    const [passwordHasUpper, setPasswordHasUpper] = useState(false);
    const [passwordHasDigit, setPasswordHasDigit] = useState(false);

    const isSubmitButtonDisabled = oldPassword === '' || newPassword === '' || !passwordHasMinSix || !passwordHasLower || !passwordHasUpper || !passwordHasDigit;

    const handleNewPassword = (event) => {
        setPasswordHasMinSix(event.target.value.length >= 6);
        setPasswordHasLower(hasLowerCase(event.target.value));
        setPasswordHasUpper(hasUpperCase(event.target.value));
        setPasswordHasDigit(hasDigit(event.target.value));
        setNewPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestChangePassword = {
            userId: user.id,
            oldPassword,
            newPassword
        }

        dispatch(changePassword(requestChangePassword));
    }

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(showToastr({ message, severity }));
            dispatch(resetAuth(FUNCTIONALITIES.CHANGE_PASSWORD));
        }
    }, [message, severity, isSuccess, isError, dispatch])

    return (
        <Section>
            <SectionTitle>
                Schimbare parola
            </SectionTitle>
            <Form onSubmit={handleSubmit}>
                <FieldsContainer>
                    <OutlinedFormControl>
                        <InputLabel>Parola veche</InputLabel>
                        <OutlinedInput
                            type={showOldPassword ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='Toggle old password visibility'
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        onMouseDown={(e) => e.preventDefault}
                                        edge='end'
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Parola veche'
                        />
                    </OutlinedFormControl>
                    <OutlinedFormControl>
                        <InputLabel>Parola noua</InputLabel>
                        <OutlinedInput
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPassword}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='Toggle new password visibility'
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        onMouseDown={(e) => e.preventDefault}
                                        edge='end'
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Parola noua'
                        />
                    </OutlinedFormControl>
                </FieldsContainer>
                <BottomContainer>
                    <List>
                        <ListTitle>Cerinte parola</ListTitle>
                        <Item>
                            {passwordHasMinSix ? <CheckCircleOutlineIcon /> : <CircleOutlinedIcon />}
                            Minim 6 caractere
                        </Item>
                        <Item>
                            {passwordHasLower ? <CheckCircleOutlineIcon /> : <CircleOutlinedIcon />}
                            Minim o litera mica
                        </Item>
                        <Item>
                            {passwordHasUpper ? <CheckCircleOutlineIcon /> : <CircleOutlinedIcon />}
                            Minim o litera mare
                        </Item>
                        <Item>
                            {passwordHasDigit ? <CheckCircleOutlineIcon /> : <CircleOutlinedIcon />}
                            Minim o cifra
                        </Item>
                    </List>

                    <SubmitButtonWrapper>
                        {
                            isLoading ?
                                <SubmitLoadingButton loading loadingPosition="start" startIcon={<Save />} variant="outlined">
                                    Schimba parola
                                </SubmitLoadingButton>
                                :
                                <SubmitButton type='submit' disabled={isSubmitButtonDisabled}>Schimba parola</SubmitButton>
                        }
                    </SubmitButtonWrapper>
                </BottomContainer>
            </Form>
        </Section>
    )
}

export default PasswordSection;