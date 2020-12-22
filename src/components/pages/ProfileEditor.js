import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setItem } from '../../store/profile';
import Button from '../common/Button';
import YesNoModal from '../common/YesNoModal';
import ConfirmModal from '../common/ConfirmModal';
import Loading from '../common/Loading';
import postProfileItem from '../../api/postProfileItem';
import putProfileItem from '../../api/putProfileItem';
import getSacredThings from '../../api/getSacredThings';
import getProfile from '../../api/getProfile';
import { putProfileImageFile, listImageFiles } from '../../api/imageFile';
import styles from './ProfileEditor.module.scss';

const Li = ({ children }) => (
  <li className={styles.li}>{children}</li>
);

const ProfileEditor = () => {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [yesNoModal, setYesNoModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputFile = useRef(null);

  const profile = useSelector(state => state.entities.profile);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = location.state;

  const getItemById = id => {
    const [item] = profile.items.filter(item => item.id === id);
    return item;
  };

  useEffect(() => {
    if (profile.items.length > 0) {
      const item = getItemById(id);
      if (!item) return;
      setDescription(item.text);
      setImageFile({ name: item.image })
    }
  }, [profile]);

  const showLoading = () => (
    <Loading size="48" />
  );

  const createConfirmModal = message => {
    setIsLoading(false);
    setConfirmModal({ message });
  };
  
  const createYesNoModal = message => {
    setIsLoading(false);
    setYesNoModal({ message });
  }

  const showConfirmModal = () => (
    <ConfirmModal 
      text={confirmModal.message}
      yes={() => setConfirmModal(null)} 
    />
  );
    
  const showYesNoModal = () => (
    <YesNoModal 
      text={yesNoModal.message}
      yes={() => history.goBack()} 
      no={() => setYesNoModal(null)} 
    />  
  );
  
  const handlePostButton = async () => {
    setIsLoading(true);

    const file = inputFile.current.files[0];
    if (!file) return createConfirmModal('대표 이미지를 선택해야 합니다.');

    // 같은 이름의 이미지 파일이 S3에 있는지 확인
    const s3Files = await listImageFiles('/profile');
    if (s3Files.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + s3Files.error.message);
    }
    const [sameFile] = s3Files.filter(s3File => s3File.Key === `profile/${file.name}`);
    if (sameFile) return createConfirmModal('같은 이름의 이미지 파일이 이미 존재합니다.\\파일 이름을 다른 이름으로 수정하거나\\다른 이미지 파일을 선택해 주세요.');
    
    // 문자 데이터 업로드
    const sentence = description.replace(/\n/g, '\n');
    const result2 = await postProfileItem({ description: sentence, imageFileName: file.name });
    if (result2.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result2.error.message);
    }

    // profile 업데이트
    const result3 = await getProfile();
    if (result3.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result3.error.message);
    }
    dispatch(setItems(result3));

    // S3에 이미지 파일 업로드
    const result = await putProfileImageFile(file, file.name);
    if (result.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result.error.message);
    }
    history.goBack();
  };

  const handleEditButton = async () => {
    setIsLoading(true);
    
    // 이미지 파일을 바꿨다면 기존의 이름과 동일하게 해서 S3에 덮어 씌운다.
    const file = inputFile.current.files[0];
    if (file) {
      const result = await putProfileImageFile(file, imageFile.name);
      if (result.error) {
        return createConfirmModal('다음 에러가 발생했습니다.\\' + result.error.message);
      }
    }

    // 문자 데이터 수정 업로드
    const sentence = description.replace(/\n/g, '\n');
    const result = await putProfileItem({ image: imageFile.name, text: sentence });
    if (result.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result.error.message);
    }

    // profile 업데이트
    const result2 = await getSacredThings();
    if (result2.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result2.error.message);
    }
    dispatch(setItem({ text: sentence, id }));
    history.goBack();
  };

  return (  
    <>
      <ul className={styles.editor}>
        <Li>
          <p>내용</p>
          <textarea 
            className={styles.description}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Li>
        <Li>
          <p>이미지</p>
          <div className={styles.mainImageInputWrap}>
            {imageFile && <span style={{ marginRight: "8px" }}>{imageFile.name}</span>}
            <input ref={inputFile} className={styles.mainImageInput} type="file" accept="image/png, image/jpeg"/>
          </div>
        </Li>
        <div className={styles.buttonWrap}>
          {!id && <Button width="64px" onClick={() => handlePostButton()} marginRight="8px">등록</Button>}
          {id && <Button width="64px" onClick={() => handleEditButton()} marginRight="8px">수정</Button>}
          <Button width="64px" onClick={() => createYesNoModal('작성한 내용이 지워집니다.\\정말로 취소하시겠습니까?')}>취소</Button>
        </div>
      </ul>

      {confirmModal && showConfirmModal()}
      {yesNoModal && showYesNoModal()}
      {isLoading && showLoading()}
    </>
  );
}
 
export default ProfileEditor;