import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  margin-bottom: 18px;
`;

const TitleContainer = styled.div`
  padding: 14px;
`;

const DateContainer = styled.p`
  margin: 0;
  margin-bottom: 4px;
  padding: 0;

  letter-spacing: 1px;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 26px;
`;

const getFormattedDate = () =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

export default function Header() {
  return (
    <Container>
      <TitleContainer>
        <DateContainer>{getFormattedDate()}</DateContainer>
        <Title>Hacker News</Title>
      </TitleContainer>
      <Navbar />
    </Container>
  );
}
