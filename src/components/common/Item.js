import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setCurrentItem } from '../../store/currentItem';
import styles from './Item.module.scss';

const Item = ({ id, title, description, price, image, category }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const showItemDetail = () => {
    dispatch(setCurrentItem({ id, title, description, price, image, category }));
    history.push(`/item/${category}/${id}`);
  };
  
  return ( 
    <article className={styles.item} onClick={() => showItemDetail()}>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{backgroundImage: `url('${image}')`}}/>
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p>{price && price.toLocaleString() + '원'}</p>
      </div>
    </article> 
  );
}
 
export default Item;