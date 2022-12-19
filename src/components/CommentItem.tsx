import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Comment } from '../types/HackerNews';
import { formatDistanceToNowStrict } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getItem } from '../helpers/hackerNewsApi';
import CommentItemSkeleton from './CommentItemSkeleton';

const Container = styled.div<{ parent: boolean; visible: boolean }>`
  padding: 10px;
  padding-right: 0;
  padding-bottom: 0;
  font-size: 14px;
  letter-spacing: 0.4px;

  ${({ parent }) =>
    parent &&
    css`
      border-bottom: 2px solid #3d3d3d;
      padding-right: 10px;
    `}

  ${({ visible }) =>
    !visible &&
    css`
      background-color: #353737;
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

const ContentContainer = styled.div<{ visible: boolean }>`
  overflow: hidden;
  transition: max-height 300ms ease-in-out;
  max-height: ${({ visible }) => (visible ? '10000px' : '200px')};

  ${({ visible }) =>
    !visible &&
    css`
      max-height: 0;
    `}
`;

const Content = styled.div`
  a {
    color: #3f97e5;
  }

  overflow: hidden;
  padding-bottom: 10px;
`;

const KidsContainer = styled.div`
  border-left: 2px solid #3d3d3d;
  padding: 0;
  height: 100%;
`;

type Props = {
  id: number;
  parent?: boolean;
};

export default function CommentItem({ id, parent = false }: Props) {
  const [visible, setVisible] = useState(true);

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
      <KidsContainer>
        {comment.kids.map((kid) => (
          <CommentItem key={`comment-${kid}`} id={kid} />
        ))}
      </KidsContainer>
    );
  };

  const toggleVisibility = () => {
    setVisible((v) => {
      return !v;
    });
  };

  if (isLoading || !data) {
    return <CommentItemSkeleton />;
  }

  if (!data.text) {
    return null;
  }

  return (
    <Container parent={parent} visible={visible} onClick={toggleVisibility}>
      <Title>
        <TitleUser>{data.by}</TitleUser> · {renderTimestamp(data)}
      </Title>
      <ContentContainer visible={visible}>
        <Content dangerouslySetInnerHTML={{ __html: data.text }} />
        {renderKids(data)}
      </ContentContainer>
    </Container>
  );
}
