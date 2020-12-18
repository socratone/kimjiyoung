import React, { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import ConfirmModal from '../common/ConfirmModal';
import styles from './BlankItem.module.scss';

const BlankItem = ({ category, id }) => {
  const [isAddClick, setIsAddClick] = useState(false);
  const [modal, setModal] = useState(null);
  const [imageURI, setImageURI] = useState('');

  const inputFile = useRef(null);

  const handleAddButton = () => {
    if (!isAddClick) setIsAddClick(true);
  };

  const createModal = message => {
    setModal({ message });
  };

  const showModal = () => {
    if (!modal) return null;
    return (
      <ConfirmModal 
        text={modal.message}
        yes={() => setModal(null)} 
      />
    );
  }

  const previewImageFile = ({ target }) => {
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        setImageURI(target.result);
      }
      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleUploadButton = () => {
    const file = inputFile.current.files[0];
    if (!file) return createModal('이미지 파일을 선택해야 합니다.');
    // TODO
  };

  return (  
    <>
      <article className={styles.item}>
        <div className={styles.imageWrap}>
          <div 
            className={styles.image} 
            onClick={() => handleAddButton()}
            style={{ backgroundImage: `url('${imageURI}')` }}
          >
            {!isAddClick && <i className="fa fa-plus" aria-hidden="true"></i>}
            {isAddClick && <div className={styles.wrap}>
              <div className={styles.imageInputWrap}>
                <input 
                  ref={inputFile} 
                  className={styles.imageInput} 
                  type="file" 
                  accept="image/png, image/jpeg"
                  onChange={e => previewImageFile(e)}
                />
              </div>
              <div className={styles.uploadButtonWrap}>
                <Button width="64px" onClick={() => handleUploadButton()}>업로드</Button>
              </div> 
            </div>}
          </div>
        </div>
      </article> 
      {showModal()}
    </>
  );
}
 
export default BlankItem;