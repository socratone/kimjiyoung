import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateNav, disableNav } from '../../store/isNav';
import ImageViewer from '../common/ImageViewer';
import EditMenu from '../ItemDetail/EditMenu';
import styles from './Image.module.scss';

const Image = ({ isEditMenu = true, url, name }) => {
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
    <article>
      <div className={styles.imageWrap}>
        <div
          className={styles.image} 
          style={{backgroundImage: `url('${url}')`}}
          onClick={enlargeImage}
        />
        {isEditMenu && account === 'admin' && <EditMenu name={name} />}
        {isLarge && <ImageViewer url={url} onClick={reduceImage} />}
      </div>
    </article>
  );
};

export default Image;