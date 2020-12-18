import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../store/sacredThings';
import Button from './Button';
import YesNoModal from './YesNoModal';
import ConfirmModal from './ConfirmModal';
import postItem from '../../api/postItem';
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
  const [modal, setModal] = useState(null);

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

  const createModal = (kind, message) => {
    setModal({ kind, message });
  };

  const showModal = () => {
    if (!modal) return null;
    if (modal.kind === 'confirm') {
      return (
        <ConfirmModal 
          text={modal.message}
          yes={() => setModal(null)} 
        />
      );
    } else if (modal.kind === 'cancel') {
      return (
        <YesNoModal 
          text={modal.message}
          yes={() => history.goBack()} 
          no={() => setModal(null)} 
        />
      );
    }
  };

  const validate = () => {
    if (title.length < 1) {
      createModal('confirm', '제목을 입력해야 합니다.');
      return false;
    } else if (price.length > 0 && !Number(price)) {
      createModal('confirm', '가격에는 0을 제외한 숫자만 입력할 수 있습니다.');
      return false;
    } else if (!imageFile) {
      createModal('confirm', '대표 이미지를 업로드해야 합니다.');
      return false;
    }
    return true;
  };
  
  const handlePostButton = async () => {
    if (!validate()) return;
    const result = await postItem({ title, description, price, category, storeLink, imageFile });
    if (result.error) {
      createModal('confirm', '다음 에러가 발생했습니다.\\' + result.error.message);
    } else {
      const result = await getSacredThings();
      if (result.error) {
        return createModal('confirm', '다음 에러가 발생했습니다.\\' + result.error.message);
      }
      dispatch(setItems(result));
      history.goBack();
    }
  };

  const handleEditButton = async () => {
    // TODO
  };

  const handleMainImageUploadButton = async () => {
    // TODO: indicator
    const file = inputFile.current.files[0];
    if (!file) return;

    // 같은 이름의 파일이 있는지 확인
    const s3Files = await listImageFiles(`/sacred-things/${category}`);
    if (s3Files.error) {
      return createModal('confirm', '다음 에러가 발생했습니다.\\' + s3Files.error.message);
    }
    const [sameFile] = s3Files.filter(s3File => s3File.Key === `sacred-things/${category}/${file.name}`);
    if (sameFile) return createModal('confirm', '같은 이름의 이미지 파일이 이미 존재합니다.\다른 이름으로 업로드해 주세요.');
    
    const result = await putImageFile(file, category, file.name);
    if (result.error) {
      return createModal('confirm', '다음 에러가 발생했습니다.\\' + result.error.message);
    }
    setImageFile({ name: file.name });
  };

  const handleMainImageChangeButton = async () => {
    const file = inputFile.current.files[0];
    if (!file) return;

    // 이름은 이전의 것으로 한다.
    const result = await putImageFile(file, category, imageFile.name);
    if (result.error) {
      return createModal('confirm', '다음 에러가 발생했습니다.\\' + result.error.message);
    }
    setImageFile({ name: file.name });
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
            {!imageFile && <Button width="64px" marginRight="8px" onClick={() => handleMainImageUploadButton()}>업로드</Button>}
            {imageFile && <Button width="64px" marginRight="8px" onClick={() => handleMainImageChangeButton()}>바꾸기</Button>}
            {imageFile && <span style={{ marginRight: "8px" }}>{imageFile.name}</span>}
            <input ref={inputFile} className={styles.mainImageInput} type="file" accept="image/png, image/jpeg"/>
          </div>
        </Li>
        <div className={styles.buttonWrap}>
          {!id && <Button width="64px" onClick={() => handlePostButton()} marginRight="8px">등록</Button>}
          {id && <Button width="64px" onClick={() => handleEditButton()} marginRight="8px">수정</Button>}
          <Button width="64px" onClick={() => createModal('cancel', '작성한 내용이 지워집니다.\\정말로 취소하시겠습니까?')}>취소</Button>
        </div>
      </ul>

      {showModal()}
    </>
  );
}
 
export default Editor;