import { Navigate } from 'react-router-dom';
import NotFoundPage from 'pages/404';
import Layout from 'components/Layout';
import Contacts from 'pages/Contacts';
import AuthPage from 'pages/AuthPage';
import userApiSlice from 'redux/userApiSlice';
import { authGate, logout } from './loaders';

/** @type {import('react-router-dom').RouteObject[]} */
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/contacts" replace />,
      },
      {
        path: 'login',
        loader: authGate(authGate.modes.unauthorizedOnly),
        element: <AuthPage mode={userApiSlice.endpoints.login.name} />,
      },
      {
        path: 'register',
        loader: authGate(authGate.modes.unauthorizedOnly),
        element: <AuthPage mode={userApiSlice.endpoints.register.name} />,
      },
      {
        path: 'logout',
        loader: logout,
      },
      {
        path: 'contacts',
        loader: authGate(authGate.modes.authorizedOnly),
        element: <Contacts />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFoundPage />,
  },
];

export default routes;
