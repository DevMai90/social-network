import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../create-profile/CreateProfile';
import EditProfile from '../edit-profile/EditProfile';
import AddExperience from '../add-credentials/AddExperience';
import AddEducation from '../add-credentials/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import NotFound from '../not-found/NotFound';
import Posts from '../posts/Posts';
import Post from '../post/Post';

import PrivateRoute from '../common/PrivateRoute';

const Routes = () => {
  return (
    <div className="container">
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profiles" component={Profiles} />
      <Route exact path="/profile/:handle" component={Profile} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/add-education" component={AddEducation} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/feed" component={Posts} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/post/:id" component={Post} />
      </Switch>
      <Route component={NotFound} />
    </div>
  );
};

export default Routes;
