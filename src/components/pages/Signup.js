import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import validateSignup from '../../validate/validateSignup';
import postSignup from '../../api/postSignup';
import schema from '../../validate/signup';
import styles from './Signup.module.scss';

const Signup = () => {
  const [info, setInfo] = useState('회원가입을 위해 빈 칸을 입력해주세요.');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSignup = async () => {
    try {
      validateSignup({ email, password, password2, name });
      await schema.validateAsync({ email, password, password2, name });
    } catch (error) {
      return setInfo(error.message);
    }

    const result = await postSignup(email, password, name);
    if (result.error) return alert(result.error.message)
    setInfo(`${result.email}로 회원가입을 완료 했습니다.`);
    setIsSignup(true);
  };

  return (
    <ul className={styles.wrap}>
      <li>
        <p className={styles.text}>{info}</p>
      </li>
      {!isSignup && <>
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
      </>}
    </ul> 
  );
}
 
export default Signup;