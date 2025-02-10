import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../../redux/menuItems'
import { Link } from 'react-router-dom';

const MenuItemList = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.menuItems);
  
  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  return (
    <div>
      <h1>Menu Items</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link to={`/menu-items/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemList;
