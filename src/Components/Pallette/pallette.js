import React, { Component } from 'react';
import Square from '../../Components/Square/square'


class Pallette extends Component {
    constructor(props) {
      super(props);
      
      this.state = {}
    }
    
    render() {
        const pallette = this.props.colors.map((item) => {
            return (<span className='' key={item}>
                      <Square className='pallette' value={item} background={item} handleClick={this.props.handleClick}>{item}</Square>
                    </span>)
                    })
        return <div>{pallette}</div>
    }
}



export default Pallette;