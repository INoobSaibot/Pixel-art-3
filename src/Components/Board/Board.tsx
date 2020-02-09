import React, { Component } from 'react';
import PersistanceService from '../../Persistance/persistance.service';
import Canvas from '../Canvas/canvas';
import './board.css';
import { EventEmitter } from '../../EventEmitter/events';
import UndoService from '../../UndoService/undo.service';

interface MyProps {
    currentlyOpenArt:any;
    board:any;
    playPaintFillSound(): any;
    eraser: boolean;
    fillButton: boolean;
    color: boolean;

    testOnly: boolean;
  }
  
interface MyState {
    pixelData: any
    windowWidth: number
  }

class Board extends Component<MyProps, MyState> {
    constructor(props:any) { 
      super(props);
      this.state = {
          pixelData :[],
          windowWidth: 0
      }
    }

    persistance = new PersistanceService();
    undoService = new UndoService();
    
    componentDidMount() {
        let gridData = this.loopyRenderRow(30,30).state;
        this.setState({pixelData:gridData});
        
        EventEmitter.subscribe('clearBoardClicked', (event: any) => this.clearBoard());
        EventEmitter.subscribe('saveClicked', (event: any) => this.saveArt(event));
        EventEmitter.subscribe('openArtClicked', (art: any)=> this.openArt(art));
        EventEmitter.subscribe('newArtClicked', () => this.new());
        
        window.addEventListener('resize', this.displayWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.displayWindowResize);

    }

    displayWindowResize = ($event: any) => {
        const windowWidth = $event.target.innerWidth;
        this.setState({windowWidth:windowWidth})
    }

    render() {
        ///
        const testing_canvasMustBeDisabled:boolean = false; // set this to true for test, this.props.testOnly; 
        ///
        let columns = 14;
        const widthCheckLimits = 768; // px wide
        const width = document.documentElement.clientWidth;
        if (width > widthCheckLimits) {
            columns = 30;
        }
        const gridAndState = this.loopyRenderRow(30, columns);
        const grid = gridAndState.grid;

        const exportCanvas_or_emptySpanForTestingIssue = (testing_canvasMustBeDisabled && <span></span> ) || <Canvas pixelData={this.state.pixelData} artName={this.props.currentlyOpenArt} board={this.props.board}></Canvas>
        const undoButton = <button id='undoId' className='undoButton' data-testid='undo' onClick={this.undoClicked}>undo</button>
        const redoButton = <button id='redoId' className='redoButton' data-testid='redo' onClick={this.redoClicked}>redo</button>

        
        return (
            <div>
            <div id='art-name-container'>Name:<span id='art-name'> {this.props.currentlyOpenArt}</span></div>
                {undoButton} {redoButton}
                <div>
                    {exportCanvas_or_emptySpanForTestingIssue}
                    <div className='grid'>{grid}</div>
                </div>
            </div>
        );
    }

    undoClicked = () => {
        const oldPixels = this.undoService.backward();

        if (oldPixels != undefined)
        {
            this.setState({pixelData: oldPixels});
        }
    }

    redoClicked = () => {
        const oldPixels = this.undoService.forward();

        if (oldPixels != undefined)
        {
            this.setState({pixelData: oldPixels});
        }
    }

    new = () => {
        this.clearBoard();
        EventEmitter.dispatch('art-switched', undefined)
    }

    openArt(artName: string){
        this.setState(this.persistance.openArt(artName))
    }

    handleClick = (e: any) =>{
        this.props.playPaintFillSound();
        let pixelData = this.state.pixelData;
        let clickedPixel = e.target;
        let rowAndColumn = clickedPixel.getAttribute('id').split("__");

        let row = rowAndColumn[0].replace('row_', '');
        let column = rowAndColumn[1].replace('col_', '');
        let position = {row:row,column:column};

        let eraserSelected = this.props.eraser;
        
        if (this.props.fillButton) {
            const targetsColor = pixelData[row][column];
            this.paintFill(position,targetsColor);
      }
      else {
        let color = !eraserSelected ? this.props.color : ''; //paint or eraser
        pixelData[row][column] = color;

        this.storePreviousStateForUndo(this.state);
        this.setState({pixelData:pixelData});
      }
    }

