import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { activateAdmin } from '../../store/isAdmin';
import styles from './Home.module.scss';

const Admin = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.ui.isAdmin);

  const handleClick = () => {
    dispatch(activateAdmin());
  };

  return ( 
    <div className={styles.mainWrap}>
      <div className={styles.mainBumper}></div>
      <main className={styles.main}>
        <div>{`isAdmin의 값은 ${isAdmin.toString()}입니다.`}</div>
        <button onClick={() => handleClick()}>클릭</button>
      </main> 
    </div>
  );
}
 
export default Admin;