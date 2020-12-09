import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateAdmin } from '../../../store/isAdmin';
import Button from '../../common/Button';
import TextInput from '../../common/TextInput';
import styles from './Admin.module.scss';

const Admin = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.entities.isAdmin);
  console.log('isAdmin:', isAdmin)
  const handleClick = () => {
    console.log('clicked')
    dispatch(activateAdmin());
  };
  
  if (isAdmin) {
    return (
      <ul className={styles.wrap}>
        <li>
          <p className={styles.text}>이미 Admin 계정으로 로그인 됐습니다.</p>
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
        <Button width="100px" onClick={() => handleClick()}>{'로그인'}</Button>
      </li>
    </ul> 
  );
}
 
export default Admin;