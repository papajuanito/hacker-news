import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  margin-bottom: 18px;
`;

const TitleContainer = styled.div`
  padding: 14px 14px 10px;
`;

const DateContainer = styled.p`
  margin: 0;
  padding: 0;

  letter-spacing: 1px;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 22px;
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
