import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getStoriesPaginated } from '../helpers/hackerNewsApi';
import { Category } from '../types/HackerNews';
import Header from './Header';
import StoryItem from './StoryItem';

const LIMIT = 10;

const Container = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow: scroll;
`;

export default function CategoryView() {
  const { categoryId = Category.TOP_STORIES } = useParams<{
    categoryId: Category;
  }>();

  const { data, isLoading, isPaused, fetchNextPage } = useInfiniteQuery({
    queryKey: [categoryId],
    queryFn: ({ pageParam = 0 }) => {
      return getStoriesPaginated(categoryId, pageParam, LIMIT);
    },
    getNextPageParam: (_, pages) => {
      return pages.flatMap((i) => i).length;
    },
  });

  const renderContent = () => {
    if (isPaused) {
      return <div>Offline. Please reconnect to try again</div>;
    }

    if (isLoading || !data) {
      return null;
    }

    const stories = data.pages.flatMap((i) => i);

    return (
      <InfiniteScroll
        dataLength={stories.length}
        loader={<div>loading</div>}
        hasMore={true}
        next={fetchNextPage}
        scrollableTarget="infinite-scrollable-container"
      >
        {stories.map((story, index) => (
          <StoryItem key={story} id={story} index={index} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <Container id="infinite-scrollable-container">
      <Header />
      {renderContent()}
    </Container>
  );
}
