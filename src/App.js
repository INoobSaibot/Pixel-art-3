import React from 'react';
import './App.css';

const App = () => {
  return(<div>
            <div className="App">Hello Pixel Artist!</div>
            <Game />
          </div>
  );
};

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      background: 'white',
    };
    this.colors = [
      'black',
      'orange',
      'red',
      'green',
      'blue',
      'brown',
      'lime',
      'yellow',
      'white',
    ];
  }

  changeColor = () =>{
    this.setState({value: this.state.value +1})

    if (this.state.value >= this.colors.length-1){
      this.setState({value: 0})
    }

    let choice = this.state.value
    let color = this.colors[choice]

    this.setState({background: color})
    //alert(this.props.value)
    console.log('column ' + this.props.column + 'row ' + this.props.row)

  }

  render() {
    return (
      <button className="square" style={{background: this.state.background}}
      onClick={() => this.changeColor()
       }>
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    var out = '';
    const status = 'Click a pixel to cycle through the colors' + out;
    const columns = this.props.columns;
    const rows = this.props.rows;

    const Row = columns.map((column) => 
    <Square key={column.toString()} column={column.toString()} />
    );

    for(var r in rows) {
      //console.log(rows[row]);

      for(var c in columns) {
        console.log(rows[r]+columns[c]);
      }
    }

    return (
      <div>
        <div className= 'status'>{status}</div>
        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>
        
        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

        <div className='board-row'>
          {Row}
        </div>

      </div>
    );
  }
}

const columns = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const rows = ['a', 'b', 'c','d','e','f','g','h','i','j','k','l','m','n'];

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board columns={columns} rows={rows} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default App;