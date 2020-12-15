import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from './Button';
import YesNoModal from './YesNoModal';
import ConfirmModal from './ConfirmModal';
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
  const [modal, setModal] = useState('');
  const image = useRef(null);

  const location = useLocation();
  const history = useHistory();
  
  const postData = () => {
    if (title.length < 1) return setModal('untitled');
    console.log('price:', price)
    if (price.length > 0 && !Number(price)) return setModal('price');
    if (!image.current.files[0]) return setModal('image');
    setModal('success')
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
          <p>카테고리 : {location.state.category}</p>
        </Li>
        <Li>
          <p>스마트 스토어 링크</p>
          <TextInput value={storeLink} onChange={({ target }) => setStoreLink(target.value)} />
        </Li>
        <Li>
          <p>대표 이미지*</p>
          <input ref={image} type="file" accept="image/png, image/jpeg"/>
        </Li>
        <div className={styles.buttonWrap}>
          <Button width="64px" onClick={() => postData()} marginRight="8px">등록</Button>
          <Button width="64px" onClick={() => setModal('cancel')}>취소</Button>
        </div>
      </ul>

      {modal === 'untitled' && <ConfirmModal 
        text="제목을 입력해야 합니다."
        yes={() => setModal('')} 
      />}
      {modal === 'image' && <ConfirmModal 
        text="대표 이미지를 선택해야 합니다."
        yes={() => setModal('')} 
      />}
      {modal === 'success' && <ConfirmModal 
        text="업로드를 성공했습니다."
        yes={() => {
          setModal('');
          // TODO: items state 변경
        }} 
      />}
      {modal === 'price' && <ConfirmModal 
        text="가격에는 0을 제외한 숫자만 입력할 수 있습니다."
        yes={() => setModal('')} 
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