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
  const [modal, setModal] = useState('');
  const [message, setMessage] = useState('');

  const file = useRef(null);

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

  useEffect(() => {
    if (id && sacredThings[category]) {
      const { title, description, price, smartStore } = getItemById(id);
      title && setTitle(title);
      description && setDescription(description);
      price && setPrice(price);
      smartStore && setStoreLink(smartStore);
    }
  }, [sacredThings]);

  const validate = () => {
    if (title.length < 1) {
      setModal('untitled');
      return false;
    } else if (price.length > 0 && !Number(price)) {
      setModal('price');
      return false;
    } else if (!imageFile) {
      setModal('image');
      return false;
    }
    return true;
  };
  
  const handlePostButton = async () => {
    if (!validate()) return;
    const result = await postItem({ title, description, price, category, storeLink, imageFile });
    if (result.error) {
      setMessage(result.error.message);
      setModal('message');
    } else {
      const result = await getSacredThings();
      if (result.error) {
        setMessage(result.error.message);
        return setModal('message');
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
    const imageFile = file.current.files[0];
    if (!imageFile) return;

    // 같은 이름의 파일이 있는지 확인
    const s3Files = await listImageFiles(`/sacred-things/${category}`);
    if (s3Files.error) {
      setMessage(s3Files.error.message);
      return setModal('message');
    }
    const [sameFile] = s3Files.filter(file => file.Key === `sacred-things/${category}/${imageFile.name}`);
    if (sameFile) return setModal('same-image');
    
    const result = await putImageFile(imageFile, category);
    if (result.error) {
      setMessage(result.error.message);
      return setModal('message');
    }
    setImageFile(imageFile);
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
          <div className={styles.mainImageWrap}>
            {!imageFile && <Button width="64px" marginRight="8px" onClick={() => handleMainImageUploadButton()}>업로드</Button>}
            {!imageFile && <input ref={file} type="file" accept="image/png, image/jpeg"/>}
            {imageFile && <p>{imageFile.name}</p>}
            {/* TODO: 삭제 버튼 */}
          </div>
        </Li>
        <div className={styles.buttonWrap}>
          {!id && <Button width="64px" onClick={() => handlePostButton()} marginRight="8px">등록</Button>}
          {id && <Button width="64px" onClick={() => handleEditButton()} marginRight="8px">수정</Button>}
          <Button width="64px" onClick={() => setModal('cancel')}>취소</Button>
        </div>
      </ul>

      {modal === 'untitled' && <ConfirmModal 
        text="제목을 입력해야 합니다."
        yes={() => setModal('')} 
      />}
      {modal === 'image' && <ConfirmModal 
        text="대표 이미지를 업로드해야 합니다."
        yes={() => setModal('')} 
      />}
      {modal === 'same-image' && <ConfirmModal 
        text="같은 이름의 이미지 파일이 이미 존재합니다.\다른 이름으로 업로드해 주세요."
        yes={() => setModal('')} 
      />}
      {modal === 'price' && <ConfirmModal 
        text="가격에는 0을 제외한 숫자만 입력할 수 있습니다."
        yes={() => setModal('')} 
      />}
      {modal === 'message' && <ConfirmModal 
        text={'다음 에러가 발생했습니다.\\' + message}
        yes={() =>{
          setModal('');
          setMessage('');
        }} 
      />}
      {modal === 'cancel' && <YesNoModal 
        text="작성한 내용이 지워집니다.\정말로 취소하시겠습니까?"
        yes={() => history.goBack()} 
        no={() => setModal('')} 
      />}
    </>
  );
}
 
export default Editor;