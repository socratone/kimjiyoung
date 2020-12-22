import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getImageURL from '../../helper/getImageURL';
import convertTextToJSX from '../../helper/convertTextToJSX';
import Button from '../common/Button';
import BlankItem from '../ItemDetail/BlankItem';
import Image from '../ItemDetail/Image';
import styles from './ItemDetail.module.scss';

const ItemDetail = () => {
  const { category, id } = useParams();
  const sacredThings = useSelector(state => state.entities.sacredThings);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [smartStore, setSmartStore] = useState('');
  const [price, setPrice] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [subImages, setSubImages] = useState('');

  const account = useSelector(state => state.entities.user.account);

  // URL로 direct 진입시 서버에서 sacredThings를 불러오고 나서 state 설정
  useEffect(() => {
    if (!sacredThings[category]) return;
    const [item] = sacredThings[category].items.filter(item => {
      return item.id.toString() === id;
    });
    if (!item) return;
    const { title, description, smartStore, price, mainImage, subImages } = item;
    setTitle(title);
    setDescription(description);
    setSmartStore(smartStore);
    setPrice(price);
    setMainImage(mainImage);
    setSubImages(subImages);
  }, [sacredThings])

  const goPurchaseSite = () => {
    window.open(smartStore);
  };
  
  return ( 
    <section>
      <div className={styles.mainWrap}>
        {mainImage && <Image isEditMenu={false} url={getImageURL(category + '/' + mainImage)}/>}
        <article className={styles.text}>
          <p className={styles.title}>{title}</p>
          <div className={styles.description}>
            {convertTextToJSX(description)}
          </div>
          <div className={styles.purchaseWrap}>
            {smartStore && <Button width="96px" onClick={() => goPurchaseSite()}>구매하러가기</Button>}
            {price && <p className={styles.price}>{price.toLocaleString() + '원'}</p>}
          </div>
        </article>
      </div>
      <div className={styles.subWrap}>
        {account === 'admin' && <BlankItem subImages={subImages} />}
        {subImages && subImages.split(',').map((subImage, index) => (
          <Image url={getImageURL(category + '/' + subImage)} name={subImage} key={index}/>
        ))}
      </div>
    </section>
  );
}
 
export default ItemDetail;