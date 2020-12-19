import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setItems } from '../../store/sacredThings';
import putItemImages from '../../api/putItemImages';
import getSacredThings from '../../api/getSacredThings';
import { deleteImageFile } from '../../api/imageFile';
import YesNoModal from '../common/YesNoModal';
import styles from './EditMenu.module.scss';

const EditMenu = ({ name }) => {
  const { category, id } = useParams();
  const account = useSelector(state => state.entities.user.account);
  const sacredThings = useSelector(state => state.entities.sacredThings);
  const [modal, setModal] = useState('');
  
  const dispatch = useDispatch();

  const handleTrashButtonClick = () => {
    setModal('remove');
  };

  const removeImage = async () => {
    // S3의 이미지 파일 삭제
    const [item] = sacredThings[category].items.filter(item => item.id.toString() === id);
    const subImagesArr = item.subImages.split(',');
    const [targetImg] = subImagesArr.filter(targetImg => targetImg === name);
    const result = await deleteImageFile(`sacred-things/${category}/${targetImg}`);
    if (result.error) return alert(result.error.message);

    // 데이터 베이스 변경
    const remainImages = subImagesArr.filter(targetImg => targetImg !== name);
    const subImages = remainImages.join(',');
    const result3 = await putItemImages(id, subImages);
    if (result3.error) {
      return alert(result3.error.message);
    }

    // sacredThings 업데이트
    const result2 = await getSacredThings();
    if (result2.error) {
      return alert(result2.error.message);
    }
    dispatch(setItems(result2));
    setModal('');
  };

  const showRemoveModal = () => (
    <YesNoModal 
      text="정말로 삭제하시겠습니까?"
      yes={() => removeImage()} 
      no={() => setModal('')} 
    />
  );

  return ( 
    <>
      <div className={styles.wrap}>
        <p className={styles.icon} onClick={() => handleTrashButtonClick()}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </p>
      </div> 

      {modal === 'remove' && showRemoveModal()}
    </>
  );
}
 
export default EditMenu;