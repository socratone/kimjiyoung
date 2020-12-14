import React from 'react';
import styles from './ImageViewer.module.scss';

const ImageViewer = ({ url, onClick }) => {
  return (  
    <div 
      className={styles.imageViewer}
      style={{backgroundImage: `url('${url}')`}} 
      onClick={onClick} 
    />
  );
}
 
export default ImageViewer;