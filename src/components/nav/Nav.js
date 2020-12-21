import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activateBars } from '../../store/isBars';
import MenuIcon from '../icon/MenuIcon';
import styles from './Nav.module.scss';

const Nav = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.entities.user.id);
  const isNav = useSelector(state => state.ui.isNav); 
  if (!isNav) return null;

  const barsClick = () => {
    dispatch(activateBars());
  };

  return ( 
    <header className={styles.header}>
      <div className={styles.title}>
        <Link to="/">Kim ji young</Link>
      </div>
      <button className={styles.bars} onClick={barsClick}>
        <MenuIcon size={20} />
      </button>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to="/profile">Profile</Link>
        </li>
        {!userId && <li className={styles.li}>
          <Link to="/signin">Signin</Link>
        </li>}
        {userId && <li className={styles.li}>
          <Link to="/signout">Signout</Link>
        </li>}
      </ul>
    </header> 
  );
}
 
export default Nav;