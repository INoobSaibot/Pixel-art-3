import React, { Component } from 'react';
import './fileMenuButton.css';
import Menu from './Menu';


class FileMenuButton extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        showMenu:true
      }
      this.options = ['open','save','save as'];
      
    }
    
    render() {
        let style= {height:'50px'};
        let iconStyle = {fontSize:'44px'};
        const menuOptions = <Menu options={this.options} handleClick={this.handleClick}
         selectArtKey={this.props.selectArtKey} handleSave={this.props.handleSave}/>;

        return (
          <div className="w3-dropdown-hover">
            <button className='btn row toolButton' style={style} onClick={this.handleClick}>
              <i className="fa fa-save" style={iconStyle}></i>menu
            </button>
              {this.state.showMenu && menuOptions}
          </div>
        )
    }

    handleClick = (e) => {
        this.setState({showMenu: !this.state.showMenu})
    }

    getArtList() {
        let arts = [];
        this.forEachKey(arts);
        return arts;
    }
    forEachKey(arr) {
        let localStorage = window.localStorage;
        for (var i = 0; i < localStorage.length; i++) {
          arr.push(localStorage.key(i));
        }
      }
    
    RenderArtList = (props) => {
        const arts = this.getArtList();
        
        const entries = arts.map( (entry) => {
          return <this.ArtListItem item={entry} key={entry}/>;
          
        })
        return entries
    }

    ArtListItem = (props)=>  {
        let item = props.item;
        return <div className="w3-bar-item w3-button" key={item} value={item} onClick={this.handleClick}>Art {item}</div>;
    }
}


export default FileMenuButton;