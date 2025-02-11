import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import WalletPage from '../components/WalletPage/WalletPage';
import AddRestaurant from '../components/ManageRestaurantPages/AddRestaurantForm';
import ManageRestaurants from '../components/ManageRestaurantPages/ManageRestaurants';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "restaurants/new",  //If Logged in Navigates to Add Restaurant Form. If not, to Signup/Login. 
        element: <AddRestaurant />
      },
      {
        path: "restaurants/manage",  //If Logged in Navigates to Add Restaurant Form. If not, to Signup/Login. 
        element: <ManageRestaurants />
      },

      {
        path: "*",
        element: <h1>404 Page Not Available</h1>,
      },

    ],
  },
]);