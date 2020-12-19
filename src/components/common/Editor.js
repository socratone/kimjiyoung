import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../store/sacredThings';
import Button from './Button';
import YesNoModal from './YesNoModal';
import ConfirmModal from './ConfirmModal';
import postItem from '../../api/postItem';
import putItem from '../../api/putItem';

import getSacredThings from '../../api/getSacredThings';
import { putImageFile, listImageFiles } from '../../api/imageFile';
import styles from './Editor.module.scss';

const Li = ({ children }) => (
  <li className={styles.li}>{children}</li>
);

const TextInput = ({ value, onChange }) => (
  <input 
    className={styles.textInput} 
    type="text" 
    value={value} 
    onChange={onChange}
  />
);

const Editor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [storeLink, setStoreLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [yesNoModal, setYesNoModal] = useState(null);

  const inputFile = useRef(null);

  const sacredThings = useSelector(state => state.entities.sacredThings);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { category, id } = location.state;

  const getItemById = id => {
    for (let goods in sacredThings) {
      const { items } = sacredThings[goods];
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) return items[i];
      }
    }
  };

  // TODO: 등록 버튼을 누르지 않고 다른 페이지로 넘어갈 경우 업로드한 이미지 파일 삭제 요청
  
  useEffect(() => {
    if (id && sacredThings[category]) {
      const { title, description, price, smartStore, mainImage } = getItemById(id);
      title && setTitle(title);
      description && setDescription(description);
      price && setPrice(price);
      smartStore && setStoreLink(smartStore);
      mainImage && setImageFile({ name: mainImage })
    }
  }, [sacredThings]);

  const createConfirmModal = message => {
    setConfirmModal({ message });
  };

  const createYesNoModal = message => {
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

  const validate = () => {
    if (title.length < 1) {
      createConfirmModal('제목을 입력해야 합니다.');
      return false;
    } else if (price.length > 0 && !Number(price)) {
      createConfirmModal('가격에는 0을 제외한 숫자만 입력할 수 있습니다.');
      return false;
    }
    return true;
  };
  
  const handlePostButton = async () => {
    // TODO: indicator
    if (!validate()) return;
    const file = inputFile.current.files[0];
    if (!file) return createConfirmModal('대표 이미지를 선택해야 합니다.');

    // 같은 이름의 이미지 파일이 S3에 있는지 확인
    const s3Files = await listImageFiles(`/sacred-things/${category}`);
    if (s3Files.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + s3Files.error.message);
    }
    const [sameFile] = s3Files.filter(s3File => s3File.Key === `sacred-things/${category}/${file.name}`);
    if (sameFile) return createConfirmModal('같은 이름의 이미지 파일이 이미 존재합니다.\\파일 이름을 다른 이름으로 수정하거나\\다른 이미지 파일을 선택해 주세요.');
    
    // 문자 데이터 업로드
    const sentence = description.replace(/\n/g, '\n');
    const result2 = await postItem({ title, description: sentence, price, category, storeLink, imageFileName: file.name });
    if (result2.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result2.error.message);
    }

    // sacredThings 업데이트
    const result3 = await getSacredThings();
    if (result3.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result3.error.message);
    }
    dispatch(setItems(result3));

    // S3에 이미지 파일 업로드
    const result = await putImageFile(file, category, file.name);
    if (result.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result.error.message);
    }
    history.goBack();
  };

  const handleEditButton = async () => {
    if (!validate()) return;
    
    // 이미지 파일을 바꿨다면 기존의 이름과 동일하게 해서 S3에 덮어 씌운다.
    const file = inputFile.current.files[0];
    if (file) {
      const result = await putImageFile(file, category, imageFile.name);
      if (result.error) {
        return createConfirmModal('다음 에러가 발생했습니다.\\' + result.error.message);
      }
    }

    // 문자 데이터 수정 업로드
    const sentence = description.replace(/\n/g, '\n');
    const result = await putItem(id, { title, description: sentence, price, storeLink });
    if (result.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result.error.message);
    }

    // sacredThings 업데이트
    const result2 = await getSacredThings();
    if (result2.error) {
      return createConfirmModal('다음 에러가 발생했습니다.\\' + result2.error.message);
    }
    dispatch(setItems(result2));
    history.goBack();
  };

  return (  
    <>
      <ul className={styles.editor}>
        <Li>
          <p>제목*</p>
          <TextInput value={title} onChange={({ target }) => setTitle(target.value)} />
        </Li>
        <Li>
          <p>내용</p>
          <textarea 
            className={styles.description}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Li>
        <Li>
          <p>가격</p>
          <TextInput value={price} onChange={({ target }) => setPrice(target.value)} />
        </Li>
        <Li>
          <p>카테고리 : {category}</p>
        </Li>
        <Li>
          <p>스마트 스토어 링크</p>
          <TextInput value={storeLink} onChange={({ target }) => setStoreLink(target.value)} />
        </Li>
        <Li>
          <p>대표 이미지*</p>
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
    </>
  );
}
 
export default Editor;