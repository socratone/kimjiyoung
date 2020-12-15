import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from './Button';
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
  const [price, setPrice] = useState(0);
  const [storeLink, setStoreLink] = useState('');
  const image = useRef(null);

  const location = useLocation();
  const history = useHistory();

  const postData = () => {
    // TODO: validate 작성
    console.log(image.current.files[0]);
  };

  return (  
    <ul className={styles.editor}>
      <Li>
        <p>제목</p>
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
        <p>대표 이미지</p>
        <input ref={image} type="file" accept="image/png, image/jpeg"/>
      </Li>
      <div className={styles.buttonWrap}>
        <Button width="64px" onClick={() => postData()} marginRight="8px">등록</Button>
        <Button width="64px" onClick={() => history.goBack()}>취소</Button>
      </div>
    </ul>
  );
}
 
export default Editor;