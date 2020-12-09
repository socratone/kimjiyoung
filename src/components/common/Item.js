import React from 'react';
import styles from './Item.module.scss';

const Item = ({ title, description, price, image }) => {
  return ( 
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{backgroundImage: `url('${image}')`}}/>
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p>{price}</p>
      </div>
    </article> 
  );
}
 
export default Item;