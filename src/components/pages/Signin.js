import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import postSignin from '../../api/postSignin';
import getUserByToken from '../../helper/getUserByToken';
import validateSignin from '../../validate/validateSignin';
import schema from '../../validate/signin';
import styles from './Signin.module.scss';

const Signin = () => {
  const [info, setInfo] = useState('페이지를 수정하려면 로그인 해주세요.');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const resetInput = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
      validateSignin({ email, password });
      await schema.validateAsync({ email, password });
    } catch (error) {
      return setInfo(error.message);
    }

    const result = await postSignin(email, password);
    resetInput();
    if (result.error) return setInfo(result.error.message);
    localStorage.setItem('token', result.token);
    const user = getUserByToken();
    dispatch(setUser(user));
    history.goBack();
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