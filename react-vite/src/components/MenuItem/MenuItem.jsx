import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItem } from '../../redux/menuItems';
import { useParams } from 'react-router-dom';

const MenuItemDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const menuItem = useSelector((state) => state.menu.menuItem);

  useEffect(() => {
    dispatch(getMenuItem(id));
  }, [dispatch, id]);

  if (!menuItem) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{menuItem.name}</h1>
      <p>{menuItem.description}</p>
      <p>Price: ${menuItem.price}</p>
      <img src={menuItem.foodImage} alt={menuItem.name} />
    </div>
  );
};

export default MenuItemDetail;
