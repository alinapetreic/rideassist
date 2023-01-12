import { Info } from "@mui/icons-material";
import { Tooltip, Link } from "@mui/material";
import { styled } from '@mui/system';
import { Link as RouteLink } from "react-router-dom";

const MainContainer = styled('div')`
    display: flex;
`

const CardLink = styled((props) => (<Link component={RouteLink} {...props}/>))`
    background: linear-gradient(to bottom right ,#02203c,#001528);
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 250px;
    border-radius: 4px;
    color: #fff;
    text-decoration: none;
`

const InfoIconWrapper = styled('div')`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
`

const IconContainerWrapper = styled('div')`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const IconContainer = styled('div')`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #15314b;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
        font-size: 64px;
        color: #fff;
    }
`

const Text = styled('p')`
    color: #fff;
    margin: 0;
    font-size: 17px;
`

const TextWrapper = styled('div')`
    padding: 15px;
`

const IconTooltip = styled(({className, ...rest}) => (
    <Tooltip classes={{tooltip: className}} {...rest}/>
))`
    background-color: #fff;
    color: #02203c;
    font-size: 13px;
    box-shadow: 5px 5px 5px rgb(0 0 0 / 50%);
    font-weight: 700;
    padding: 5px 10px;
    & .MuiTooltip-arrow {
        color: #fff;
    }
`

const Card = ({name, icon, href, tooltipTitle}) => {
    return ( 
        <MainContainer>
            <CardLink component={RouteLink} to={href}> 
                <InfoIconWrapper>
                    <IconTooltip arrow title={tooltipTitle}>
                        <Info/>
                    </IconTooltip>
                </InfoIconWrapper>
                <IconContainerWrapper>
                    <IconContainer>
                        {icon}
                    </IconContainer>
                </IconContainerWrapper>
                <TextWrapper>
                    <Text>
                        {name}
                    </Text>
                </TextWrapper>
            </CardLink>
        </MainContainer>
    )
}

export default Card;