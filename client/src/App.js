import React, { Fragment, useEffect } from 'react';
import './App.css';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import { loadUser } from './actions/auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuth';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
