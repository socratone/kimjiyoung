import React from 'react';
import styles from './Button.module.scss';

const Button = ({ width, marginRight = '0px', onClick, children }) => {
  return ( 
    <button 
      className={styles.button} 
      onClick={onClick} 
      style={{ width, marginRight }}
    >
      <p>{children}</p>
    </button>
  );
}
 
export default Button;