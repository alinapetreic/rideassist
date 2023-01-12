import { Article, Code, Leaderboard, Psychology, Quiz, School } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Card from '../components/card';

const MainContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 64px);
`

const CardsContainer = styled('div')`
    width: 100%;
    height: 100%;
    max-width: 1300px;
    max-height: 1200px;
    padding: 50px 0;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-template-rows: repeat(3, 1fr);
`

function Dashboard() {
    return (
        <MainContainer>
            <CardsContainer>
                <Card name='Laboratoare' icon={<School/>} href='/laboratories' tooltipTitle='Sectiunea de exercitii'/>
                <Card name='Antrenament' icon={<Psychology/>} href='/training' tooltipTitle='Sectiunea de antrenament'/>
                <Card name='Teme' icon={<Article/>} href='/homeworks' tooltipTitle='Sectiunea de teme'/>
                <Card name='Teste' icon={<Code/>} href='/tests' tooltipTitle='Sectiunea de teste'/>
                <Card name='Chestionare' icon={<Quiz/>} href='/quizzes' tooltipTitle='Sectiunea de chestionare'/>
                <Card name='Statistici' icon={<Leaderboard/>} href='/statistics' tooltipTitle='Sectiunea de statistici'/>
            </CardsContainer>
        </MainContainer>
    )
}

export default Dashboard;