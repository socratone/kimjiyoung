import React from 'react';
import { useHistory } from "react-router-dom";
import styles from './Item.module.scss';

const Item = ({ id, title, description, price, image, category }) => {
  const history = useHistory();

  const showItemDetail = () => {
    history.push({
      pathname: `/item/${category}/${id}`,
      state: { id, title, description, price, image, category }
    });
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