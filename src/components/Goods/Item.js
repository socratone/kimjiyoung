import React from 'react';
import { useSelector } from 'react-redux';
import getImageURL from '../../helper/getImageURL';
import EditMenu from '../Goods/EditMenu';
import styles from './Item.module.scss';

const Item = ({ id, title, description, price, mainImage, category, onClick, isEditMenu }) => {
  const account = useSelector(state => state.entities.user.account);

  return ( 
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{ backgroundImage: `url('${getImageURL(mainImage, category)}')` }}
          onClick={onClick}
        />
        {isEditMenu && account === 'admin' && 
          <EditMenu category={category} id={id} />}
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p>{price && price.toLocaleString() + '원'}</p>
      </div>
    </article> 
  );
}
 
export default Item;