import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {ESIPage} from './ESIPage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ESIPage/>
        </header>
      </div>
    );
  }
}

export default App;
