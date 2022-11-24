import styled from 'styled-components';
import { Comment } from '../types/HackerNews';
import { formatDistanceToNowStrict } from 'date-fns';

const Container = styled.div`
  padding: 14px;
  border-bottom: 2px solid #3d3d3d;
  font-size: 14px;
  letter-spacing: 0.4px;
`;

const Title = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;

const TitleUser = styled.span`
  font-weight: 600;
  color: #f67943;
`;

const Content = styled.div`
  a {
    color: #3f97e5;
  }
`;

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  const renderTimestamp = () => {
    return formatDistanceToNowStrict(new Date(comment.time * 1000), {
      addSuffix: true,
    });
  };
  return (
    <Container>
      <Title>
        <TitleUser>{comment.by}</TitleUser> · {renderTimestamp()}
      </Title>
      <Content dangerouslySetInnerHTML={{ __html: comment.text }} />
    </Container>
  );
}
