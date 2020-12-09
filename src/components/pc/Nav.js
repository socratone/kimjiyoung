import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav = () => {
  return ( 
    <header className={styles.header}>
      <div className={styles.title}>
        <Link to="/">Kim ji young</Link>
      </div>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to="/profile">Profile</Link>
        </li>
        <li className={styles.li}>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </header> 
  );
}
 
export default Nav;