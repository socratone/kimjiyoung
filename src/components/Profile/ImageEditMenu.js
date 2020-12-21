import React, { useRef, useState } from 'react';
import { useDispatch, } from 'react-redux';
import { setFirstItemImage, setSecondItemImage, setThirdItemImage } from '../../store/profile';
import { putProfileImageFile } from '../../api/imageFile';
import ConfirmModal from '../common/ConfirmModal';
import Loading from '../common/Loading';
import UploadIcon from '../icon/UploadIcon';
import ImageIcon from '../icon/ImageIcon';
import styles from './ImageEditMenu.module.scss';

const ImageEditMenu = ({ fileName }) => {
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState('');
  const [modal, setModal] = useState('');
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  const createModal = message => {
    setIsLoading(false);
    setModal({ message });
  };

  const showModal = () => (
    <ConfirmModal 
      text={modal.message}
      yes={() => setModal(null)} 
    />
  );

  const showLoading = () => (
    <Loading size="48" />
  );

  const previewImageFile = ({ target }) => {
    setIsLoading(true);
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        setIsLoading(false);
        if (fileName === 'first-item') {
          console.log('target.result:', target.result)
          dispatch(setFirstItemImage({ image: target.result }));
        } else if (fileName === 'second-item') {
          dispatch(setSecondItemImage({ image: target.result }));
        } else if (fileName === 'third-item') {
          dispatch(setThirdItemImage({ image: target.result }));
        }
      }
      reader.readAsDataURL(target.files[0]);
    }
  };

  const uploadImageFile = async () => {
    setIsLoading(true);
    
    // S3에 이미지 파일 업로드
    const file = inputFile.current.files[0];
    const result = await putProfileImageFile(file, `${fileName}.png`);
    if (result.error) return createModal(result.error.message);
    createModal('이미지 파일 업로드를 성공했습니다.');
    setImageFile(null);
  };

  return ( 
    <>
      <div className={styles.wrap}>
        {!imageFile && <p className={styles.icon} onClick={() => inputFile.current.click()}>
          <ImageIcon size={20} />
        </p>}
        <input 
          ref={inputFile} 
          style={{ display: 'none' }}
          className={styles.imageInput} 
          type="file" 
          accept="image/png, image/jpeg"
          onChange={e => {
            setImageFile(e.target.files[0]);
            previewImageFile(e);
          }}
        />
        {imageFile && <p className={styles.icon} onClick={() => uploadImageFile()}>
          <UploadIcon size={20} />
        </p>}
      </div> 
      {modal && showModal()}
      {isLoading && showLoading()}
    </>
  );
};
 
export default ImageEditMenu;