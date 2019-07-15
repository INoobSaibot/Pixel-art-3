import React, { Component } from 'react';
//import './index.css';
//import './App.css';
import Board from '../Board/Board.js'

class Game extends Component {
    constructor(props) {
      super(props);
      let OliversMagenta = 'rgba(255,10,125)';
      this.colors=`red green orange pink blue yellow purple white black gray lightgray cyan khaki aqua darkgray brown indigo teal lime magenta ${OliversMagenta}`.split(" ");
      this.state = {
        paintColor:'purple',
        eraserSelected: false,
        fillButtonSelected: false,
        clearPixels: false,
      }
    }
    
    render() {
      let eraser = <this.EraseButton handleClick={this.selectEraser} value={'eraser'} selected={this.state.eraserSelected}/>;
      let fillButton = <this.FillButton handleClick={this.selectFillButton} selected={this.state.fillButtonSelected}/>;
      let clearButton = <this.ClearButton/>;
      
      const pallette = this.colors.map((item) => {
        return (
                <span className='' key={item}>
                  <Square value={item} background={item} handleClick={this.handleClick}>{item}</Square>
                </span>
        )
      })

      return (
        <div className="game">
        <div className="pallette">{pallette}</div>
          <div className="game-board">
            <div className="row">
              
              <div className="">
                {eraser}
                {fillButton}
                {clearButton}
              </div>
            
            <div className="column"> 
            <Board color={this.state.paintColor} eraser={this.state.eraserSelected} 
                fillButton={this.state.fillButtonSelected} gameState={this.state}
                setClearHandler={this.setClearClickHandler}/>
            </div>

          </div>
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }

    handleClick = (e) =>{
      this.setState({paintColor: e.target.value})
    }

    selectEraser = () => {
      this.setState({eraserSelected: !this.state.eraserSelected});
    }
    
    EraseButton(props) {
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'36px'};

      return (
        <button className='btn row' style={style} onClick={props.handleClick} value={props.value}>
          <i className="fa fa-eraser" style={iconStyle}></i>
        </button>
      )
    }

    FillButton(props) {
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'36px', width:'38px'};

      return (
        <button className='btn row' style={style} onClick={props.handleClick} value={props.value}>
          <i className="fa fa-bitbucket" style={iconStyle}></i>
        </button>
      )
    }

    selectFillButton = (e) => {
      this.setState({fillButtonSelected: !this.state.fillButtonSelected});
    }

    ClearButton = (props) => {
        let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
        let iconStyle = {fontSize:'36px', width:'38px'};
        
        return (
        <button className='btn row' style={style} onClick={this.clearClick} value={props.value}>
          <i className="fa fa-bomb" style={iconStyle}></i>
        </button>
      )
    }

    clearClick = () => {
        alert('boom');
        this.handleClearClick();
    }

    setClearClickHandler = (handlerFromBoard) => {
        this.handleClearClick = handlerFromBoard;
    }

  }

function Square(props) {    
  return (
        <button className="square" row={props.row} column={props.column} value={props.value} onClick={props.handleClick} style={{background:props.background}}></button>
      )
  }

export default Game;