import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 14px;
  border-bottom: 1px solid #3d3d3d;

  &:active {
    background-color: #3e77fb;
  }

  text-decoration: none;
  color: #ffffff;
`;

const Image = styled.div`
  background-color: #323233;
  border-radius: 5px;

  height: 70px;
  width: 70px;

  margin-right: 14px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;

  justify-content: center;
`;

const Line = styled.div`
  background-color: #323233;
  height: 12px;
  width: 100%;
  border-radius: 3px;
`;

const LineMid = styled(Line)`
  width: 50%;
`;

const LineShort = styled(Line)`
  width: 70%;
`;

const StoryItemSkeleton = () => {
  return (
    <Container>
      <Image />
      <Content>
        <LineMid />
        <Line />
        <Line />
        <LineShort />
      </Content>
    </Container>
  );
};

export default StoryItemSkeleton;
