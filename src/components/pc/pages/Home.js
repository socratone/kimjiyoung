import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../../../store/page';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('home'));
    return () => {
      dispatch(setPage(''));
    }
  }, []);

  return ( 
    <>
    </> 
  );
}
 
export default Home;