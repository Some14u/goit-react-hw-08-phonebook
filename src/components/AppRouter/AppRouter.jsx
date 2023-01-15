import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'router/routes';

const AppRouter = () => {
  const router = useMemo(() => createBrowserRouter(routes), []);
  return <RouterProvider router={router} />;
};

export default AppRouter;
