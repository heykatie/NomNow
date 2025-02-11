import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import Layout from './Layout';
import WalletPage from '../components/WalletPage/WalletPage';
import Orders from '../components/Orders';


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
        path: "home",
        element: <h1>Home Page</h1>,
      },
      {
        path: "wallet",
        element: <WalletPage />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "*",
        element: <h1>404 Page Not Available</h1>,
      },

    ],
  },
]);