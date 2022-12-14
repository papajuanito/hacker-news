import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getItem, getUrlMetadata } from '../helpers/hackerNewsApi';
import { getUrlHostname } from '../helpers/url';
import { Story } from '../types/HackerNews';
import CommentItem from './CommentItem';
import { BsArrowUpShort, BsArrowLeft, BsShare } from 'react-icons/bs';
import { BiCommentX } from 'react-icons/bi';
import { formatDistanceToNowStrict } from 'date-fns';

const HACKER_NEWS_BASE_URL = 'https://news.ycombinator.com';

const Container = styled.div`
  height: 100%;
  overflow: scroll;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0 10px;
`;
const HeaderLeft = styled.div``;
const HeaderRight = styled.div``;

const MetadataContainer = styled.div`
  padding: 16px;
  padding-top: 0;

  border-bottom: 2px solid #3d3d3d;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.4px;

  padding: 0;
  margin-bottom: 12px;
`;

const Url = styled.a`
  text-decoration: none;
  color: #5a9bfe;
  font-size: 16px;
  letter-spacing: 0.4px;
  font-weight: 500;
`;

const Image = styled.img`
  width: 100%;
  max-height: 180px;
  min-height: 180px;
  border-radius: 5px;
  margin-top: 12px;

  object-fit: cover;
`;

const ContentItem = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;

  text-align: left;

  span {
    font-weight: 400;
    color: #ffffff;
  }
`;

const EmptyCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 40px 20px;
  font-size: 14px;
`;

const EmptyCommentsIcon = styled(BiCommentX)`
  margin-bottom: 14px;

  color: #3c4040;
`;

const ItemText = styled.p`
  font-size: 14px;
`;

const ItemImage = ({ item }: { item: Story }) => {
  const { data, isLoading } = useQuery({
    queryKey: [item.url],
    queryFn: () => getUrlMetadata(item.url),
  });

  if (isLoading || !data || !data.image) return null;

  return <Image src={data.image} />;
};

export default function ItemView() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['item', itemId],
    queryFn: () => getItem<Story>(parseInt(itemId!, 10)),
  });

  const renderComments = useCallback(() => {
    if (!data || !data.kids || data.kids.length <= 0) {
      return (
        <EmptyCommentsContainer>
          <EmptyCommentsIcon size={48} />
          No one has commented yet
        </EmptyCommentsContainer>
      );
    }

    return data.kids.map((comment) => (
      <CommentItem key={comment} id={comment} parent />
    ));
  }, [data]);

  const renderCommentCountOrDate = () => {
    if (!data) return null;

    if (!data.kids || data.kids.length <= 0) {
      return formatDistanceToNowStrict(new Date(data.time * 1000), {
        addSuffix: true,
      });
    }

    return `${data.descendants} comments`;
  };

  const handleShareClick = async () => {
    if (!navigator.canShare || !data) return;

    const url = data.url ?? `${HACKER_NEWS_BASE_URL}/item?id=${itemId}`;

    try {
      await navigator.share({
        title: data.title,
        text: data.title,
        url,
      });
    } catch (e) {
      alert(e);
    }
  };

  if (!data || isLoading) return null;

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BsArrowLeft
            size={24}
            onClick={() => {
              navigate(-1);
            }}
          />
        </HeaderLeft>
        <HeaderRight>
          {!!navigator.canShare && (
            <BsShare size={20} onClick={handleShareClick} />
          )}
        </HeaderRight>
      </Header>
      <MetadataContainer>
        <Title>{data.title}</Title>
        {data.url && <Url href={data.url}>{getUrlHostname(data.url)}</Url>}
        <ItemImage item={data} />
        {data.text && (
          <ItemText dangerouslySetInnerHTML={{ __html: data.text }} />
        )}
        <ContentItem
          style={{
            marginTop: '8px',
          }}
        >
          <BsArrowUpShort size={22} />
          {data.score} ?? {data.by} ?? {renderCommentCountOrDate()}
        </ContentItem>
      </MetadataContainer>
      {renderComments()}
    </Container>
  );
}