    storePreviousStateForUndo(state: any) {
        this.undoService.store(state.pixelData);
    }

    paintFill = (position: any, matchColor: any) => {
        let color = this.props.color;
        let pixelData = this.state.pixelData;
        let neighbors = this.getNeighbors(position);
        let pixelClicked = (color: boolean) => pixelData[position.row][position.column] = color;
        pixelClicked(color);

        //TODO: bandaid to fix edge-case bug, if color to paint === targets color, causes infinite recursion, as returning no matches is only thing that ends recursion
        if (color === matchColor) {return;}

        if (neighbors.length > 0) {
            
            // TODO: refactor, hardcoded row col limits ets.
            let sanitizedNeighbors = neighbors.filter(pos => (pos.row >= 0 && pos.row <= 29 && pos.column >=0 && pos.column <= 29));
            let matches = sanitizedNeighbors.filter(pos => pixelData[pos.row][pos.column] === matchColor);
            
            matches.forEach(function(position) {
                pixelData[position.row][position.column] = color;
            });
            this.setState({pixelData:pixelData});

            matches.forEach(position2 => this.paintFill(position2, matchColor));
        }
    }

    getNeighbors = (position: any) => {
        const column = position.column;
        const row = position.row;
        
        const colBack = column-1;
        const colOver = column+1;
        const rowDown = row+1;
        const rowUp = row-1;
        const neighbors = [
            {row:rowUp,column:column}
            ,{row:rowDown,column:column}
            ,{row:row,column:colOver}
            ,{row:row,column:colBack}
        ]
        return neighbors;
    }

    clearBoard = () => {
        let emptyPixelData = this.loopyRenderRow(30,30).state;

        this.storePreviousStateForUndo(this.state);
        this.setState({pixelData:emptyPixelData});
    }

    saveArt = (saveOrSaveAs: any) => {
        this.persistance.save(this, saveOrSaveAs)
    }

    loopyRenderRow(r: number,c: number){
        //also used to popular pixelData array to all empty value 2d array grid,
        // will refactro, for 2 methods, with a common paramed method
        let pixelArrayHasInitialPopulationComplete = this.state.pixelData[r-1];
        let handleClick = this.handleClick

        const pixelWidth = properlySizePixelButtons(c)
        
        let grid = []
        let gridState = [];

        for(let i = 0; i < r; i++) {
        let children = [];
        let childState = [];
        //inner
        for (let j = 0; j < c; j++) {
            let value = `row_${i}:column_${j}`;
            let background;
            
            if (pixelArrayHasInitialPopulationComplete) {
                background = this.state.pixelData[i][j];
            }

            children.push(<Square background={background} row={i} column={j} pixelWidth={pixelWidth}
                value={value} handleClick={handleClick} key={i.toString() + "X" + j.toString()} />)

            childState.push('');
        }
        // parent and children
        grid.push(<div className="board-row" key={i}>{children}</div>)
        gridState.push(childState);
        }
        const gridAndPopulatedStateArray = {grid:grid, state:gridState};
        return gridAndPopulatedStateArray;
    }
  }

  export function Square(props: any) {    
    let id = generateID(props.row, props.column);
    const pixelWidth = props.pixelWidth;
    const pixelHeight = pixelWidth;
    return (
          <button id={id} data-testid={id} className="square" data-row={props.row} data-column={props.column} value={props.value} onClick={props.handleClick} style={{background:props.background, width:pixelWidth, height:pixelHeight}}></button>
        )
    }

    function generateID(row: number, column: number){
        let id = 'row_'+row.toString() + '__' + 'col_'+ column.toString();
        return id;
    }

    function properlySizePixelButtons(numberOfColumns: number) {
        const width = document.documentElement.clientWidth;
        const calculatedPixelWidth = Math.floor(width / numberOfColumns);        
        
        return calculatedPixelWidth;
    }


export default Board;