import React from 'react';

function Square(props) {    
    return (
          <button className="square" row={props.row} column={props.column} value={props.value} onClick={props.handleClick} style={{background:props.background}}></button>
        )
    }

export default Square;