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

  const { title, description, price, mainImage, subImages } = getCurrentItem();
  let subImagesArr;
  if (subImages) subImagesArr = subImages.split(',');

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
      {subImagesArr && subImagesArr.map((image, index) => (
        <div className={styles.imageWrap} key={index}>
          <div
            className={styles.image} 
            style={{backgroundImage: `url('${image}')`}}
          />
        </div>
      ))}
    </section>
  );
}
 
export default ItemDetail;