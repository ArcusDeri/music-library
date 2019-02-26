import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Albums from '../Albums/Albums';
import Header from '../Header/Header';
import NewAlbum from '../NewAlbum/NewAlbum';
import './App.css';
import Songs from '../Songs/Songs';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-content">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/albums' component={Albums} />
            <Route exact path='/albums/add' component={NewAlbum} />
            <Route exact path='/songs' component={Songs} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
