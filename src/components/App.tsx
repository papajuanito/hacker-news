import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import styled from 'styled-components';
import { getStoriesPaginated } from '../helpers/hackerNewsApi';
import { Category } from '../types/HackerNews';
import CategoryView from './CategoryView';
import Footer from './Footer';
import ItemView from './ItemView';
import ScrollContextProvider from './ScrollContextProvider';

const LIMIT = 10;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

// One hour of query staleness
export const staleTime = 1000 * 60 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime,
    },
  },
});

const categoryLoader: LoaderFunction = ({ params }) => {
  const { categoryId = Category.TOP_STORIES } = params;
  return queryClient.fetchInfiniteQuery({
    queryKey: [categoryId],
    queryFn: ({ pageParam = 0 }) => {
      return getStoriesPaginated(categoryId as Category, pageParam, LIMIT);
    },
  });
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <CategoryView />,
    loader: categoryLoader,
  },
  {
    path: '/:categoryId',
    element: <CategoryView />,
    loader: categoryLoader,
  },
  {
    path: '/item/:itemId',
    element: <ItemView />,
  },
]);

// This will be the App shell for our application.
// This should include everything that can be loaded in an offline state for our PWA.
// e.g. Header, Navbar, Footer, etc
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Content>
          <ScrollContextProvider>
            <RouterProvider router={router} />
          </ScrollContextProvider>
        </Content>
        <Footer />
      </Container>
    </QueryClientProvider>
  );
}
