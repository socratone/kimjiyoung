import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { putHomeImageFile } from '../../api/imageFile';
import ConfirmModal from '../common/ConfirmModal';
import Loading from '../common/Loading';
import ImageIcon from '../icon/ImageIcon';
import UploadIcon from '../icon/UploadIcon';
import styles from './Home.module.scss';

const url = process.env.REACT_APP_S3_URL;

const Home = () => {
  const account = useSelector(state => state.entities.user.account);
  const [imageFile, setImageFile] = useState(null);
  const [imageURI, setImageURI] = useState('');
  const [modal, setModal] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const inputFile = useRef(null);

  useEffect(() => {
    setImageURI(url + '/home/background.png');
    setIsLoading(false);
  }, []);

  const showLoading = () => (
    <Loading size="48" />
  );
    
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
  
  const previewImageFile = ({ target }) => {
    if (target.files && target.files[0]) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        setIsLoading(false);
        setImageURI(target.result);
      }
      reader.readAsDataURL(target.files[0]);
    }
  };

  const uploadImageFile = async () => {
    setIsLoading(true);

    const file = inputFile.current.files[0];
    if (!file) return createModal('이미지 파일을 선택해야 합니다.');

    // S3에 이미지 파일 업로드
    const result = await putHomeImageFile(file);
    if (result.error) return createModal(result.error.message);

    setImageURI(url + '/home/background.png');
    createModal('이미지 파일 업로드를 성공했습니다.');
    setImageFile(null);
  };

  return ( 
    <>
      <div 
        className={styles.background}
        style={{ backgroundImage: `url('${imageURI}')` }}
      />
      <section className={styles.section}>
        {account === 'admin' && <div className={styles.inputWrap}>
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
        </div>}
      </section>
      {modal && showModal()}
      {isLoading && showLoading()}
    </>
  );
}
 
export default Home;