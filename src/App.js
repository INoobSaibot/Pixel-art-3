import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import './App.css';

class App extends Component {
    render() {
      return (<div>
                <div className="App">Hello Pixel Artist!</div>
                  <Game />
              </div>
      );
    }
  }

  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        'firstName':'foo',
        'states':[{"foo":"purple"}],
      
      }
    }

    render() {
      const status = 'Draw something nice';
      
      const grid = this.loopyRenderRow(30,30)
  
      return (
        <div>
          <div className="status"></div>
            {grid}
        </div>
      );
    }

    handleClick = (e) =>{
     let color = this.props.color;
     let targetState = e.target.value;
     this.state[targetState]=color;
     
     // super silly hack to make state rerender! yay!
     let arr = this.state.pixels;
     this.setState({pixels:arr});

     const URL = 'http://localhost:8080/pixels';
     
     const item = this.state;

     fetch(URL, {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(item),
     });
    }

    loopyRenderRow(r,c){
      
      let handleClick = this.handleClick
      let grid = []
      for(let i = 0; i < r; i++) {
        let children = [];
        //inner
        for (let j = 0; j < c; j++) {
          let target = 'row_'+i+":"+"column_"+j;
          children.push(<Square background={this.state[target]} row={i} column={j} value={'row_'+i+":"+"column_"+j} handleClick={handleClick} key={i.toString() + "X" + j.toString()} />)
        }
        // parent and children
        grid.push(<div className="board-row" key={i}>{children}</div>)
      }
      return grid;
    }
  }


  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      let OliversMagenta = 'rgba(255,10,125)';
      this.colors=`red green orange pink blue yellow purple brown white black gray lightgray cyan khaki aqua darkgray brown indigo teal lime magenta ${OliversMagenta}`.split(" ");
      this.state = {
        paintColor:'purple',
      }
    }
    
    render() {
      const pallette = this.colors.map((item) => {
        return (
                <span className='row'>
                  <Square value={item} background={item} handleClick={this.handleClick}>{item}</Square>
                </span>
        )
      })

      return (
        <div className="game">
        <div className="pallette">{pallette}</div>
          <div className="game-board">
            <Board color={this.state.paintColor}/>
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }

    handleClick = (e) =>{
      this.setState({paintColor: e.target.value})
    }
  }

function Square(props) {    
  return (
        <button className="square" row={props.row} column={props.column} value={props.value} onClick={props.handleClick} style={{background:props.background}}></button>
      )
  }
  
//
export default App;
