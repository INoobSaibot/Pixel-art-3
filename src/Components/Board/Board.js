import React, { Component } from 'react';
import HTTPService from '../../HTTPService/HTTPService'
import Canvas from '../Canvas/canvas'
import './board.css'

class Board extends Component {
    constructor(props) {
      super(props);
      this.http = new HTTPService();
      this.state = {
          pixelData :[

          ],
      }
    }

    componentDidMount() {
        let gridData = this.loopyRenderRow(30,30).state;
        this.setState({pixelData:gridData});

        this.props.setClearHandler(this.clearBoard);
        this.props.setSaveHandler(this.saveArt);
        this.props.setOpenItemHandler(this.openArt);
        this.props.setNewHandler(this.new);
    }

    

    drawOnCanvas(ctx, row, column) {
        let width = 10;
        let height = 10;
        let x_start = width * column; 
        let y_start = height * row;
        ctx.fillRect(x_start, y_start, width, height);
    }

    exportCanvasAsPng(){
        const canvas = this.refs.canvas;
        const MIME_TYPE = "image/png";
        const imgURL = canvas.toDataURL(MIME_TYPE);

        this.setState({canvasHref: imgURL})
    }

    canvasClick = ()=>{
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        const rows = this.state.pixelData;
        let row_number = -1;
        rows.forEach( (rowOfPixels) => {
            let column_number = 0;
            row_number++;
            rowOfPixels.forEach( pixel => {
                if (pixel) {
                    ctx.fillStyle = pixel;
                    this.drawOnCanvas(ctx, row_number, column_number)
                }
                column_number++;
            })
        })

        this.exportCanvasAsPng();

    }

    render() {
      const gridAndState = this.loopyRenderRow(30,30);
      const grid = gridAndState.grid;
  
      return (
        <div>
          <div id='art-name-container'>Name:<span id='art-name'> {this.props.currentlyOpenArt}</span></div>
            <div>
                <Canvas pixelData={this.state.pixelData} artName={this.props.currentlyOpenArt}></Canvas>
                {grid}
            </div>
        </div>
      );
    }

    new = () => {
        this.clearBoard();
        this.props.changeCurrentArt(undefined);
    }

    handleClick = (e) =>{
        this.props.playPaintFillSound();
        let pixelData = this.state.pixelData;
        let clickedPixel = e.target;
        let row = parseInt(clickedPixel.getAttribute('row'));
        let column = parseInt(clickedPixel.getAttribute('column'));
        let position = {row:row,column:column};

        let eraserSelected = this.props.eraser;
        
        if (this.props.fillButton) {
            const targetsColor = pixelData[row][column];
            this.paintFill(position,targetsColor);
      }
      
      else {
        let color = !eraserSelected ? this.props.color : ''; //paint or eraser
        pixelData[row][column] = color;
        this.setState({pixelData:pixelData});
      }
    }

    paintFill = (position, matchColor) => {
        let color = this.props.color;
        let pixelData = this.state.pixelData;
        let neighbors = this.getNeighbors(position);
        let pixelClicked = color => pixelData[position.row][position.column] = color;
        pixelClicked(color);

        //TODO: bandaid to fix edge-case bug, if color to paint === targets color, causes infinite recursion, as returning no matches is only thing that ends recursion
        if (color === matchColor) {return;}

        if (neighbors.length > 0) {
            
            // TODO: refactor, hardcoded row col limits ets.
            let sanitizedNeighbors = neighbors.filter(pos => (pos.row >= 0 && pos.row <= 29 && pos.column >=0 && pos.column <= 29));
            let matches = sanitizedNeighbors.filter(pos => pixelData[pos.row][pos.column] === matchColor);
            //let notColorMatch = sanitizedNeighbors.filter(pos => !pixelData[pos.row][pos.column] === matchColor);
            
            matches.forEach(function(position) {
                pixelData[position.row][position.column] = color;
            });
            this.setState({pixelData:pixelData});

            matches.forEach(position2 => this.paintFill(position2, matchColor));
        }
    }

    getNeighbors = (position) => {
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
        this.setState({pixelData:emptyPixelData});
    }

    saveArt = (props) => {
        //if(this.state.name === 'undefined'){return}
        let localStorage = window.localStorage;
        let key = this.state.name;
        if(key==='undefined') {alert('undefined key')}
        let model = this.state;
        let saveAs = props ==="saveAs";

        let value = JSON.stringify(model);

        if (this.props.currentlyOpenArt && !saveAs) {
            localStorage.setItem(key,value);
            // saVED!!
        } else {
            let msg = "Please name your art:";
            let untitled = this.generateNewFileName();
            let defaultName =this.props.currentlyOpenArt? this.props.currentlyOpenArt : untitled;

            let artName = prompt(msg,defaultName);

            if (artName === null || artName === "") {
                //user cancelled prompt
            } else {
                key = artName;
                localStorage.setItem(key,value);
                
                this.props.changeCurrentArt(key);
            }
        }
    }

    generateNewFileName() {
        //todo
        //check in loop untitle-Number i loop, until first one in in set/ is available
        //faked for now
        return 'untitled-n'
    }

    openArt = (key) => {
        let localStorage = window.localStorage;
        let arrFromLocalStorage = localStorage.getItem(key);

        let pixelDataModel = JSON.parse(arrFromLocalStorage);
        this.setState(pixelDataModel);
    }
    loopyRenderRow(r,c){
        //also used to popular pixelData array to all empty value 2d array grid,
        // will refactro, for 2 methods, with a common paramed method
        let pixelArrayHasInitialPopulationComplete = this.state.pixelData[r-1];
        let handleClick = this.handleClick
        
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

            children.push(<Square background={background} row={i} column={j}
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

  function Square(props) {    
    let id = generateID(props.row, props.column);
    return (
          <button id={id} className="square" row={props.row} column={props.column} value={props.value} onClick={props.handleClick} style={{background:props.background}}></button>
        )
    }

    function generateID(row, column){
        let id = 'row:'+row.toString() + 'col:'+ column.toString();
        return id;
    }
export default Board;