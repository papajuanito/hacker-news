import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { getStoriesPaginated } from '../helpers/hackerNewsApi';
import { Category } from '../types/HackerNews';
import Header from './Header';
import StoryItem from './StoryItem';

const LIMIT = 10;

export default function CategoryView() {
  const { categoryId = Category.TOP_STORIES } =
    useParams<{ categoryId: Category }>();

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
      >
        {stories.map((story, index) => (
          <StoryItem key={story} id={story} index={index} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div>
      <Header />
      {renderContent()}
    </div>
  );
}
