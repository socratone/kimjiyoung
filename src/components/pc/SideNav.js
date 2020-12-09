import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideNav.module.scss';

const SideNav = () => {
  return ( 
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to="/">Crux</Link>
        </li>
      </ul>
    </nav>
  );
}
 
export default SideNav;