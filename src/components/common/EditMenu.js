import React from 'react';
import { useSelector } from 'react-redux';
import styles from './EditMenu.module.scss';

const EditMenu = () => {
  const account = useSelector(state => state.entities.user.account);

  if (account === 'admin') {
    return ( 
      <div className={styles.wrap}>
        <p className={styles.icon}>
          <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
        </p>
        <p className={styles.icon}>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </p>
        <p className={styles.icon}>
          <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </p>
      </div> 
    );
  }

  return null;
}
 
export default EditMenu;