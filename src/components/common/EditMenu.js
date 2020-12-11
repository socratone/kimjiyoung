import React from 'react';
import { useSelector } from 'react-redux';
import styles from './EditMenu.module.scss';

const EditMenu = () => {
  const account = useSelector(state => state.entities.user.account);

  if (account === 'admin') {
    return ( 
      <div className={styles.wrap}>
        <p className={styles.icon}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </p>
        <p className={styles.icon}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </p>
      </div> 
    );
  }

  return null;
}
 
export default EditMenu;