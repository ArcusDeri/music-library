import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Albums from '../Albums/Albums';
import Header from '../Header/Header';
import NewAlbum from '../NewAlbum/NewAlbum';
import './App.css';
import Songs from '../Songs/Songs';
import Artists from '../Artists/Artists';
import AlbumInfo from '../AlbumInfo/AlbumInfo';

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
            <Route exact path='/artists' component={Artists} />
            <Route exact path='/albums/:id' component={AlbumInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
