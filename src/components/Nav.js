import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activateBars } from '../store/isBars';
import styles from './Nav.module.scss';

const Nav = () => {
  const dispatch = useDispatch();

  const barsClick = () => {
    dispatch(activateBars());
  };

  return ( 
    <header className={styles.header}>
      <div className={styles.title}>
        <Link to="/">Kim ji young</Link>
      </div>
      <a className={styles.bars} onClick={barsClick}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </a>
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