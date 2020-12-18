import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './BlankItem.module.scss';

const BlankItem = ({ category }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: '/editor',
      state: { category }
    });
  };

  return (  
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <div className={styles.image} onClick={() => handleClick()}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </div>
      </div>
    </article> 
  );
}
 
export default BlankItem;