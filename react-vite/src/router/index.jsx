import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage isLogin={true} />,
      },
      {
        path: "signup",
        element: <LoginFormPage isSignup={true} />,
      },
      {
        path: "*",
        element: <h1>404 Page Not Available</h1>,
      },
    ],
  },
]);