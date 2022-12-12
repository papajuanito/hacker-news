import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryView from './CategoryView';
import ItemView from './ItemView';

// One hour of query staleness
const staleTime = 1000 * 60 * 60;

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <CategoryView />,
  },
  {
    path: '/:categoryId',
    element: <CategoryView />,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
