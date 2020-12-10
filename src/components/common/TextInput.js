import React from 'react';
import styles from './TextInput.module.scss';

const TextInput = props => {
  const { type, width, value, onChange } = props;
  return (  
    <input 
      type={type} 
      className={styles.textInput}
      style={{ width }}  
      value={value}
      onChange={onChange}
    />
  );
}
 
export default TextInput;