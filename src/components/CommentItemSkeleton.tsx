import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  gap: 8px;

  padding: 14px;

  text-decoration: none;
  color: #ffffff;
`;

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Line = styled.div<{ width?: string }>`
  background-color: #323233;
  height: 12px;
  width: ${({ width = '100%' }) => width};
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

const CommentItemSkeleton = () => {
  return (
    <Container>
      <Line width="20%" />
      <Line />
      <Line width="90%" />
      <Line />
      <Line width="80%" />
      <Line width="85%" />
    </Container>
  );
};

export default CommentItemSkeleton;
