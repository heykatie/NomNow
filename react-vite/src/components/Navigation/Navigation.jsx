import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState} from "react";
import DropdownMenu from "./DropdownMenu";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [search, setSearch] = useState('');
  const location = useLocation().pathname.split('/');
  const homepage = location[location.length - 1] === 'home'

  console.log('DELIVERY TYPE:', deliveryType);  
  return (
    <ul className="nav">
      <li>
        {user ? <DropdownMenu user={user}/> : <DropdownMenu />}
      </li>
      <li>
        <NavLink to="/">Nom Now</NavLink>
      </li>
      {homepage && user ? (
        <li className="delivery-type">
          {deliveryType === 'delivery' ? (
            <button className="selected">Delivery</button>
            ) : (
            <button onClick={(e)=> {
              e.preventDefault()
              setDeliveryType('delivery')}}
            >Delivery</button>
          )}

          {deliveryType === 'pickup' ? (
            <button className="selected">Pickup</button>
            ) : (
            <button onClick={(e)=> {
              e.preventDefault()
              setDeliveryType('pickup')}}
            >Pickup</button>
          )}
        </li>
      ) : (
        <li className="delivery-type">
          Enter delivery address
        </li>
      )}

      <li>
        <input 
          type="search" 
          placeholder="Search Nom Now"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </li>

      <li className="user-actions">
        <NavLink to='/'>
          <button>Cart</button>
        </NavLink>
        {!user && (
          <li>
            <NavLink to='/login'>
              <button>Log in</button>
            </NavLink>
            <NavLink to='/signup'>
              <button>Sign up</button>
            </NavLink>
          </li>
          )}
      </li>
    </ul>
  );
}

export default Navigation;
