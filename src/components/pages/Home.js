import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { putHomeImageFile } from '../../api/imageFile';
import Button from '../common/Button';
import styles from './Home.module.scss';

const url = process.env.REACT_APP_S3_URL;

const Home = () => {
  const account = useSelector(state => state.entities.user.account);
  const [imageURI, setImageURI] = useState('');
  const inputFile = useRef(null);

  useEffect(() => {
    setImageURI(url + '/home/background.png');
  }, []);
  
  const previewImageFile = ({ target }) => {
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        setImageURI(target.result);
      }
      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleUpload = async () => {
    const file = inputFile.current.files[0];
    if (!file) return alert('이미지 파일을 선택해야 합니다.');

    // S3에 이미지 파일 업로드
    const result = await putHomeImageFile(file);
    if (result.error) return alert(result.error.message);

    setImageURI(url + '/home/background.png');
    alert('이미지 파일 업로드를 성공했습니다.')
  };

  return ( 
    <>
      <div 
        className={styles.background}
        style={{ backgroundImage: `url('${imageURI}')` }}
      />
      <section className={styles.section}>
        {account === 'admin' && <div className={styles.inputWrap}>
          <input 
            ref={inputFile} 
            className={styles.imageInput} 
            type="file" 
            accept="image/png, image/jpeg"
            onChange={e => previewImageFile(e)}
          />
          <Button 
            width="64px"
            onClick={() => handleUpload()}
          >
            업로드
          </Button>
        </div>}
      </section>
    </>
  );
}
 
export default Home;