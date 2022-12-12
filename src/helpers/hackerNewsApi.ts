import {
  Category,
  Item,
  StoriesResponse,
  StoriesResponseDecorated,
  Story,
} from '../types/HackerNews';

const HACKER_NEWS_API_BASE_URL = ' https://hacker-news.firebaseio.com';

export const getStories = async (
  category: Category,
): Promise<StoriesResponse> => {
  const response = await fetch(
    `${HACKER_NEWS_API_BASE_URL}/v0/${category}.json`,
  );
  const body = await response.json();
  return body;
};

export const getStoriesPaginated = async (
  category: Category,
  offset: number = 0,
  limit: number = 20,
): Promise<number[]> => {
  const all = await getStories(category);
  return all.slice(offset, offset + limit);
}

export const getStoriesDecorated = async (
  category: Category,
  offset: number = 0,
  limit: number = 20,
): Promise<StoriesResponseDecorated> => {
  const stories = await getStories(category);
  return Promise.all(stories.slice(offset, offset + limit).map(getItem<Story>));
};

export const getItem = async <T = Item>(itemId: number): Promise<T> => {
  const response = await fetch(
    `${HACKER_NEWS_API_BASE_URL}/v0/item/${itemId}.json`,
  );

  return response.json();
};

export const getUrlMetadata = async (url: string) => {
  try {
    const response = await fetch(
      `/api/metadata?url=${encodeURIComponent(url)}`,
    );

    return response.json();
  } catch (e) {
    return {};
  }
};
