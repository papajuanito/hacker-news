import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUrlMetadata } from '../helpers/hackerNewsApi';
import { getUrlHostname } from '../helpers/url';
import { Story } from '../types/HackerNews';

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
  height: 80px;
  width: 80px;
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
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-weight: 500;
  letter-spacing: 0.4px;
`;

type Props = {
  story: Story;
  loading?: boolean;
};

export default function StoryItem({ story }: Props) {
  const navigate = useNavigate();

  const handleOnClick = useCallback(() => {
    navigate(`/item/${story.id}`);
  }, [navigate, story]);

  const { data, isLoading } = useQuery({
    queryKey: [story.url],
    queryFn: () => getUrlMetadata(story.url),
  });

  const renderImageContent = useCallback(() => {
    if (isLoading || !data) {
      const hostname = getUrlHostname(story.url);
      return hostname.charAt(0);
    }

    // @ts-ignore
    if (!isLoading && !data.image) {
      const hostname = getUrlHostname(story.url);
      return hostname.charAt(0);
    }

    // @ts-ignore
    return <Image src={data.image} />;
  }, [data, isLoading, story.url]);

  return (
    <Container onClick={handleOnClick}>
      <ImageContainer
        href={story.url}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {renderImageContent()}
      </ImageContainer>
      <Content>
        <Title>{story.title}</Title>
      </Content>
    </Container>
  );
}
