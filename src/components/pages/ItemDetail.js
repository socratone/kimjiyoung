import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activateNav, disableNav } from '../../store/isNav';
import getImageURL from '../../helper/getImageURL';
import ImageViewer from '../common/ImageViewer';
import Button from '../common/Button';
import BlankItem from '../ItemDetail/BlankItem';
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
    <article>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{backgroundImage: `url('${url}')`}}
          onClick={enlargeImage}
        />
        {isLarge && <ImageViewer url={url} onClick={reduceImage} />}
      </div>
    </article>
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

  const { title, description, smartStore, price, mainImage, subImages } = getCurrentItem();
  let subImagesArr;
  if (subImages) subImagesArr = subImages.split(',');

  const goPurchaseSite = () => {
    window.open(smartStore);
  };

  return ( 
    <section className={styles.item}>
      <Image url={getImageURL(category + '/' + mainImage)}/>
      <article className={styles.text}>
        <p className={styles.title}>{title}</p>
        <div className={styles.description}>{replaceToP(description)}</div>
        <div className={styles.purchaseWrap}>
          {smartStore && <Button width="96px" onClick={() => goPurchaseSite()}>구매하러가기</Button>}
          {price && <p className={styles.price}>{price.toLocaleString() + '원'}</p>}
        </div>
      </article>
      <BlankItem category={category} id={id} />
      {subImagesArr && subImagesArr.map((subImage, index) => (
        <Image url={getImageURL(category + '/' + subImage)} key={index}/>
      ))}
    </section>
  );
}
 
export default ItemDetail;