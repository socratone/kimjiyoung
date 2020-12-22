import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSecondItemText } from '../../store/profile';
import putProfileItem from '../../api/putProfileItem';
import styles from './SecondItemText.module.scss';

const SecondItemText = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState('');

  const dispatch = useDispatch();
  const profile = useSelector(state => state.entities.profile);

  const handleSaveButton = async () => {
    const result = await putProfileItem({ 
      image: 'second-item.png', 
      text: editedText
    });
    if (result.error) alert(result.error.message);

    dispatch(setSecondItemText({ text: editedText }));
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
        <p 
          className={styles.textButton} 
          onClick={() => handleSaveButton()}
        >
          저장
        </p>
      </div>
    );
  }

  return (  
    <div className={styles.subTextWrap}>
      <p className={styles.subText}>{profile.secondItem.text}</p>
      <p className={styles.textButton} onClick={() => setIsEdit(true)}>수정</p>
    </div>
  );
}
 
export default SecondItemText;