import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeItem } from '../../store/sacredThings';
import deleteItem from '../../api/deleteItem';
import YesNoModal from './YesNoModal';
import styles from './EditMenu.module.scss';

const EditMenu = ({ category, id }) => {
  const dispatch = useDispatch();
  const account = useSelector(state => state.entities.user.account);
  const [modal, setModal] = useState('');
  const history = useHistory();

  const handleEditButtonClick = () => {
    history.push({
      pathname: '/editor',
      state: { category, id }
    });
  };

  const handleTrashButtonClick = () => {
    setModal('remove');
  };

  // if (account === 'admin') {
    return ( 
      <>
        <div className={styles.wrap}>
          <p className={styles.icon} onClick={() => handleEditButtonClick()}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </p>
          <p className={styles.icon} onClick={() => handleTrashButtonClick()}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </p>
        </div> 

        {modal === 'remove' && <YesNoModal 
          text="정말로 삭제하시겠습니까?"
          yes={async () => {
            dispatch(removeItem({ category, id }));
            const result = await deleteItem(id);
            if (result.error) return alert(result.error.message);
          }} 
          no={() => setModal('')} 
        />}
      </>
    );
  // }

  return null;
}
 
export default EditMenu;