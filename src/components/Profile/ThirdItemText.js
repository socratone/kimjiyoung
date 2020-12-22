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
      <p className={styles.subText}>
        {convertTextToJSX(profile.thirdItem.text)}  
      </p>
      <p className={styles.textButton} onClick={() => setIsEdit(true)}>수정</p>
    </div>
  );
}
 
export default ThirdItemText;