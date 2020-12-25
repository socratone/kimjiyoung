import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThirdItemText } from '../../store/profile';
import putProfileItem from '../../api/putProfileItem';
import convertTextToJSX from '../../helper/convertTextToJSX';
import styles from './ThirdItemText.module.scss';

const ThirdItemText = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState('');

  const dispatch = useDispatch();
  const profile = useSelector(state => state.entities.profile);
  const account = useSelector(state => state.entities.user.account);

  const handleSaveButton = async () => {
    const text = editedText.replace(/\n/g, '\n');
    const result = await putProfileItem({ 
      image: 'third-item.png', 
      text
    });
    if (result.error) alert(result.error.message);

    dispatch(setThirdItemText({ text }));
    setIsEdit(false);
  };

  const handleEditButton = () => {
    setIsEdit(true);
    setEditedText(profile.thirdItem.text)
  };

  const handleCancelButton = () => {
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <li className={styles.subTextEditWrap}>
        <div className={styles.textareaWrap}>
          <textarea 
            className={styles.textarea} 
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </div>
        <div className={styles.buttonWrap}>
          <p 
            className={styles.textButton} 
            onClick={() => handleSaveButton()}
            style={{ marginRight: '8px' }}
          >
            저장
          </p>
          <p className={styles.textButton} onClick={() => handleCancelButton()}>취소</p>
        </div>
      </li>
    );
  }

  return (  
    <li className={styles.subTextWrap}>
      <div className={styles.subText}>
        {convertTextToJSX(profile.thirdItem.text)}  
      </div>
      {account === 'admin' && 
        <p className={styles.textButton} onClick={() => handleEditButton()}>수정</p>}
    </li>
  );
}
 
export default ThirdItemText;