import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from './pc/Nav';
import SideNav from './pc/SideNav';
import Profile from './pc/Profile';
import Admin from './pc/Admin';
import Home from  './pc/Home';
import styles from './Routes.module.scss';

const Routes = () => {
  const isMobile = false;

  if (isMobile) {
    return (
      <div>mobile 화면은 아직 지원하지 않습니다.</div>
    );
  } else {
    return ( 
      <Router>
        <Nav />

        <div className={styles.screen}>
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