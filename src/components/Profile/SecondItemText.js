import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSecondItemText } from '../../store/profile';
import putProfileItem from '../../api/putProfileItem';
import convertTextToJSX from '../../helper/convertTextToJSX';
import styles from './SecondItemText.module.scss';

const SecondItemText = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState('');

  const dispatch = useDispatch();
  const profile = useSelector(state => state.entities.profile);
  const account = useSelector(state => state.entities.user.account);

  const handleSaveButton = async () => {
    const text = editedText.replace(/\n/g, '\n');
    const result = await putProfileItem({ 
      image: 'second-item.png', 
      text
    });
    if (result.error) alert(result.error.message);

    dispatch(setSecondItemText({ text }));
    setIsEdit(false);
  };

  const handleEditButton = () => {
    setIsEdit(true);
    setEditedText(profile.secondItem.text)
  };

  const handleCancelButton = () => {
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <div className={styles.subTextEditWrap}>
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
      </div>
    );
  }

  return (  
    <div className={styles.subTextWrap}>
      <p className={styles.subText}>
        {convertTextToJSX(profile.secondItem.text)}
      </p>
      {account === 'admin' && 
        <p className={styles.textButton} onClick={() => handleEditButton()}>수정</p>}
    </div>
  );
}
 
export default SecondItemText;