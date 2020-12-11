import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser, removeUser } from '../../store/user';
import Button from '../common/Button';
import styles from './Signout.module.scss';

const Signout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.setItem('token', '');
    dispatch(removeUser());
    history.push('/signin');
  };

  return ( 
    <ul className={styles.wrap}>
      <li>
        <p className={styles.text}>로그아웃을 하려면 아래 버튼을 클릭해주세요.</p>
      </li>
      <li>
        <Button width="100px" onClick={() => handleLogout()}>로그아웃</Button>
      </li>
    </ul> 
  );
}
 
export default Signout;