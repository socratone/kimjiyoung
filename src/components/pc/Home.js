import React from 'react';
import styles from './Home.module.scss';

const Home = () => {
  return ( 
    <div className={styles.mainWrap}>
      <div className={styles.mainBumper}></div>
      <main className={styles.main}>
        <p>홈 화면</p>
      </main> 
    </div>
  );
}
 
export default Home;