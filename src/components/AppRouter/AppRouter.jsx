import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'router/routes';

const basename = process.env.PUBLIC_URL;

const AppRouter = () => {
  const router = useMemo(() => createBrowserRouter(routes, { basename }), []);
  return <RouterProvider router={router} />;
};

export default AppRouter;
