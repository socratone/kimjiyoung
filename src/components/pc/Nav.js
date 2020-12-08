import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return ( 
    <nav>
      <div>
        <Link to="/">Kim ji young</Link>
      </div>

      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav> 
  );
}
 
export default Nav;