import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Nav from './nav/Nav';
import BarsNav from './nav/BarsNav';
import LeftNav from './nav/LeftNav';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Home from  './pages/Home';
import Goods from './pages/Goods';
import ItemDetail from './pages/ItemDetail';
import imageUrl from '../config/backgroundImage';
import styles from './Routes.module.scss';

const Routes = () => {
  const page = useSelector(state => state.ui.page);
  const isBars = useSelector(state => state.ui.isBars);
  
  let backgroundImage;
  if (page === 'home') backgroundImage = `url('${imageUrl}')`;

  return ( 
    <Router>
      <Nav />
      {isBars && <BarsNav />}

      <div className={styles.screen} style={{backgroundImage}}>
        <div className={styles.screenBumper}></div>
        <div className={styles.mainWrap}>
          <LeftNav />
          <div className={styles.mainBumper} />
          <main className={styles.main}>
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/item/:category/:id">
                <ItemDetail />
              </Route>
              <Route path="/item/:category">
                <Goods />
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
 
export default Routes;