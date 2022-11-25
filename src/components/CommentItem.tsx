import styled, { css } from 'styled-components';
import { Comment } from '../types/HackerNews';
import { formatDistanceToNowStrict } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getItem } from '../helpers/hackerNewsApi';
import CommentItemSkeleton from './CommentItemSkeleton';

const Container = styled.div<{ parent: boolean }>`
  padding: 14px;
  padding-right: 0;
  padding-bottom: 0;
  font-size: 14px;
  letter-spacing: 0.4px;

  ${({ parent }) =>
    parent &&
    css`
      border-bottom: 3px solid #3d3d3d;
      padding-right: 14px;
    `}
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

  overflow: hidden;
  padding-bottom: 14px;
`;

const KidsContainer = styled(Container)`
  border-left: 3px solid #3d3d3d;
  padding: 0;
  height: 100%;
`;

type Props = {
  id: number;
  parent?: boolean;
};

export default function CommentItem({ id, parent = false }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => getItem<Comment>(id),
  });

  const renderTimestamp = (comment: Comment) => {
    return formatDistanceToNowStrict(new Date(comment.time * 1000), {
      addSuffix: true,
    });
  };

  const renderKids = (comment: Comment) => {
    if (!comment.kids || comment.kids.length <= 0) {
      return null;
    }

    return (
      <KidsContainer parent={false} className="wepate">
        {comment.kids.map((kid) => (
          <CommentItem key={`comment-${kid}`} id={kid} />
        ))}
      </KidsContainer>
    );
  };

  if (isLoading || !data) {
    return <CommentItemSkeleton />;
  }

  if (!data.text) {
    return null;
  }

  return (
    <Container parent={parent}>
      <Title>
        <TitleUser>{data.by}</TitleUser> · {renderTimestamp(data)}
      </Title>
      <Content dangerouslySetInnerHTML={{ __html: data.text }} />
      {renderKids(data)}
    </Container>
  );
}
