import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import QueryResult from './pages/QueryResult';
import UserProfile from './pages/UserProfile';
import './styles/app.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/log-in" component={LogIn} />
        <Route exact={true} path="/sign-up" component={SignUp} />
        <Route exact={true} path="/feed" component={Feed} />
        <Route exact={true} path="/profile" component={Profile} />
        <Route exact={true} path="/results" component={QueryResult} />
        <Route exact={true} path="/user-profile" component={UserProfile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
