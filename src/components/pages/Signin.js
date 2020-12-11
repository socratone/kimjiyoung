import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/user';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import postSignin from '../../api/postSignin';
import getUserByToken from '../../helper/getUserByToken';
import styles from './Signin.module.scss';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const [info, setInfo] = useState('페이지를 수정하려면 로그인 해주세요.');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const isValidInput = (email, password) => {
    if (email.length < 1) {
      setInfo('아이디를 입력해주세요.');
      return false;
    } else if (password.length < 1) {
      setInfo('비밀번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if(!isValidInput(email, password)) return;
    const { status, ok, message } = await postSignin(email, password);
    setEmail('');
    setPassword('');
    setInfo(message);
    if (ok) {
      const user = getUserByToken();
      console.log('user:', user)
      dispatch(setUser(user));
      history.push('/')
    };
  };
  
  return ( 
    <ul className={styles.wrap}>
      <li>
        <p className={styles.text}>{info}</p>
      </li>
      <li>
        <TextInput 
          width="200px" 
          type="text" 
          placeholder="email"
          value={email} 
          onChange={({ target }) => setEmail(target.value)} 
        />
      </li>
      <li>
        <TextInput 
          width="200px" 
          type="password" 
          placeholder="password"
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
 
export default Signin;