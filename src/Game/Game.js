import React, { Component } from 'react';
//import './index.css';
import './game.css';
import Board from '../Board/Board.js'
import illuminatiGraphic from '../assets/illum.png'
import bubbleSound from '../assets/zapsplat_cartoon_bubbles_001_26516.mp3'
import illumSong from '../assets/The X Files theme.mp3'


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
        illuminatiPlay: false
      }
      this.audio = new Audio(illumSong);
    }

    handleClick = (e) =>{
        this.setState({paintColor: e.target.value})
    }
    
    render() {
      let eraser = <this.EraseButton handleClick={this.selectEraser} value={'eraser'} selected={this.state.eraserSelected} />;
      let fillButton = <this.FillButton handleClick={this.selectFillButton} selected={this.state.fillButtonSelected} paintColor={this.state.paintColor}/>;
      let clearButton = <this.ClearButton/>;
      let saveButton = <this.SaveButton handleClick={this.saveClicked} />;
      let illuminati = <this.IlluminatiButton handleClick={this.illuminatiClicked} selected={this.state.illuminatiPlay} audio={this.audio}/>;
      
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
                {saveButton}
                {illuminati}
              </div>
            
            <div className="column"> 
            <Board color={this.state.paintColor} eraser={this.state.eraserSelected} 
                fillButton={this.state.fillButtonSelected} gameState={this.state}
                setClearHandler={this.setClearClickHandler} setSaveHandler={this.setSaveHandler} />
            </div>

          </div>
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }

    setSaveHandler = (handlerFromBoard) => {
        this.handleSaveClicked = handlerFromBoard;
    }
    saveClicked = () => {
        this.handleSaveClicked();
    }
    SaveButton(props) {
        let style= {height:'50px'};
        let iconStyle = {fontSize:'44px'};
  
        return (
          <button className='btn row toolButton' style={style} onClick={props.handleClick} value={props.value}>
            <i className="fa fa-save" style={iconStyle}></i>
          </button>
        )
      }
  
    selectEraser = () => {
        if (!this.state.eraserSelected) {this.setState({fillButtonSelected:false})};
        this.setState({eraserSelected: !this.state.eraserSelected});
    }

    EraseButton(props) {
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'35px', width:'38px'};

      return (
        <button className='btn row toolButton' style={style} onClick={props.handleClick} value={props.value}>
          <i className="fa fa-eraser" style={iconStyle}></i>
        </button>
      )
    }

    illuminatiClicked = () => {
      this.audio.currentTime = 0;
      
      if (!this.state.illuminatiPlay || this.audio.ended) {
        this.audio.play();
      } else {
        this.audio.pause();
        this.audio.currentTime = 0;
      }

      this.setState({illuminatiPlay:!this.state.illuminatiPlay});
    }
    IlluminatiButton(props) {
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'35px', width:'38px'};
      let imgSrc = illuminatiGraphic;


      return (
        <button className='btn row toolButton' style={style} onClick={props.handleClick} value={props.value}>
          <i className=""><img style={iconStyle} src={imgSrc}></img></i>
        </button>
      )
    }

    FillButton(props) {
      let bucketColor = props.selected ? props.paintColor :"";
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'36px', width:'38px', color: bucketColor};

      return (
        <button className='btn row toolButton' style={style} onClick={props.handleClick} value={props.value}>
          <i className="fa fa-bitbucket" style={iconStyle}></i>
        </button>
      )
    }

    selectFillButton = (e) => {
        if (!this.state.fillButtonSelected) {this.setState({eraserSelected:false})};
        this.setState({fillButtonSelected: !this.state.fillButtonSelected});

    }

    ClearButton = (props) => {
        let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
        let iconStyle = {fontSize:'36px', width:'38px'};
        
        return (
        <button className='btn row toolButton' style={style} onClick={this.clearClick} value={props.value}>
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