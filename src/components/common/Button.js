import React from 'react';
import styles from './Button.module.scss';

const Button = props => {
  const { width, onClick } = props;
  return ( 
    <span 
      className={styles.button} 
      onClick={onClick} 
      style={{ width }}
    >
      <a>{props.children}</a>
    </span>
  );
}
 
export default Button;