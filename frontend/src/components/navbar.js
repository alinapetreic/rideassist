import { useState } from 'react';
import { Link, Tooltip, Avatar, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouteLink } from 'react-router-dom';
import { AccountCircle, EmailOutlined, Logout, Security } from '@mui/icons-material';
import { SECTIONS } from '../constants/sections';
import { MENUS_ID } from '../constants/menus-id';
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import logoImage from '../images/logo.png';




const NavBar = styled(AppBar)`
    background: linear-gradient(-90deg,#02203c,#001528);
`

const HomeLink = styled((props) => (<Link component={RouteLink} {...props} />))`
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    color: #fff;
`

const LogoImage = styled('img')`
    height: 30px;
    width: 30px;
`

const FlexGrowContainer = styled('div')`
    flex-grow: 1;
`

const IconButtonsContainer = styled('div')`
    display: flex;
`

const IconButtonWrapper = styled('div')`
    display: inline-flex;
`

// const Menu = styled((props) => (
//     <MuiMenu
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         keepMounted
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         {...props}
//     />))`
//     margin-top: 45px;
// `

const AccountMenu = styled(({ className, ...props }) => (
    <Menu
        keepMounted
        MenuListProps={{
            sx: {
                background: 'linear-gradient(-90deg,#02203c,#001528)',
                border: '1px solid rgb(45, 55, 72)',
                color: '#fff'
            }
        }}
        PaperProps={{
            sx: {
                overflow: 'visible',
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 'calc((64px / 2) - (15px / 2))',
                    width: 10,
                    height: 10,
                    backgroundColor: '#02203c',
                    borderTop: '1px solid rgb(45, 55, 72)',
                    borderLeft: '1px solid rgb(45, 55, 72)',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 1,
                }
            }
        }}
        {...props}
    />
))`
`;

const AccountMenuItem = styled(MenuItem)`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    & .MuiListItemIcon-root {
        min-width: auto;
    }
    :first-of-type {
        padding: 8px 16px;
    }
`

const UserDetails = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const FullName = styled('span')`
    line-height: 1.2;
`

const Email = styled('span')`
    line-height: 1.2;
    font-size: 14px;
    color: rgb(160, 174, 192);
`

const Divider = styled('hr')`
    border-color: rgb(45, 55, 72);
`

const LinkItem = styled((props) => (<Link component={RouteLink} {...props} />))`
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #fff;
    padding: 8px 16px;
    width: 100%;
    :hover {
        background-color: rgba(255, 255, 255, 0.04);    
    }
`

const ItemIcon = styled(ListItemIcon)`
    color: rgb(156, 163, 175);
`

const TextItem = styled('span')`
    line-height: normal;
    margin-top: 1px;
`

function Navbar() {
    console.log('RENDER NAVBAR COMPONENT')

    const [isOpenMenu, setIsOpenMenu] = useState({
        messagesMenu: false,
        notificationsMenu: false,
        accountMenu: false
    })

    const { firstName, lastName, email, avatarUri } = useSelector((state) => state.auth.data);

    const [anchorElement, setAnchorElement] = useState(null);

    const handleOpenMenu = (menuId, event) => {
        switch (menuId) {
            case MENUS_ID.ACCOUNT_MENU:
                setIsOpenMenu(currentIsOpenMenu => ({ ...currentIsOpenMenu, accountMenu: true }))
                break
            default:
                break
        }
        setAnchorElement(event.currentTarget)
    }

    const handleCloseMenu = (menuId) => {
        switch (menuId) {
            case MENUS_ID.ACCOUNT_MENU:
                setIsOpenMenu(currentIsOpenMenu => ({ ...currentIsOpenMenu, accountMenu: false }))
                break
            default:
                break
        }
        setAnchorElement(null)
    }

    return (
        <NavBar position="static">
            <Toolbar>
                <HomeLink component={RouteLink} to="/dashboard">
                    <LogoImage alt="App logo" src={logoImage} />
                    <Typography variant="h6">SQLearn</Typography>
                </HomeLink>
                <FlexGrowContainer />
                <IconButtonsContainer>
                    <IconButtonWrapper>
                        <Tooltip arrow title="Profil utilizator">
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                onClick={(e) => { handleOpenMenu(MENUS_ID.ACCOUNT_MENU, e) }}
                            >
                                <Avatar
                                    alt={`${lastName} ${firstName} `}
                                    src={avatarUri && `${process.env.REACT_APP_BACKEND_IMAGES_URL}/${avatarUri}`}
                                >
                                    {lastName[0]}
                                </Avatar >
                            </IconButton >
                        </Tooltip >
                        <AccountMenu
                            id={MENUS_ID.ACCOUNT_MENU}
                            anchorEl={anchorElement}
                            open={isOpenMenu.accountMenu}
                            onClose={() => handleCloseMenu(MENUS_ID.ACCOUNT_MENU)}
                        >
                            <AccountMenuItem>
                                <Avatar
                                    alt={`${lastName} ${firstName}`}
                                    src={avatarUri && `${process.env.REACT_APP_BACKEND_IMAGES_URL}/${avatarUri}`}
                                >
                                    {lastName[0]}
                                </Avatar>
                                <UserDetails>
                                    <FullName>
                                        {`${lastName} ${firstName}`}
                                    </FullName>
                                    <Email>
                                        {email}
                                    </Email>
                                </UserDetails>
                            </AccountMenuItem>
                            <Divider />
                            <AccountMenuItem>
                                <LinkItem
                                    component={RouteLink}
                                    to={`/account-details?section=${SECTIONS.GENERAL}`}
                                    onClick={() => handleCloseMenu(MENUS_ID.ACCOUNT_MENU)}
                                >
                                    <ItemIcon>
                                        <AccountCircle fontSize="small" />
                                    </ItemIcon>
                                    <TextItem>
                                        Schimbare date generale
                                    </TextItem>
                                </LinkItem>
                            </AccountMenuItem>
                            <AccountMenuItem>
                                <LinkItem
                                    component={RouteLink}
                                    to={`/account-details?section=${SECTIONS.EMAIL}`}
                                    onClick={() => handleCloseMenu(MENUS_ID.ACCOUNT_MENU)}
                                >
                                    <ItemIcon>
                                        <EmailOutlined fontSize="small" />
                                    </ItemIcon>
                                    <TextItem>
                                        Schimbare email
                                    </TextItem>
                                </LinkItem>
                            </AccountMenuItem>
                            <AccountMenuItem>
                                <LinkItem
                                    component={RouteLink}
                                    to={`/account-details?section=${SECTIONS.PASSWORD}`}
                                    onClick={() => handleCloseMenu(MENUS_ID.ACCOUNT_MENU)}
                                >
                                    <ItemIcon>
                                        <Security fontSize="small" />
                                    </ItemIcon>
                                    <TextItem>
                                        Schimbare parola
                                    </TextItem>
                                </LinkItem>
                            </AccountMenuItem>
                            <Divider />
                            <AccountMenuItem>
                                <LinkItem component={RouteLink} to={'/logout'}>
                                    <ItemIcon>
                                        <Logout fontSize="small" />
                                    </ItemIcon>
                                    <TextItem>
                                        Iesire din aplicatie
                                    </TextItem>
                                </LinkItem>
                            </AccountMenuItem>
                        </AccountMenu>
                    </IconButtonWrapper >
                </IconButtonsContainer >
            </Toolbar >
        </NavBar >
    )
}

export default Navbar;