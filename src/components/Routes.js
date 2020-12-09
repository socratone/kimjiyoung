import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Nav from './pc/Nav';
import SideNav from './pc/SideNav';
import Profile from './pc/pages/Profile';
import Admin from './pc/pages/Admin';
import Home from  './pc/pages/Home';
import Goods from './pc/pages/Goods';
import imageUrl from '../config/backgroundImage';
import styles from './Routes.module.scss';

import { crossItems } from '../fakeData';

const Routes = () => {
  const page = useSelector(state => state.ui.page);
  const isMobile = false;

  if (isMobile) {
    return (
      <div>mobile 화면은 아직 지원하지 않습니다.</div>
    );
  } else {
    let backgroundImage;
    if (page === 'home') backgroundImage = `url('${imageUrl}')`;

    return ( 
      <Router>
        <Nav />

        <div className={styles.screen} style={{backgroundImage}}>
          <div className={styles.screenBumper}></div>
          <div className={styles.mainWrap}>
            <SideNav />
            <main className={styles.main}>
              <Switch>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/cross">
                  <Goods items={crossItems} title="Cross" />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
          </div> 
        </div>
      </Router>
    );
  }
}
 
export default Routes;