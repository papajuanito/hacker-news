import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNowStrict } from 'date-fns';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getItem, getUrlMetadata } from '../helpers/hackerNewsApi';
import { getUrlHostname } from '../helpers/url';
import { Story } from '../types/HackerNews';
import { BsArrowUpShort } from 'react-icons/bs';
import StoryItemSkeleton from './StoryItemSkeleton';
import { storeItem, DB_STORE, hasItem } from '../helpers/storage';
import { staleTime } from './App';

const Container = styled.div`
  display: flex;

  padding: 14px;
  border-bottom: 1px solid #3d3d3d;

  &:active {
    background-color: #3e77fb;
  }

  text-decoration: none;
  color: #ffffff;
`;

const ImageContainer = styled.a`
  background-color: #4a5253;
  height: 70px;
  width: 70px;
  border-radius: 5px;

  border: none;

  margin-right: 14px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;

  text-decoration: none;
  text-transform: uppercase;

  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;

  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  span {
    color: #3f97e5;
    font-weight: 700;
    letter-spacing: 1.2;
  }
`;

const ContentUrl = styled.div`
  padding: 0;
  margin: 0;
  margin-bottom: 8px;

  font-size: 12px;
`;

const ContentTitle = styled.div<{ visited?: boolean }>`
  font-weight: 500;
  letter-spacing: 0.4px;
  margin: 0;
  margin-bottom: 8px;

  color: ${({ visited }) => (!visited ? '#ffffff' : '#4a5253')};
`;

const ContentItem = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;

  span {
    font-weight: 400;
    color: #ffffff;
  }
`;

type Props = {
  id: number;
  index: number;
};
const getHostnameWithFallback = (story: Story) => {
  if (story.type !== 'story' || !story.url) {
    return getUrlHostname('https://news.ycombinator.com');
  }

  return getUrlHostname(story.url);
};

const renderTimestamp = (story: Story) => {
  return formatDistanceToNowStrict(new Date(story.time * 100), {
    addSuffix: true,
  });
};

const StoryImage = ({ story }: { story: Story }) => {
  const { data: metadata, isLoading } = useQuery({
    queryKey: ['metadata', story.url],
    queryFn: () => getUrlMetadata(story.url),
    enabled: !!story.url,
  });

  const renderContent = useCallback(() => {
    if (story.type !== 'story') {
      return getHostnameWithFallback(story).charAt(0);
    }

    if (isLoading || !metadata) {
      return getHostnameWithFallback(story).charAt(0);
    }

    if (!isLoading && !metadata.image) {
      return getHostnameWithFallback(story).charAt(0);
    }

    return <Image src={metadata.image} />;
  }, [metadata, isLoading, story.url, story.type]);

  return (
    <ImageContainer
      href={story.url}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {renderContent()}
    </ImageContainer>
  );
};

export default function StoryItem({ id, index }: Props) {
  const { data: story, isLoading } = useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem<Story>(id),
  });

  const { data: visited, isRefetching: isRefetchingVisited } = useQuery({
    queryKey: ['item', 'visited', id],
    queryFn: async (): Promise<boolean> =>
      hasItem(DB_STORE.ITEM_HISTORY, id.toString()),
    refetchOnMount: true,
    staleTime: 0,
  });

  const navigate = useNavigate();

  const handleOnClick = useCallback(async () => {
    if (!story) return;

    await storeItem(
      DB_STORE.ITEM_HISTORY,
      story.id.toString(),
      story.id.toString(),
    );

    navigate(`/item/${story.id}`);
  }, [navigate, story]);

  if (!story || isLoading || visited === undefined || isRefetchingVisited) {
    return <StoryItemSkeleton />;
  }

  return (
    <Container onClick={handleOnClick}>
      <Content>
        <StoryImage story={story} />
      </Content>
      <Content>
        <ContentUrl>
          {++index}. <span>{getHostnameWithFallback(story)}</span>
        </ContentUrl>
        <ContentTitle visited={visited}>{story.title}</ContentTitle>
        <ContentItem>
          {story.by} · <span>{renderTimestamp(story)}</span>
        </ContentItem>
        <ContentItem
          style={{
            marginTop: '8px',
          }}
        >
          <BsArrowUpShort size={22} />
          {story.score} · {`${story.descendants} comments`}
        </ContentItem>
      </Content>
    </Container>
  );
}
