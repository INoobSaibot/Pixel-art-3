import React, {Component} from 'react';
import boom from '../../assets/Explosion 2-SoundBible.com-1641389556.mp3';
import illuminatiGraphic from '../../assets/illum.png';
import illuminatiSVG from '../../assets/noun_illuminati_142795.svg';
import illumSong from '../../assets/The X Files theme.mp3';
import bubbleSound from '../../assets/zapsplat_cartoon_bubbles_001_26516.mp3';
import Pallette from '../../Components/Pallette/pallette';
import {EventEmitter} from '../../EventEmitter/events';
import Board from '../Board/Board';
import FileMenuButton from '../Buttons/FileMenuButton/FileMenuButton.js';
import './game.css';
import Login, {LoginButton} from '../../Persistance/login'


class Game extends Component {
    constructor(props) {
        super(props);
        let OliversMagenta = 'rgba(255,10,125)';
        this.colors = `red green orange pink blue yellow purple white black gray lightgray cyan khaki aqua darkgray brown indigo teal lime magenta ${OliversMagenta}`.split(" ");
        this.state = {
            paintColor: 'purple',
            eraserSelected: false,
            fillButtonSelected: false,
            clearPixels: false,
            illuminatiPlaying: false,
            clearCountDown: false,
            currentlySelectedArt: null,
            showLogin: true
        }

        this.audio = new Audio(illumSong);
        this.audio.onended = () => {
            this.setState({illuminatiPlaying: false});
        }
        this.boom = new Audio(boom);
        this.paintingSound = new Audio(bubbleSound);
    }

    componentDidMount() {
        EventEmitter.subscribe('art-switched', this.changeCurrentArt);
        EventEmitter.subscribe('art-loaded', this.changeCurrentArt)
    }

    render() {
        let eraser = <this.EraseButton handleClick={this.selectEraser} value={'eraser'}
                                       selected={this.state.eraserSelected}/>;
        let fillButton = <this.FillButton handleClick={this.selectFillButton} selected={this.state.fillButtonSelected}
                                          paintColor={this.state.paintColor}/>;
        let clearButton = <this.ClearButton clearCountDown={this.state.clearCountDown}/>;
        let illuminati = <this.IlluminatiButton handleClick={this.illuminatiClicked}
                                                selected={this.state.illuminatiPlaying} audio={this.audio}/>;
        let fileMenuButton = <FileMenuButton selectArtKey={this.selectArtKey} handleSave={this.saveClicked}/>;
        let login_button = <LoginButton onClick={this.loginClick}></LoginButton>
        const login = <Login passwordCancel={this.loginPasswordCancel}></Login>

        return (
            <div className="game">
                {this.state.showLogin && login}
                <span className="">{login_button}{fileMenuButton}{eraser}{fillButton}{clearButton}{illuminati}</span>
                <Pallette colors={this.colors} handleClick={this.handleClick}></Pallette>
                <div className="game-board">
                    <div className="">
                        <div className="column">
                            <Board color={this.state.paintColor} eraser={this.state.eraserSelected}
                                   fillButton={this.state.fillButtonSelected} gameState={this.state}
                                   currentlyOpenArt={this.state.currentlySelectedArt}
                                   playPaintFillSound={this.playPaintFillSound}/>
                        </div>

                    </div>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }

    handleClick = (e) => {
        this.setState({paintColor: e.target.value})
    }

    loginClick = (e) => {
        this.setState({showLogin: true})
    }

    loginPasswordCancel = () => {
        this.setState({showLogin:false})
    }

    changeCurrentArt = (name) => {
        this.setState({currentlySelectedArt: name})
    }

    selectArtKey = (key, title) => {
        // here on open clicked
        this.setState({currentlySelectedArt: title})
        EventEmitter.dispatch('openArtClicked', key)
    }

    saveClicked = (saveOrSaveAs) => {
        EventEmitter.dispatch('saveClicked', saveOrSaveAs)
    }

    selectEraser = () => {
        // todo: refactor this, if eraser not being used already, set fill button/ turn off fill button bucket, before activiating eraser
        if (!this.state.eraserSelected) {
            this.setState({fillButtonSelected: false})
        }
        ;
        this.setState({eraserSelected: !this.state.eraserSelected});
    }

    EraseButton(props) {
        let style = props.selected ? {borderColor: 'yellow'} : {borderColor: ''};
        let iconStyle = {fontSize: '35px', width: '38px'};
        let iconClasses = props.selected ? "fa fa-eraser shakingIcon" : "fa fa-eraser";

        return (
            <button className='btn btn-default row toolButton' style={style} onClick={props.handleClick}
                    value={props.value}>
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

        this.setState({illuminatiPlaying: !this.state.illuminatiPlaying});
    }

    IlluminatiButton(props) {
        let style = props.selected ? {borderColor: 'yellow'} : {borderColor: ''};
        style.overflow = 'hidden';
        let iconStyle = {fontSize: '35px', width: '38px'};
        let imgSrc = illuminatiGraphic;
        imgSrc = illuminatiSVG

        return (
            <button className='btn btn-default row toolButton' style={style} onClick={props.handleClick}
                    value={props.value}>
                <i className=""><img style={iconStyle} src={imgSrc} alt={"open file button, img of 3.5inch disk"}></img></i>
            </button>
        )
    }

    FillButton(props) {
        let bucketColor = props.selected ? props.paintColor : "";
        let style = props.selected ? {borderColor: 'yellow'} : {borderColor: ''};
        let iconStyle = {fontSize: '36px', width: '38px', color: bucketColor};
        let bucketClasses = props.selected ? "fa fa-bitbucket pouringBucket" : "fa fa-bitbucket";

        return (
            <button className='btn btn-default row toolButton' style={style} onClick={props.handleClick}
                    value={props.value}>
                <i className={bucketClasses} style={iconStyle}></i>
            </button>
        )
    }

    selectFillButton = (e) => {
        if (!this.state.fillButtonSelected) {
            this.setState({eraserSelected: false})
        }
        ;
        this.setState({fillButtonSelected: !this.state.fillButtonSelected});

    }

    ClearButton = (props) => {
        let style = props.selected ? {borderColor: 'yellow'} : {borderColor: ''};
        let iconStyle = {fontSize: '36px', width: '38px'};
        let iconClasses = "fa fa-bomb";
        if (props.clearCountDown) {
            iconClasses += " expandingIcon";
        }

        return (
            <button className='btn btn-default row toolButton' style={style} onClick={this.clearClick}
                    value={props.value}>
                <i className={iconClasses} style={iconStyle}></i>
            </button>
        )
    }

    clearButtonClicked = (e) => {
        EventEmitter.dispatch('clearBoardClicked', e);
    }

    clearClick = (e) => {
        this.setState({clearCountDown: true});

        setTimeout(() => {
            this.clearButtonClicked(e)
            this.boom.play();
            this.setState({clearCountDown: false})
        }, 1000)

    }

    playPaintFillSound = () => {
        this.paintingSound.play();
    }

}

export default Game;