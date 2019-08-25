import React, { Component } from 'react';
//import './index.css';
import './game.css';
import Board from '../Board/Board.js'
import illuminatiGraphic from '../../assets/illum.png'
import illuminatiSVG from '../../assets/noun_illuminati_142795.svg'
import bubbleSound from '../../assets/zapsplat_cartoon_bubbles_001_26516.mp3'
import illumSong from '../../assets/The X Files theme.mp3'
import boom from '../../assets/Explosion 2-SoundBible.com-1641389556.mp3';
import FileMenuButton from '../Buttons/FileMenuButton/FileMenuButton.js'


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
        illuminatiPlaying: false,
        clearCountDown:false,
        currentlySelectedArt:null
      }

      this.audio = new Audio(illumSong);
      this.audio.onended = () => {
        this.setState({illuminatiPlaying:false});
      }
      this.boom = new Audio(boom);

    }

    handleClick = (e) =>{
        this.setState({paintColor: e.target.value})
    }
    
    render() {
      let eraser = <this.EraseButton handleClick={this.selectEraser} value={'eraser'} selected={this.state.eraserSelected} />;
      let fillButton = <this.FillButton handleClick={this.selectFillButton} selected={this.state.fillButtonSelected} paintColor={this.state.paintColor}/>;
      let clearButton = <this.ClearButton clearCountDown={this.state.clearCountDown} />;
      let illuminati = <this.IlluminatiButton handleClick={this.illuminatiClicked} selected={this.state.illuminatiPlaying} audio={this.audio}/>;
      let fileMenuButton = <FileMenuButton selectArtKey={this.selectArtKey} handleSave={this.saveClicked} new={this.new}/>;

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
                {illuminati}
                {fileMenuButton}
              </div>
            
            <div className="column"> 
            <Board color={this.state.paintColor} eraser={this.state.eraserSelected} 
                fillButton={this.state.fillButtonSelected} gameState={this.state}
                setClearHandler={this.setClearClickHandler} setSaveHandler={this.setSaveHandler}
                setOpenItemHandler={this.setOpenItemHandler} setNewHandler={this.setNewHandler} currentlyOpenArt={this.state.currentlySelectedArt}
                changeCurrentArt={this.changeCurrentArt}/>
            </div>

          </div>
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }

    changeCurrentArt = (name) => {
      this.setState({currentlySelectedArt:name})
    }

    selectArtKey = (key) => {
      this.setState({currentlySelectedArt: key})
      this.handleItemClicked(key);
    }

    setOpenItemHandler = (handlerFromBoard) => {
      this.handleItemClicked = handlerFromBoard;
    }
    itemClicked = () => {
      this.handleItemClicked();
    }

    
    setSaveHandler = (handlerFromBoard) => {
      this.handleSaveClicked = handlerFromBoard;
    }

    new = () => {
      this.handleSaveClicked();
      this.handleNew();
    }
    setNewHandler = (handlerFromBoard) => {
      this.handleNew = handlerFromBoard;
    }
    
    saveClicked = (e) => {
        this.handleSaveClicked(e);
    }
    
    SaveButton(props) {
        let style= {height:'50px'};
        let iconStyle = {fontSize:'44px'};
  
        return (
          <button className='btn row toolButton' style={style} onClick={props.handleClick} value={props.value}>
            <i className="fa fa-save" style={iconStyle}></i>Save
          </button>
        )
      }
    
    selectEraser = () => {
      // todo: refactor this, if eraser not being used already, set fill button/ turn off fill button bucket, before activiating eraser
      if (!this.state.eraserSelected) {this.setState({fillButtonSelected:false})};
      this.setState({eraserSelected: !this.state.eraserSelected});
    }

    EraseButton(props) {
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'35px', width:'38px'};
      let iconClasses = props.selected ? "fa fa-eraser shakingIcon" : "fa fa-eraser";

      return (
        <button className='btn btn-default row toolButton' style={style} onClick={props.handleClick} value={props.value}>
          <i className={iconClasses} style={iconStyle}></i>
        </button>
      )
    }

    illuminatiClicked = () => {
      if (!this.state.illuminatiPlaying || this.audio.ended) {
        this.audio.play();
      } else {
        this.audio.pause();
        this.audio.currentTime = 0;
      }

      this.setState({illuminatiPlaying:!this.state.illuminatiPlaying});
    }
    IlluminatiButton(props) {
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'35px', width:'38px'};
      let imgSrc = illuminatiGraphic;
      imgSrc=illuminatiSVG

      return (
        <button className='btn btn-default row toolButton' style={style} onClick={props.handleClick} value={props.value}>
          <i className=""><img style={iconStyle} src={imgSrc} alt={"open file button, img of 3.5inch disk"}></img></i>
        </button>
      )
    }

    FillButton(props) {
      let bucketColor = props.selected ? props.paintColor :"";
      let style= props.selected ? {borderColor: 'yellow'} : {borderColor:''};
      let iconStyle = {fontSize:'36px', width:'38px', color: bucketColor};
      let bucketClasses = props.selected ? "fa fa-bitbucket pouringBucket" : "fa fa-bitbucket";

      return (
        <button className='btn btn-default row toolButton' style={style} onClick={props.handleClick} value={props.value}>
          <i className={bucketClasses} style={iconStyle}></i>
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
        let iconClasses = "fa fa-bomb";
        if (props.clearCountDown) {
          iconClasses += " expandingIcon";
        }
        
        return (
        <button className='btn btn-default row toolButton' style={style} onClick={this.clearClick} value={props.value}>
          <i className={iconClasses} style={iconStyle}></i>
        </button>
      )
    }

    clearClick = () => {
      this.setState({clearCountDown:true});
      setTimeout( () => {
        this.handleClearClick();
        this.boom.play();
        this.setState({clearCountDown:false})
      },1000)
        
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