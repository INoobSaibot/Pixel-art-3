import React, { Component } from 'react';

class Board extends Component {
    constructor(props) {
      super(props);
      this.state = {
          pixelData :[

          ],
      }
    }

    componentDidMount() {
        let gridData = this.loopyRenderRow(30,30).state;
        
        this.setState({pixelData:gridData});
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
        let clickedPixel = e.target;
        let row = parseInt(clickedPixel.getAttribute('row'));
        let column = parseInt(clickedPixel.getAttribute('column'));
        let position = {row:row,column:column};

        let eraserSelected = this.props.eraser;

      if (this.props.fillButton) {
        this.paintFill(position);
      }
      
      else {
        let color = !eraserSelected ? this.props.color : '';

        //let targetState = e.target.value;
        //this.setState({[targetState]:color});

        let pixelData = this.state.pixelData;
        pixelData[row][column] = color;
        this.setState({pixelData:pixelData});
      }
    }

    paintFill = (position) => {
      alert(this.getNeighbors(position.row,position.column));

    }

    getNeighbors = (r,c) => {
        const colBack = c-1;
        const colOver = c+1;
        const rowDown = r+1;
        const rowUp = r-1;
        const arr= [
            this.state.pixelData[rowUp][c] +'\n'
            ,this.state.pixelData[rowDown][c] + '-> ' + rowDown + '\n' 
            ,this.state.pixelData[r][colOver] + '-> ' + colOver +'\n' 
            ,this.state.pixelData[r][colBack] +'\n'
        ]

        return arr;
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
            let target = 'row_'+i+":"+"column_"+j;
            let value = target;
            let background;// = this.state[target];
            
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

    post() {
        const URL = 'http://localhost:8000/pixels';
        
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
  }

  function Square(props) {    
    return (
          <button className="square" row={props.row} column={props.column} value={props.value} onClick={props.handleClick} style={{background:props.background}}></button>
        )
    }
export default Board;