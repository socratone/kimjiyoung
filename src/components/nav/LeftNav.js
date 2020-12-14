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
  );
}
 
export default LeftNav;