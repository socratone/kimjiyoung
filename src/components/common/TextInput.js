import React from 'react';
import styles from './TextInput.module.scss';

const TextInput = props => {
  const { type, width } = props;
  return (  
    <input 
      type={type} 
      className={styles.textInput}
      style={{ width }}  
    />
  );
}
 
export default TextInput;