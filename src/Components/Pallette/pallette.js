import React, { Component } from 'react';
import './pallete.css'


class Pallette extends Component {
    constructor(props) {
      super(props);
      
      this.state = {}
    }
    
    render() {
        let colors = this.props.colors;
        let props = this.props;
        const pallette = colors.map((item) => {
            return (<span className='' key={item}>
                      <button className="square pallette-choice" row={props.row} column={props.column} value={item} onClick={props.handleClick} style={{background:item}}></button>
                    </span>)
                    })
        return <div>{pallette}</div>
    }
}



export default Pallette;