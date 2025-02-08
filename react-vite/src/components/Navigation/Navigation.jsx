import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <ul className="nav">
      <li>
        <img src="../../icons/menu.png" alt="" className='icon' />
      </li>
      <li>
        <NavLink to="/">Nom Now</NavLink>
      </li>

      {!user && (
        <li className="user-actions">
          <NavLink to='/login'>
            <button>Log in</button>
          </NavLink>
          <NavLink to='/signup'>
            <button>Sign up</button>
          </NavLink>
        </li>)}
    </ul>
  );
}

export default Navigation;
