import './MenuItemList.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../../redux/menuItems';
import MenuItem from './MenuItem';

const MenuItemList = () => {
  const dispatch = useDispatch();
  const { menuItems, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Menu Items</h2>
      <div>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuItemList;
