import { useState, useEffect, useRef } from "react";
import { useDispatch} from "react-redux";
import { thunkLogout } from "../../redux/session";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";

function DropdownMenu({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  let content = (
      <div className='menu-dropdown' ref={ulRef}>
          <li><NavLink to='/login'>Log in</NavLink></li>
          <li><NavLink to='/signup'>Sign up</NavLink></li>
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
      onItemClick={closeMenu}
      modalComponent={content}
    />
  );
}

export default DropdownMenu;
