import React from 'react';
import styles from './Profile.module.scss';

const image = 'https://picsum.photos/200';

const Profile = () => {
  return ( 
    <section className={styles.section}>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{backgroundImage: `url('${image}')`}}
        />
      </div>
      <div className={styles.text}>
        <p>정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.</p>
      </div>
    </section> 
  );
}
 
export default Profile;