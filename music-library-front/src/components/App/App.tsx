import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Albums from '../Albums/Albums';
import Header from '../Header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-content">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/albums' component={Albums} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
