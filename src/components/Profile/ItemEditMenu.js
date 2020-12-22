import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeItem } from '../../store/profile';
import deleteProfileItem from '../../api/deleteProfileItem';
import { deleteImageFile } from '../../api/imageFile';
import YesNoModal from '../common/YesNoModal';
import PencilIcon from '../icon/PencilIcon';
import TrashIcon from '../icon/TrashIcon';
import styles from './ItemEditMenu.module.scss';

const ItemEditMenu = ({ id }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.entities.profile);
  const [modal, setModal] = useState('');
  const history = useHistory();

  const handleEditButtonClick = () => {
    history.push({
      pathname: '/profile/editor',
      state: { id }
    });
  };

  const handleTrashButtonClick = () => {
    setModal('remove');
  };

  const requestRemoveItem = async () => {
    const result = await deleteProfileItem(id);
    if (result.error) return alert(result.error.message);
    const [item] = profile.items.filter(item => item.id === id);
    const result2 = await deleteImageFile(`profile/${item.image}`);
    if (result2.error) return alert(result2.error.message);
    dispatch(removeItem({ id }));
  };

  const showRemoveModal = () => (
    <YesNoModal 
      text="정말로 삭제하시겠습니까?"
      yes={() => requestRemoveItem()} 
      no={() => setModal('')} 
    />
  );

  return ( 
    <>
      <div className={styles.wrap}>
        <p className={styles.icon} onClick={() => handleEditButtonClick()}>
          <PencilIcon size={20} />
        </p>
        <p className={styles.icon} onClick={() => handleTrashButtonClick()}>
          <TrashIcon size={20} />
        </p>
      </div> 
      {modal === 'remove' && showRemoveModal()}
    </>
  );
}
 
export default ItemEditMenu;