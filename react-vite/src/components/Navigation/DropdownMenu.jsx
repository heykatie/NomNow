import React from "react";
import { useDispatch} from "react-redux";
import { thunkLogout } from "../../redux/session";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { useModal } from "../../context/Modal";

function DropdownMenu({ user }) {
  const dispatch = useDispatch();
  const ulRef = React.useRef(null); 
  const {closeModal} = useModal();

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeModal();
  };
  
  let content = (
      <div className='menu-dropdown' ref={ulRef}>
          <li><NavLink to='/login' onClick={closeModal}>Log in</NavLink></li>
          <li><NavLink to='/signup' onClick={closeModal}>Sign up</NavLink></li>
          <li><a href="">Add a Restaurant</a></li>
      </div>
  )
  if (user) {
    content = (
      <div className='menu-dropdown' ref={ulRef}>
          <li>{user.firstName} Profile</li>
          <li>Orders</li>
          <li>Favorites</li>
          <li>Wallet</li>
          <li>Meal Plan</li>
          <li>Help</li>
          <li>Promotions</li>
          <li>Invite a friend</li>
          <li><button onClick={logout}>Sign out</button></li>
          <li><a href="">Add a Restaurant</a></li>
      </div>
    )
  }

  return (
    <OpenModalMenuItem
      itemText={<img src="../../icons/menu.png" alt="" className='icon' />}
      modalComponent={content}
    />
  );
}

export default DropdownMenu;
