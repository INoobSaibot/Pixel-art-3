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
    console.log('column ' + this.props.column + ' row ' + this.props.row 
      + " " + color)

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
  
  renderSquare(i) {
    return <Square value={i} />;
  }

  renderRow(i) {
    const Row = columns.map((column) =>
      <Square key={column.toString()} column={column} row={i}/>
      );
    
    return Row;
  }

  render() {
    var out = '';
    const status = 'Click a pixel to cycle through the colors' + out;
    //const columns = this.props.columns;
    //const rows = this.props.rows;

    return (
      <div>
        <div className= 'status'>{status}</div>
        <div className='board-row'>
          {this.renderRow('a')}
        </div>

        <div className='board-row'>
          {this.renderRow('b')}
        </div>

        <div className='board-row'>
          {this.renderRow('c')}
        </div>

        <div className='board-row'>
          {this.renderRow('d')}
        </div>

        <div className='board-row'>
          {this.renderRow('e')}
        </div>

        <div className='board-row'>
          {this.renderRow('f')}
        </div>

        <div className='board-row'>
          {this.renderRow('g')}
        </div>

        <div className='board-row'>
          {this.renderRow('h')}
        </div>

        <div className='board-row'>
          {this.renderRow('i')}
        </div>

        <div className='board-row'>
          {this.renderRow('j')}
        </div>

        <div className='board-row'>
          {this.renderRow('k')}
        </div>

        <div className='board-row'>
          {this.renderRow('l')}
        </div>

        <div className='board-row'>
          {this.renderRow('m')}
        </div>

        <div className='board-row'>
          {this.renderRow('n')}
        </div>

        <div className='board-row'>
          {this.renderRow('o')}
        </div>

        <div className='board-row'>
          {this.renderRow('p')}
        </div>

        <div className='board-row'>
          {this.renderRow('q')}
        </div>

        <div className='board-row'>
          {this.renderRow('r')}
        </div>

        <div className='board-row'>
          {this.renderRow('s')}
        </div>

        <div className='board-row'>
          {this.renderRow('t')}
        </div>

        <div className='board-row'>
          {this.renderRow('u')}
        </div>
        
        <div className='board-row'>
          {this.renderRow('v')}
        </div>

        <div className='board-row'>
          {this.renderRow('w')}
        </div>

        <div className='board-row'>
          {this.renderRow('x')}
        </div>

        <div className='board-row'>
          {this.renderRow('y')}
        </div>

        <div className='board-row'>
          {this.renderRow('z')}
        </div>

        <div className='board-row'>
          {this.renderRow('aa')}
        </div>

        <div className='board-row'>
          {this.renderRow('bb')}
        </div>

        <div className='board-row'>
          {this.renderRow('cc')}
        </div>

        <div className='board-row'>
          {this.renderRow('dd')}
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