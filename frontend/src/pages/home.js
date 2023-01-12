import { styled } from '@mui/system';
import { Link as RouteLink } from 'react-router-dom';
import backgroundImage from '../images/background-image.jpg'

const MainContainer = styled('div')`
    background-image: url(${backgroundImage});
    background-size: cover;
`

const ContentWrapper = styled('div')`
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`

const ContentSection = styled('section')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
`

const Title = styled('h2')`
    margin: 0 0 10px 0;
    font-size: 55px;
`

const Divider = styled('hr')`
    width: 100%;
    border-top: 1px solid #fff;
`

const SubTitle = styled('h5')`
    margin: 10px 0 0 0;
    font-size: 25px;
    font-weight: 400;
`

const LinksContainer = styled('div')`
    margin-top: 20px;
    display: flex;
    gap: 20px;
`

const Link = styled(RouteLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    justify-content: center;
    border: 2px solid #fff;
    padding: 7px 0;
    width: 150px;
    color: #fff;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    transition: color 500ms ease-in-out;
    :before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background-color: #fff;
        transition: transform 500ms ease-in-out;
        transform: scaleX(0);
    }
    :hover:before{
        transform: scaleX(1);
    }
    :hover{
        color: #000;
    }
    z-index: 0;
`

const RegisterLink = styled(Link)`
    :before{
        transform-origin: left;
    }
`

const LoginLink = styled(Link)`
    :before{
        transform-origin: right;
    }
`

const Home = () => {
    console.log('RENDER HOME COMPONENT')

    return (
        <MainContainer>
            <ContentWrapper>
                <ContentSection>
                    <Title>
                        RideAssist
                    </Title>
                    <Divider />
                    <SubTitle>
                        Partajeaza si vezi experientele celorlalti utilizatori cu privire la mijloacele de transport
                    </SubTitle>
                    <LinksContainer>
                        <RegisterLink to='/register'>
                            Inregistrare
                        </RegisterLink>
                        <LoginLink to='/login'>
                            Autentificare
                        </LoginLink>
                    </LinksContainer>
                </ContentSection>
            </ContentWrapper>
        </MainContainer>
    )
}

export default Home