import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import MenuItemList from '../components/MenuItemList';
import MenuItem from '../components/MenuItem';
import CreateMenuItem from '../components/CreateMenuItem';
import EditMenuItem from '../components/EditMenuItem';
import DeleteMenuItem from '../components/DeleteMenuItem';
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
        path: "home",
        element: <h1>Home Page</h1>,
      },
      {
        path: "*",
        element: <h1>404 Page Not Available</h1>,
      },
      {
        path: "menu-items",
        element: <MenuItemList />,
      },
      {
        path: "menu-items/:id",
        element: <MenuItem/>,
      },
      {
        path: "menu-items/new",
        element: <CreateMenuItem />,
      },
      {
        path: "menu-items/:id/edit",
        element: <EditMenuItem />,
      },
      {
        path: "menu-items/:id/delete",
        element: <DeleteMenuItem />,
      },

    ],
  },
]);