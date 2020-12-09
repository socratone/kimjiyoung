import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateAdmin, disableAdmin } from '../../../store/isAdmin';
import Button from '../../common/Button';
import TextInput from '../../common/TextInput';
import styles from './Admin.module.scss';

const Admin = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.entities.isAdmin);

  const loginAdmin = () => {
    dispatch(activateAdmin());
  };

  const logoutAdmin = () => {
    dispatch(disableAdmin());
  };
  
  if (isAdmin) {
    return (
      <ul className={styles.wrap}>
        <li>
          <p className={styles.text}>Admin 계정으로 로그인 됐습니다.</p>
        </li>
        <li>
          <Button width="100px" onClick={() => logoutAdmin()}>{'로그아웃'}</Button>
        </li>
      </ul>
    )
  }
  
  return ( 
    <ul className={styles.wrap}>
      <li>
        <p className={styles.text}>Admin 계정으로 로그인 해주세요.</p>
      </li>
      <li>
        <TextInput width="200px" type="text" />
      </li>
      <li>
        <TextInput width="200px" type="password" />
      </li>
      <li>
        <Button width="100px" onClick={() => loginAdmin()}>{'로그인'}</Button>
      </li>
    </ul> 
  );
}
 
export default Admin;