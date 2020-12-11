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
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Home from  './pages/Home';
import Goods from './pages/Goods';
import ItemDetail from './pages/ItemDetail';
import styles from './Routes.module.scss';

const Routes = () => {
  const isBars = useSelector(state => state.ui.isBars);

  return ( 
    <Router>
      <Nav />
      {isBars && <BarsNav />}

      <div className={styles.screen}>
        <div className={styles.screenBumper}></div>
        <div className={styles.mainWrap}>
          <LeftNav />
          <div className={styles.mainBumper} />
          <main className={styles.main}>
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/signout">
                <Signout />
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