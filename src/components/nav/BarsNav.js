import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { disableBars } from '../../store/isBars';
import styles from './BarsNav.module.scss';

const BarsNav = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.entities.user.id);

  const removeNav = () => {
    dispatch(disableBars());
  };

  return ( 
    <div className={styles.navWrap}>
      <div className={styles.nonNav} onClick={() => removeNav()}/>
      <nav className={styles.nav}>
        <button className={styles.xButton} onClick={() => removeNav()}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link to="/profile" onClick={() => removeNav()}>Profile</Link>
          </li>
          {!userId && <li className={styles.li}>
            <Link to="/signup" onClick={() => removeNav()}>Signup</Link>
          </li>}
          {!userId && <li className={styles.li}>
            <Link to="/signin" onClick={() => removeNav()}>Signin</Link>
          </li>}
          {userId && <li className={styles.li}>
            <Link to="/signout" onClick={() => removeNav()}>Signout</Link>
          </li>}
          <li className={styles.li}>
            <Link to="/item/cross" onClick={() => removeNav()}>십자가</Link>
          </li>
          <li className={styles.li}>
            <Link to="/item/jesus" onClick={() => removeNav()}>예수님</Link>
          </li>
        </ul>
      </nav> 
    </div>
  );
}
 
export default BarsNav;