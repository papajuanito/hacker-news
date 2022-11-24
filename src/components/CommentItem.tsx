import styled from 'styled-components';
import { Comment } from '../types/HackerNews';

const Container = styled.div`
  padding: 14px;
  border-bottom: 2px solid #3d3d3d;
`;

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  return (
    <Container
      dangerouslySetInnerHTML={{
        __html: comment.text,
      }}
    />
  );
}
