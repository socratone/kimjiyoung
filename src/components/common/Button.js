import React from 'react';
import styles from './Button.module.scss';

const Button = props => {
  const { width, onClick } = props;
  return ( 
    <button 
      className={styles.button} 
      onClick={onClick} 
      style={{ width }}
    >
      <p>{props.children}</p>
    </button>
  );
}
 
export default Button;