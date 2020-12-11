import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import isValidEmail from '../../helper/isValidEmail';
import postSignup from '../../api/postSignup';
import styles from './Signup.module.scss';

const Signup = () => {
  const [info, setInfo] = useState('회원가입을 위해 빈 칸을 입력해주세요.');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const isValidInput = (email, password, password2, name) => {
    if (email.length < 1) {
      setInfo('이메일을 입력해주세요.');
      return false;
    } else if (!isValidEmail(email)) {
      setInfo('올바른 이메일을 입력하세요.');
      return false;
    } else if (password.length < 1 || password2.length < 1) {
      setInfo('비밀번호를 입력해주세요.');
      return false;
    } else if (password.length < 8) {
      setInfo('비밀번호는 8자 이상이어야 합니다.');
      return false;
    } else if (password !== password2) {
      setInfo('비밀번호가 일치하지 않습니다.');
      return false;
    } else if (name.length < 1) {
      setInfo('이름을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if(!isValidInput(email, password, password2, name)) return;
    const { status, ok, message } = await postSignup(email, password, name);
    console.log('message:', message)
    setInfo(message);
    if (ok) setIsSignup(true);
  };

  if (isSignup) {
    return (
      <ul className={styles.wrap}>
        <li>
          <p className={styles.text}>{info}</p>
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
        <TextInput 
          width="200px" 
          type="password" 
          placeholder="password 확인"
          value={password2} 
          onChange={({ target }) => setPassword2(target.value)} 
        />
      </li>
      <li>
        <TextInput 
          width="200px" 
          type="text" 
          placeholder="name"
          value={name} 
          onChange={({ target }) => setName(target.value)} 
        />
      </li>
      <li>
        <Button width="100px" onClick={() => handleSignup()}>회원가입</Button>
      </li>
    </ul> 
  );
}
 
export default Signup;