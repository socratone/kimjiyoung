import React from 'react';
import styles from './TextInput.module.scss';

const TextInput = props => {
  const { type, width, placeholder, value, onChange } = props;
  return (  
    <input 
      type={type} 
      className={styles.textInput}
      style={{ width }}  
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
 
export default TextInput;