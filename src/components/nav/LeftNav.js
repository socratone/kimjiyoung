import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from '../icon/InstagramIcon';
import KakaoIcon from '../icon/KakaoIcon';
import styles from './LeftNav.module.scss';

const LeftNav = () => {
  return ( 
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to="/item/statue">성상</Link>
        </li>
        <li className={styles.li}>
          <Link to="/item/cross">십자가</Link>
        </li>
        <li className={styles.li}>
          <Link to="/item/tools">기도소품</Link>
        </li>
        <li className={styles.li}>
          <a href="http://blog.naver.com/larahouse" target="_blank" rel="noreferrer">블로그</a>
        </li>
        <li className={styles.li}>
          <a href="https://www.instagram.com/lara_house" target="_blank" rel="noreferrer">
            <InstagramIcon size={14} />
          </a>
        </li>
        <li className={styles.li}>
          <a href="https://pf.kakao.com/_aCPLxl" target="_blank" rel="noreferrer">
            <KakaoIcon size={14} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
 
export default LeftNav;