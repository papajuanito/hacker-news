import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 160px;

  padding: 14px;
  border-bottom: 1px solid #3d3d3d;

  &:active {
    background-color: #3e77fb;
  }

  text-decoration: none;
  color: #ffffff;
`;

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Image = styled.div`
  background-color: #323233;
  border-radius: 5px;

  height: 70px;
  width: 70px;

  margin-right: 14px;

  position: relative;
  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(82, 82, 82, 0) 0,
      rgba(82, 82, 82, 0.2) 20%,
      rgba(82, 82, 82, 0.5) 40%,
      rgba(82, 82, 82, 0)
    );
    animation: ${shimmer} 2s infinite;
    content: '';
  }
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

  position: relative;
  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(82, 82, 82, 0) 0,
      rgba(82, 82, 82, 0.2) 20%,
      rgba(82, 82, 82, 0.5) 40%,
      rgba(82, 82, 82, 0)
    );
    animation: ${shimmer} 2s infinite;
    content: '';
  }
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
