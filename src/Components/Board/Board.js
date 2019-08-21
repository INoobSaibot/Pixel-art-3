import React, { Component } from 'react';
import HTTPService from '../../HTTPService/HTTPService'

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
    }

    render() {
      const gridAndState = this.loopyRenderRow(30,30);
      const grid = gridAndState.grid;
  
      return (
        <div>
          <div></div>
            {grid}
        </div>
      );
    }

    handleClick = (e) =>{
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

    saveArt = () => {
        //this.http.postRequest(this.state);
        let localStorage = window.localStorage;

        let key = "";
        let model = this.state;
        let value = JSON.stringify(model);

        let msg = "Please name your art:";
        let defaultName ="defaultName";

        let artName = prompt(msg,defaultName);

        if (artName === null || artName === "") {
            //user cancelled prompt
        } else {
            key = artName;
            localStorage.setItem(key,value);
        }
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
    return (
          <button className="square" row={props.row} column={props.column} value={props.value} onClick={props.handleClick} style={{background:props.background}}></button>
        )
    }
export default Board;