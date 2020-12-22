import React, { useEffect, useState } from 'react';
import { setItems } from '../../store/profile';
import { useDispatch, useSelector } from 'react-redux';
import getProfile from '../../api/getProfile';
import ProfileItem from '../Profile/ProfileItem';
import ImageEditMenu from '../Profile/ImageEditMenu';
import FirstItemText from '../Profile/FirstItemText';
import SecondItemText from '../Profile/SecondItemText';
import ThirdItemText from '../Profile/ThirdItemText';
import ImageViewer from '../common/ImageViewer';
import styles from './Profile.module.scss';

const url = process.env.REACT_APP_S3_URL;

const Profile = () => {
  const [firstImageURI, setFirstImageURI] = useState('');
  const [secondImageURI, setSecondImageURI] = useState('');
  const [thirdImageURI, setThirdImageURI] = useState('');
  const [isFirstLarge, setIsFirstLarge] = useState(false);
  const [isSecondLarge, setIsSecondLarge] = useState(false);
  const [isThirdLarge, setIsThirdLarge] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector(state => state.entities.profile);
  const account = useSelector(state => state.entities.user.account);

  useEffect(() => {
    setFirstImageURI(url + '/profile/first-item.png');
    setSecondImageURI(url + '/profile/second-item.png');
    setThirdImageURI(url + '/profile/third-item.png');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfile();
      if (result.error) alert(result.error.message);
      dispatch(setItems(result));
    };
    fetchData();
  }, []);

  return ( 
    <section className={styles.section}>
      <article className={styles.mainWrap}>
        <div className={styles.mainImageWrap}>
          <img 
            className={styles.mainImage} 
            src={firstImageURI} 
            onClick={() => setIsFirstLarge(true)}
          />
          {isFirstLarge && 
            <ImageViewer url={firstImageURI} onClick={() => setIsFirstLarge(false)} />}
          {account === 'admin' && 
            <ImageEditMenu fileName="first-item" setImageURI={setFirstImageURI} />}
        </div>
        <FirstItemText />
      </article>
      <div className={styles.subWrap}>
        <SecondItemText />
        <div
          className={styles.subImageWrap} 
          style={{ marginBottom: '80px' }}
        >
          <img 
            className={styles.subImage} 
            src={secondImageURI}
            onClick={() => setIsSecondLarge(true)}
          />
          {isSecondLarge && 
            <ImageViewer url={secondImageURI} onClick={() => setIsSecondLarge(false)} />}
          {account === 'admin' && 
            <ImageEditMenu fileName="second-item" setImageURI={setSecondImageURI} />}
        </div>
        <div className={styles.subImageWrap} >
          <img 
            className={styles.subImage} 
            src={thirdImageURI} 
            onClick={() => setIsThirdLarge(true)}
          />
          {isThirdLarge && 
            <ImageViewer url={thirdImageURI} onClick={() => setIsThirdLarge(false)} />}
          {account === 'admin' && 
            <ImageEditMenu fileName="third-item" setImageURI={setThirdImageURI} />}
        </div>
        <ThirdItemText />
      </div>
      <div className={styles.itemWrap}>
        {profile.items.map(item => <ProfileItem key={item.id} item={item} />)}
      </div>
    </section> 
  );
}
 
export default Profile;