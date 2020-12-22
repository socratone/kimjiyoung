import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateNav, disableNav } from '../../store/isNav';
import ImageViewer from '../common/ImageViewer';
import ItemEditMenu from './ItemEditMenu';
import styles from './ProfileItem.module.scss';

const url = process.env.REACT_APP_S3_URL;

const ProfileItem = ({ item }) => {
  const account = useSelector(state => state.entities.user.account);
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
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{ backgroundImage: `url('${url}/profile/${item.image}')` }}
          onClick={enlargeImage}
        />
        {account === 'admin' && <ItemEditMenu id={item.id} />}
        {isLarge && <ImageViewer url={`${url}/profile/${item.image}`} onClick={reduceImage} />}
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{item.word}</p>
      </div>
    </article>
  );
}
 
export default ProfileItem;