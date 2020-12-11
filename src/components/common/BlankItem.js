import React from 'react';
import styles from './BlankItem.module.scss';

const BlankItem = () => {
  return (  
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <div className={styles.image} >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </div>
      </div>
    </article> 
  );
}
 
export default BlankItem;