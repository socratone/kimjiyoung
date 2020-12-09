import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { disableBars } from '../../store/isBars';
import styles from './BarsNav.module.scss';

const BarsNav = () => {
  const dispatch = useDispatch();

  const removeNav = () => {
    dispatch(disableBars());
  };

  return ( 
    <div className={styles.navWrap}>
      <div className={styles.nonNav} onClick={() => removeNav()}/>
      <nav className={styles.nav}>
        <a className={styles.xButton} onClick={() => removeNav()}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </a>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link to="/profile" onClick={() => removeNav()}>Profile</Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin" onClick={() => removeNav()}>Admin</Link>
          </li>
          <li className={styles.li}>
            <Link to="/cross" onClick={() => removeNav()}>십자가</Link>
          </li>
          <li className={styles.li}>
            <Link to="/jesus" onClick={() => removeNav()}>예수님</Link>
          </li>
        </ul>
      </nav> 
    </div>
  );
}
 
export default BarsNav;