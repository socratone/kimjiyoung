import React from 'react';
import Button from './Button';
import styles from './Editor.module.scss';

const Editor = () => {
  return (  
    <section className={styles.editor}>
      <p>Title</p>
      <input className={styles.title} type="text" />
      <p>Description</p>
      <textarea className={styles.description}></textarea>
      <p>Price</p>
      <input className={styles.price} type="text" />
      <div>
        <input type="file" accept="image/png, image/jpeg"/>
      </div>
      <div className={styles.buttonWrap}>
          <Button width="64px" marginRight="8px">등록</Button>
          <Button width="64px">취소</Button>
      </div>

    </section>
  );
}
 
export default Editor;