import React, {Component} from 'react';
import {EventEmitter} from '../../../EventEmitter/events';
import './menu.css';
import PersistanceService from "../../../Persistance/persistance.service";


class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileMenuOpen: true,
            showFiles: false,
            showDeleteList: false,
            fileList: [{title:'for', record_id:395}, {title:'me', record_id:396}]
        }
        this.options = ['new', 'open', 'save', 'save as', 'delete'];
        this.node = undefined;
        this.artService = new PersistanceService()
    }

    render() {
        const options = <this.renderMenu options={this.options} handleClick={this.handleClick}/>;
        const fileList = <this.renderFileNamesMenu options={this.state.fileList} handleClick={this.handleClick}
                                          classList={'file'}/>;
        const deleteFiles = <this.renderMenu options={this.state.fileList} handleClick={this.handleClick}
                                             classList={'deleteFile'}/>;
        const back = <span id='menu-back' className="back" onClick={this.clickBack}>&lt;<span
            className="backText">-back</span></span>

        return (
            <div ref={node => this.node = node} className="menu w3-dropdown-content w3-bar-block w3-border">
                {this.state.fileMenuOpen && options}
                {(this.state.showFiles || this.state.showDeleteList) && back}
                {this.state.showFiles && fileList}
                {this.state.showDeleteList && deleteFiles}
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick, false);
        this.getFileList();
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }

    handleOutsideClick = (e) => {
        if (this.node.contains(e.target)) {
            // the click is inside, chill
            return;
        }
        // the click is outside, do something
        this.handleClickOutside();
    }

    handleClickOutside() {
        this.props.outsideClick();
    }

    handleClick = (e) => {
        //todo
        let element = e.target;
        let selectedOption = element.getAttribute('name');

        if (selectedOption === 'new') {
            this.newClicked(e);
        } else if (selectedOption === 'open') {
            this.handleOpenClick(e);
        } else if (selectedOption === 'save') {
            this.props.handleSave("save");
        } else if (selectedOption === "save as") {
            this.props.handleSave('saveAs');
        } else if (selectedOption === 'delete') {
            this.showDeleteList();
        } else if (element.classList.contains('file')) {
            this.handleOpenFile(element.id);
        } else if (element.classList.contains('deleteFile')) {
            this.handleDeleteFile(selectedOption);
            // same as this.setState({state:this.state})
            // proper way was failing for some reason, messing up
            // delete menu, and crashing or not rerendering (deleted items visible till rerender)
            this.forceUpdate();
        }
    }

    newClicked = (e) => {
        EventEmitter.dispatch('newArtClicked', e);
        this.handleClickOutside();
    }

    clickBack = (e) => {
        this.setState({showFiles: false, showDeleteList: false, fileMenuOpen: true});
    }

    renderMenu = (props) => {
        let i = 0;
        const menu = props.options.map((entry) => {
            return <this.menuOption record_id={entry.record_id} item={entry} key={i++} classList={props.classList}></this.menuOption>;
        })
        return menu;
    }

    renderFileNamesMenu = (props) => {
        // todo use something else as keys perhaps in the case of the files names...
        let i = 0;
        const menu = props.options.map((entry) => {
            return <this.menuOption record_id={entry.id} item={entry.title} key={i++} classList={props.classList}></this.menuOption>;
        })
        return menu;
    }

    getFileList() {
        this.artService.getArtList().then((arts) => {
            this.setState({fileList: arts})
        })
    }

    handleOpenFile(key, title) {
        this.props.selectArtKey(key, title);
    }

    handleDeleteFile(key) {
        window.localStorage.removeItem(key);
    }

    handleOpenClick(e) {
        this.setState({showFiles: true, fileMenuOpen: false});
    }

    showDeleteList() {
        this.setState({showDeleteList: true, fileList: false, fileMenuOpen: false})
    }

    handleSaveClick() {
        this.handleSaveFile();
    }

    menuOption = (props) => {
        let deleteFiles = '';
        if (props.classList === 'deleteFile') {
            deleteFiles = <span className="delete" onClick={this.handleClick}>&times;</span>
        }
        let item = props.item;
        let defaultClasses = 'menuItem w3-bar-item w3-button'
        let classList = props.classList ? defaultClasses + ' ' + props.classList : defaultClasses;

        return <div id={props.record_id} className={classList} key={item} name={item}
                    onClick={this.handleClick}>{item}{deleteFiles}</div>;
    }
}


export default Menu;