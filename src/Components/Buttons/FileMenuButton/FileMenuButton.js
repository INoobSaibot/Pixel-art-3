import React, { Component } from 'react';
import './fileMenuButton.css';
import Menu from './Menu';


class FileMenuButton extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        showMenu:true
      }
    }
    
    render() {
        let style= {height:'100%'};
        let iconStyle = {fontSize:'35px', width:'38px'};
        const menuOptions = <Menu handleClick={this.handleClick}
         selectArtKey={this.props.selectArtKey} handleSave={this.props.handleSave} new={this.props.new}/>;

        return (
          <span className="">
            <button className='btn btn-default row toolButton' style={style} onClick={this.handleClick}>
              <i className="fa fa-save" style={iconStyle}></i>
            </button>
              {this.state.showMenu && menuOptions}
          </span>
        )
    }

    handleClick = (e) => {
        this.setState({showMenu: !this.state.showMenu})
    }
}


export default FileMenuButton;