import React from 'react';
import styles from './Home.module.scss';

const Profile = () => {
  return ( 
    <div className={styles.mainWrap}>
      <div className={styles.mainBumper}></div>
      <main className={styles.main}>
        <p>프로필 화면</p>
      </main> 
    </div>
  );
}
 
export default Profile;