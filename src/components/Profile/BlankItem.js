import React from 'react';
import { useHistory } from 'react-router-dom';
import PlusIcon from '../icon/PlusIcon';
import styles from './BlankItem.module.scss';

const BlankItem = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: '/profile/editor',
      state: { id: undefined }
    });
  };

  return (  
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <div className={styles.image} onClick={() => handleClick()}>
          <PlusIcon size="32" />
        </div>
      </div>
    </article> 
  );
}
 
export default BlankItem;