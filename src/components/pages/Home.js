import React from 'react';
import imageUrl from '../../config/backgroundImage';

const style = {
  position: 'fixed',
  zIndex: '-1',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundImage: `url('${imageUrl}')`
};

const Home = () => {
  return ( 
    <section style={style}/>
  );
}
 
export default Home;