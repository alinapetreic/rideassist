import { styled } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";

const CircularSpinnerWrapper = styled(({height, ...rest}) => <div {...rest}/>)`
    position: relative;
    display: inline-flex;
    height: ${({height}) => height ? height : 'calc(100vh - 64px)'};
    width: 100%;
    justify-content: center;
    align-items: center;
`

const TextWrapper = styled('div')`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CircularProgressSpinner = styled(({color, ...rest}) => <CircularProgress {...rest}/>)`
    color: ${({color}) => color ? color : '#1976d2'};
`

const Text = styled(({color, fontSizeText, ...rest}) => <span {...rest}/>)`
    color: ${({color}) => color ? color : '#1976d2'};
    font-size: ${({fontSizeText}) => fontSizeText ? fontSizeText : '16px'};
`;

function CircularSpinner({sizeSpinner, fontSizeText, text, color, heightWrapper}) {
    return (
        <CircularSpinnerWrapper height={heightWrapper}>
            <CircularProgressSpinner size={sizeSpinner ? sizeSpinner : 100} color={color}/>
            { 
                text ?
                    <TextWrapper>
                        <Text color={color} fontSizeText={fontSizeText}>
                            {text}
                        </Text>
                    </TextWrapper>
                : null
            }
        </CircularSpinnerWrapper>
    )
}
  
export default CircularSpinner;