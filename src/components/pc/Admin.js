import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { activateAdmin } from '../../store/isAdmin';

const Admin = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.ui.isAdmin);

  const handleClick = () => {
    dispatch(activateAdmin());
  };

  return ( 
    <>
      <div>{`isAdmin의 값은 ${isAdmin.toString()}입니다.`}</div>
      <button onClick={() => handleClick()}>클릭</button>
    </> 
  );
}
 
export default Admin;