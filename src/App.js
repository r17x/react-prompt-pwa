import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App ">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Membuat Prompt PWA #4
          </p>
          <a
            className="App-link"
            href="https://medium.com/wwwid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Baca Lebih Lanjut Di WWWID Yah
          </a>
        </header>
      </div>
    );
  }
}

export default App;
