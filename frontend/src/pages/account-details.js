import { styled } from '@mui/material/styles';
import { useSearchParams, Link as RouteLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { getSearchParam } from '../utils/search-params';
import { SECTIONS, SECTIONS_LIST } from '../constants/sections';
import GeneralSection from '../components/general-section';
import EmailSection from '../components/email-section';
import PasswordSection from '../components/password-section';

const MainContainer = styled('div')`
    height: calc(100vh - 64px);
    background-color: #F4F7FA;
`

const InnerContainer = styled('div')`
    display: flex;
    gap: 20px;
    max-width: 1600px;
    padding: 50px 0;
    margin: 0 auto 0;
`

const NavigationList = styled('div')`
    flex: 0 0 275px;
    border-radius: 4px;
    box-shadow: rgb(140 152 164 / 13%) 0px 6px 24px 0px;
    align-self: flex-start;
`

const List = styled('ul')`
    background-color: #fff;
    padding: 32px 0;
    border-radius: 4px;
    margin: 0;
`

const Text = styled(({ active, ...rest }) => <p {...rest} />)`
    color: ${({ active }) => active ? '#000' : 'rgb(103, 119, 136)'};
    margin: 0;
`

const ListItemLink = styled(({ active, ...rest }) => <Link {...rest} />)`
     border-left: 2px solid ${({ active }) => active ? '#064C8C' : 'transparent'};
     padding: 10px 0 10px 24px;
     cursor: pointer;
     list-style-type: none;
     text-decoration: none;
     display: block;
     :hover p{
         color: #000;
     }
`

function AccountDetails() {
    console.log('RENDER ACCOUNT DETAILS COMPONENT')

    const [searchParams] = useSearchParams();

    const activeSection = getSearchParam(searchParams, 'section', SECTIONS_LIST, SECTIONS.GENERAL);

    const isGeneralSectionActive = activeSection === SECTIONS.GENERAL
    const isEmailSectionActive = activeSection === SECTIONS.EMAIL
    const isPasswordSectionActive = activeSection === SECTIONS.PASSWORD

    return (
        <MainContainer>
            <InnerContainer>
                <NavigationList>
                    <List>
                        <ListItemLink active={isGeneralSectionActive} component={RouteLink} to={`/account-details?section=${SECTIONS.GENERAL}`} >
                            <Text active={isGeneralSectionActive}>
                                General
                            </Text>
                        </ListItemLink>
                        <ListItemLink active={isEmailSectionActive} component={RouteLink} to={`/account-details?section=${SECTIONS.EMAIL}`} >
                            <Text active={isEmailSectionActive}>
                                E-mail
                            </Text>
                        </ListItemLink>
                        <ListItemLink active={isPasswordSectionActive} component={RouteLink} to={`/account-details?section=${SECTIONS.PASSWORD}`}>
                            <Text active={isPasswordSectionActive}>
                                Parola
                            </Text>
                        </ListItemLink>
                    </List>
                </NavigationList>
                {isGeneralSectionActive ? <GeneralSection /> : null}
                {isEmailSectionActive ? <EmailSection /> : null}
                {isPasswordSectionActive ? <PasswordSection /> : null}
            </InnerContainer>
        </MainContainer>
    )
}

export default AccountDetails;