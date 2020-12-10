import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateAdmin, disableAdmin } from '../../store/isAdmin';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import postSignin from '../../api/postSignin';
import styles from './Admin.module.scss';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState('Admin 계정으로 로그인 해주세요.');

  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.entities.isAdmin);

  const handleLogin = async () => {
    const { status, ok, message } = await postSignin({ email, password });
    if (ok) dispatch(activateAdmin());
    setInfo(message);
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    setInfo('Admin 계정으로 로그인 해주세요.');
    dispatch(disableAdmin());
  };
  
  if (isAdmin) {
    return (
      <ul className={styles.wrap}>
        <li>
          <p className={styles.text}>Admin 계정으로 로그인 됐습니다.</p>
        </li>
        <li>
          <Button width="100px" onClick={() => handleLogout()}>로그아웃</Button>
        </li>
      </ul>
    );
  }
  
  return ( 
    <ul className={styles.wrap}>
      <li>
        <p className={styles.text}>{info}</p>
      </li>
      <li>
        <TextInput 
          width="200px" 
          type="text" 
          value={email} 
          onChange={({ target }) => setEmail(target.value)} 
        />
      </li>
      <li>
        <TextInput 
          width="200px" 
          type="password" 
          value={password} 
          onChange={({ target }) => setPassword(target.value)} 
        />
      </li>
      <li>
        <Button width="100px" onClick={() => handleLogin()}>로그인</Button>
      </li>
    </ul> 
  );
}
 
export default Admin;