import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ItemDetail.module.scss';

const ItemDetail = () => {
  const { category, id } = useParams();
  const sacredThings = useSelector(state => state.entities.sacredThings); 
  
  if (!sacredThings[category]) return null;

  const getCurrentItem = () => {
    const [ item ] = sacredThings[category].items.filter(item => {
      return item.id.toString() === id;
    });
    return item;
  }

  const { title, description, price, mainImage } = getCurrentItem();

  return ( 
    <section className={styles.item}>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{backgroundImage: `url('${mainImage}')`}}
        />
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        {price && <p className={styles.price}>{price.toLocaleString() + '원'}</p>}
      </div>
    </section>
  );
}
 
export default ItemDetail;