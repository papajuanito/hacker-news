import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { ReactNode, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getStoriesPaginated } from '../helpers/hackerNewsApi';
import { Category } from '../types/HackerNews';
import Header from './Header';
import { useScrollPosition } from './ScrollContextProvider';
import StoryItem from './StoryItem';

const LIMIT = 10;

const Container = styled.div<{ shouldRender?: boolean }>`
  flex-grow: 1;
  overflow: scroll;

  opacity: ${({ shouldRender }) => (shouldRender ? '1' : '0')};
`;

export default function CategoryView() {
  const [shouldRender, setShouldRender] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { categoryId = Category.TOP_STORIES } = useParams<{
    categoryId: Category;
  }>();

  const { scrollPosition, setScrollPosition } = useScrollPosition();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!scrollContainerRef.current) return;

      scrollContainerRef.current.scrollTo({
        top: scrollPosition,
      });

      setShouldRender(true);

      return () => {
        clearTimeout(timeout);
      };
    }, 100);
  }, [scrollPosition]);

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
          <div
            key={story}
            onClick={() => {
              if (!scrollContainerRef.current) return;
              setScrollPosition(scrollContainerRef.current.scrollTop);
            }}
          >
            <StoryItem id={story} index={index} />
          </div>
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <Container
      id="infinite-scrollable-container"
      ref={scrollContainerRef}
      shouldRender={shouldRender}
    >
      <Header />
      {renderContent()}
    </Container>
  );
}
