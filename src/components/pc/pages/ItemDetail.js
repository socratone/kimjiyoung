import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ItemDetail.module.scss';

const ItemDetail = () => {
  const location = useLocation();

  let currentItem = location.state;
  if (!currentItem) {
    // fakeData
    currentItem = {
      id: 3,
      title: '바로 접근했을 때',
      description: '나타나게 됩니다.',
      price: 10000,
      image: 'https://picsum.photos/299',
      category: 'null'
    }
  }
  const { title, description, price, image, category } = currentItem;

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