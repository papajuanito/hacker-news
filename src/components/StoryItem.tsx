import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNowStrict } from 'date-fns';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUrlMetadata } from '../helpers/hackerNewsApi';
import { getUrlHostname } from '../helpers/url';
import { Story } from '../types/HackerNews';
import { BsArrowUpShort } from 'react-icons/bs';

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

const ContentTitle = styled.div`
  font-weight: 500;
  letter-spacing: 0.4px;
  margin: 0;
  margin-bottom: 8px;
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
  story: Story;
  index: number;
};

export default function StoryItem({ story, index }: Props) {
  const navigate = useNavigate();

  const handleOnClick = useCallback(() => {
    navigate(`/item/${story.id}`);
  }, [navigate, story]);

  const { data, isLoading } = useQuery({
    queryKey: [story.url],
    queryFn: () => getUrlMetadata(story.url),
  });

  const getHostnameWithFallback = useCallback(() => {
    if (story.type !== 'story' || !story.url) {
      return getUrlHostname('https://news.ycombinator.com');
    }

    return getUrlHostname(story.url);
  }, [story.url, story.type]);

  const renderImageContent = useCallback(() => {
    if (story.type !== 'story') {
      return getHostnameWithFallback().charAt(0);
    }

    if (isLoading || !data) {
      return getHostnameWithFallback().charAt(0);
    }

    // @ts-ignore
    if (!isLoading && !data.image) {
      return getHostnameWithFallback().charAt(0);
    }

    // @ts-ignore
    return <Image src={data.image} />;
  }, [data, isLoading, story.url, story.type]);

  const renderTimestamp = () => {
    return formatDistanceToNowStrict(new Date(story.time * 1000), {
      addSuffix: true,
    });
  };

  return (
    <Container onClick={handleOnClick}>
      <Content>
        <ImageContainer
          href={story.url}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {renderImageContent()}
        </ImageContainer>
      </Content>
      <Content>
        <ContentUrl>
          {++index}. <span>{getHostnameWithFallback()}</span>
        </ContentUrl>
        <ContentTitle>{story.title}</ContentTitle>
        <ContentItem>
          {story.by} · <span>{renderTimestamp()}</span>
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
