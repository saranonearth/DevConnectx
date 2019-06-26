import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layouts/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import CreateProfile from '../Profile-Form/CreateProfile';
import EditProfile from '../Profile-Form/EditProfile';
import AddExperience from '../Profile-Form/AddExperience';
import AddEducation from '../Profile-Form/AddEducation';
import Profiles from '../Profile-Form/Profiles';
import Profile from '../Profile/Profile';
import Post from '../posts/Post';
import Comment from '../posts/Comment';
import NotFound from '../layouts/NotFound';
const Routes = () => {
  return (
    <>
      <section className='container'>
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/create-profile'
            component={CreateProfile}
          />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute
            exact
            path='/add-experience'
            component={AddExperience}
          />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <PrivateRoute exact path='/posts' component={Post} />
          <PrivateRoute exact path='/posts/:id' component={Comment} />
          <Route component={NotFound} />
        </Switch>
      </section>
    </>
  );
};

export default Routes;
