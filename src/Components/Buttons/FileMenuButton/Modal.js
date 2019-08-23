import React, { Component } from 'react';
import './fileMenuButton.css';



class Modal extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        foo:true,
      }
    }

    render() {
        let files = this.props.files;
        return (
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                <p>Some text in the Modal..</p> 
                </div>
            </div>
        )
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
    



export default Modal;