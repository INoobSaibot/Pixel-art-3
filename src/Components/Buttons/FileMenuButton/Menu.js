import React, { Component } from 'react';
import './fileMenuButton.css';


class Menu extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        fileMenuOpen:true,
        showFiles:false,
      }
    }
    
    render() {
        const options = <this.renderMenu options={this.props.options} handleClick={this.handleClick}/>;
        const fileList = <this.renderMenu options={this.getFileList()} handleClick={this.handleClick} classList={'file'}/>;

        return (
        <div className="w3-dropdown-content w3-bar-block w3-border">
          {this.state.fileMenuOpen && options}
          {this.state.showFiles && fileList}
        </div>
        )
    }

    handleClick = (e) => {
      //todo
      let selectedOption = e.target.getAttribute('name');

      if (selectedOption === 'new') {
        this.props.new();
      }
      else if (selectedOption === 'open') {
        this.handleOpenClick(e);
      }
      else if (selectedOption === 'save') {
        this.props.handleSave("save");
      }
      if (selectedOption === "save as") {
        this.props.handleSave('saveAs');
      }

      else if (e.target.classList.contains('file')) {
        this.handleOpenFile(selectedOption);
      }
  }
    
    renderMenu = (props) => {
        const menu = props.options.map( (entry) => {
          return <this.menuOption item={entry} key={entry} classList={props.classList}/>;
        })
        return menu;
    }

    forEachKey(arr) {
      let localStorage = window.localStorage;
      for (var i = 0; i < localStorage.length; i++) {
        arr.push(localStorage.key(i));
      }
    }

    getFileList() {
      let arts = [];
      this.forEachKey(arts);
      return arts;
  }

  handleOpenFile(key) {
    this.props.selectArtKey(key);
  }

  handleSaveFile() {

  }
  
    handleOpenClick(e) {
      this.setState({showFiles:true, fileMenuOpen:false});
    }

    handleSaveClick() {
      this.handleSaveFile();
    }

    menuOption = (props)=>  {
        let item = props.item;
        let defaultClasses = 'w3-bar-item w3-button'
        let classList = props.classList ? defaultClasses + ' ' +props.classList : defaultClasses;

        return <div className={classList} key={item} name={item} onClick={this.handleClick}>{item}</div>;
    }
}


export default Menu;