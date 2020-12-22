import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstItemText } from '../../store/profile';
import putProfileItem from '../../api/putProfileItem';
import styles from './FirstItemText.module.scss';

const FirstItemText = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState('');

  const dispatch = useDispatch();
  const profile = useSelector(state => state.entities.profile);
  const account = useSelector(state => state.entities.user.account);

  const handleSaveButton = async () => {
    const result = await putProfileItem({ 
      image: 'first-item.png', 
      text: editedText
    });
    if (result.error) alert(result.error.message);

    dispatch(setFirstItemText({ text: editedText }));
    setIsEdit(false);
  };

  const handleEditButton = () => {
    setIsEdit(true);
    setEditedText(profile.firstItem.text);
  };

  const handleCancelButton = () => {
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <div className={styles.mainTextEditWrap}>
        <div className={styles.wrap}>
          <textarea 
            className={styles.textarea} 
            rows="1" 
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </div>
        <p 
          className={styles.textButton} 
          onClick={() => handleSaveButton()}
        >
          저장
        </p>
        <p className={styles.textButton} onClick={() => handleCancelButton()}>취소</p>
      </div>
    )
  }

  return (  
    <div className={styles.mainTextWrap}>
      <p className={styles.mainText}>{profile.firstItem.text}</p>
      {account === 'admin' && 
        <p className={styles.textButton} onClick={() => handleEditButton()}>수정</p>}
    </div>
  );
}
 
export default FirstItemText;