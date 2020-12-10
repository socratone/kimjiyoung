import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LeftNav.module.scss';

const LeftNav = () => {
  return ( 
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to="/item/cross">십자가</Link>
        </li>
        <li className={styles.li}>
          <Link to="/item/jesus">예수님</Link>
        </li>
      </ul>
    </nav>
  );
}
 
export default LeftNav;