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
          <li className={styles.li}>
          <a href="https://www.instagram.com/lara_house" target="_blank">인스타그램</a>
          </li>
          <li className={styles.li}>
            <a href="http://blog.naver.com/larahouse" target="_blank">블로그</a>
          </li>
          <li className={styles.li}>
            <a href="https://pf.kakao.com/_aCPLxl" target="_blank">카카오톡</a>
          </li>
        </ul>
      </nav> 
    </div>
  );
}
 
export default BarsNav;