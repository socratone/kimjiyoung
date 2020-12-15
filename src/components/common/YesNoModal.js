import React from 'react';
import Button from './Button';
import styles from './Modal.module.scss';

const YesNoModal = ({ text, yes, no }) => {
  const arrangeText = text => {
    const words = text.split('\\');
    return words;
  };

  return ( 
    <section className={styles.modalBackground}>
      <div className={styles.modal}>
        {arrangeText(text).map((text, i) => <p className={styles.text} key={i}>{text}</p>)}
        <div className={styles.buttonWrap}>
          <Button width="64px" marginRight="8px" onClick={yes}>예</Button>
          <Button width="64px" onClick={no}>아니오</Button>
        </div>
      </div>
    </section>
  );
}
 
export default YesNoModal;