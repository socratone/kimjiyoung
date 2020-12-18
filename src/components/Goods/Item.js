import React from 'react';
import getImageURL from '../../helper/getImageURL';
import EditMenu from '../Goods/EditMenu';
import styles from './Item.module.scss';

const Item = ({ id, title, description, price, mainImage, category, onClick, isEditMenu }) => {
  return ( 
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{ backgroundImage: `url('${getImageURL(mainImage, category)}')` }}
          onClick={onClick}
        />
        {isEditMenu && <EditMenu category={category} id={id} />}
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p>{price && price.toLocaleString() + '원'}</p>
      </div>
    </article> 
  );
}
 
export default Item;