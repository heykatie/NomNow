import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import Layout from './Layout';
import Reviews from '../components/Reviews';
import WalletPage from '../components/WalletPage/WalletPage';
import Orders from '../components/Orders';
import MenuItemList from '../components/MenuItemList/MenuItemList';
import MenuItemDetail from '../components/MenuItemDetail/MenuItemDetail';
// import MenuItemForm from '../components/MenuItemForm/MenuItemForm';
import MenuItemCreate from '../components/MenuItemCreate';
import UpdateMenuItem from '../components/MenuItemUpdate/MenuItemUpdate';
// import MenuItem from '../components/MenuItem/MenuItem';
import DeleteMenuItem from '../components/MenuItemDelete';
import AddRestaurant from '../components/CreateRestaurant/AddRestaurant';
import ManageRestaurants from '../components/ManageRestaurants/ManageRestaurants';
import Checkout from '../components/Checkout';

import {AccountFormPage, NameFormPage, PhoneNumberPage, EmailPage} from '../components/AccountFormPage'

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <LandingPage />,
			},
			{
				path: 'login',
				element: <LoginFormPage isLogin={true} />,
			},
			{
				path: 'signup',
				element: <LoginFormPage isSignup={true} />,
			},
			{
				path: 'account',
				element: <AccountFormPage />,
			},
			{
				path: 'account/name',
				element: <NameFormPage />,
			},
			{
				path: 'account/phone',
				element: <PhoneNumberPage />,
			},
			{
				path: 'account/email',
				element: <EmailPage />,
			},
			{
				path: 'wallet',
				element: <WalletPage />,
			},
			{
				path: 'orders',
				element: <Orders />,
			},
			{
				path: 'reviews/:restaurantId',
				element: <Reviews />,
			},
			{
				path: '*',
				element: <h1>404 Page Not Available</h1>,
			},
			{
				path: 'menu-items',
				element: <MenuItemList />,
			},
			{
				path: 'menu-items/:id',
				element: <MenuItemDetail />,
			},
			{
				path: 'menu-items/new',
				element: <MenuItemCreate />,
			},
			{
				path: 'menu-items/:id/update',
				element: <UpdateMenuItem />,
			},
			{
				path: 'menu-items/:id/delete',
				element: <DeleteMenuItem />,
			},
			{
				path: 'restaurants/new', //If Logged in Navigates to Add Restaurant Form. If not, to Signup/Login.
				element: <AddRestaurant />,
			},
			{
				path: 'restaurants/manage', //If Logged in Navigates to Add Restaurant Form. If not, to Signup/Login.
				element: <ManageRestaurants />,
			},
			{
				path: 'checkout',
				element: <Checkout />,
			},
			{
				path: '*',
				element: <h1>404 Page Not Available</h1>,
			},
		],
	},
]);
