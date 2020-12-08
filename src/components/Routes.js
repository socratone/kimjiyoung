import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from './pc/Nav';
import Profile from './pc/Profile';
import Admin from './pc/Admin';
import Home from  './pc/Home';

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
      </Router>
    );
  }
}
 
export default Routes;