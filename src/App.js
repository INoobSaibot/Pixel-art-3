import React, { Component } from 'react';
import './index.css';
import './App.css';
import Game from './Components/Game/Game'


class App extends Component {
    render() {
      return (<div>
                <div className="App">Hello Pixel Artist!</div>
                  <Game />
              </div>
      );
    }
  }

export default App;
