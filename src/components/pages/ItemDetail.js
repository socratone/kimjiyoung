import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activateNav, disableNav } from '../../store/isNav';
import getImageURL from '../../helper/getImageURL';
import ImageViewer from '../common/ImageViewer';
import styles from './ItemDetail.module.scss';

const Image = ({ url }) => {
  const [isLarge, setIsLarge] = useState(false);
  const dispatch = useDispatch();

  const enlargeImage = () => {
    dispatch(disableNav());
    setIsLarge(true);
  };
  
  const reduceImage = () => {
    dispatch(activateNav());
    setIsLarge(false);
  };

  return (
    <div className={styles.imageWrap}>
      <div
        className={styles.image} 
        style={{backgroundImage: `url('${url}')`}}
        onClick={enlargeImage}
      />
      {isLarge && <ImageViewer url={url} onClick={reduceImage} />}
    </div>
  );
};

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

  const replaceToP = text => {
    const texts = text.split('\n');
    return texts.map((text, i) => <p key={i}>{text}</p>);
  }

  const { title, description, price, mainImage, subImages } = getCurrentItem();
  let subImagesArr;
  if (subImages) subImagesArr = subImages.split(',');

  return ( 
    <section className={styles.item}>
      <Image url={getImageURL(category + '/' + mainImage)}/>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <div className={styles.description}>{replaceToP(description)}</div>
        {price && <p className={styles.price}>{price.toLocaleString() + '원'}</p>}
      </div>
      {subImagesArr && subImagesArr.map((subImage, index) => (
        <Image url={getImageURL(category + '/' + subImage)} key={index}/>
      ))}
    </section>
  );
}
 
export default ItemDetail;