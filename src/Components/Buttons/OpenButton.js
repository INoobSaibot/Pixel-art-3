// import React, { Component } from 'react';
// import './openButton.css';
//
//
// class OpenButton extends Component {
//     constructor(props) {
//       super(props);
//
//       this.state = {
//           foo:false,
//       }
//     }
//
//     render() {
//         console.log('render')
//         let style= {height:'50px'};
//         let iconStyle = {fontSize:'44px'};
//         const artList = <this.RenderArtList handleClick={this.handleClick}/>;
//
//         return (
//           <div className="w3-dropdown-hover">
//             <button className='btn row toolButton' style={style} onClick={this.handleClick}>
//               <i className="fa fa-save" style={iconStyle}></i>Open
//             </button>
//             <div className="w3-dropdown-content w3-bar-block w3-border">
//               {artList}
//             </div>
//           </div>
//         )
//     }
//
//     handleClick = (e) => {
//         //todo
//         let selectedArtKey = e.target.getAttribute('value');
//         this.props.selectArtKey(selectedArtKey);
//     }
//
//     getArtList() {
//         this.persistance.getArtList();
//         console.log(this.persistance + '<<<<<<<<<<<<<<')
//     }
//
//
//     RenderArtList = (props) => {
//         const arts = this.getArtList();
//
//         const entries = arts.map( (entry) => {
//           return <this.ArtListItem item={entry} key={entry}/>;
//
//         })
//         return entries
//     }
//
//     ArtListItem = (props)=>  {
//         let item = props.item;
//         return <div className="w3-bar-item w3-button" key={item} value={item} onClick={this.handleClick}>Art {item}</div>;
//     }
// }
//
//
// export default OpenButton;