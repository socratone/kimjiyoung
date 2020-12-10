import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ItemDetail.module.scss';

import { sacredThings } from '../../fakeData';

const ItemDetail = () => {
  const { category, id } = useParams();

  const getCurrentItem = () => {
    const [ item ] = sacredThings[category].items.filter(item => {
      return item.id.toString() === id;
    });
    return item;
  }

  const { title, description, price, image } = getCurrentItem();

  return ( 
    <>
      <section className={styles.item}>

        <div className={styles.imageWrap}>
          <div
            className={styles.image} 
            style={{backgroundImage: `url('${image}')`}}/>
        </div>

        <div>
          <p className={styles.title}>{category}</p>
          <div className={styles.text}>
            <p className={styles.title}>{title}</p>
            <p>{price && price.toLocaleString() + '원'}</p>
          </div>
          <p>{description}</p>
        </div>
      </section>
    </>
  );
}
 
export default ItemDetail;