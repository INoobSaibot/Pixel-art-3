import { EventEmitter } from '../EventEmitter/events'

class PersistanceService {
  // constructor() {}

  save = (props, saveOrSaveAs) => {
        let localStorage = window.localStorage;
        let key = props.props.gameState.currentlySelectedArt;
        let model = props.state;
        let saveAs = saveOrSaveAs ==="saveAs";

        let value = JSON.stringify(model);

        localStorage.setItem(key,value);
        if ((props.props.currentlyOpenArt && !saveAs)) {
            debugger;
            localStorage.setItem(key,value);
            // saVED!!
        } else {
            let msg = "Please name your art:";
            let untitled = this.generateNewFileName();
            let defaultName = props.props.currentlyOpenArt? props.props.currentlyOpenArt : untitled;

            let artName = prompt(msg,defaultName);

            if (artName === null || artName === "") {
                // user cancelled prompt
            } else {
                key = artName;
                localStorage.setItem(key,value);
                
                EventEmitter.dispatch('art-switched', key);
            }

        }
    }

    generateNewFileName() {
        // todo
        // check in loop untitle-Number i loop, until first one in in set/ is available
        // faked for now
        return 'untitled-n'
    }

    openArt = (key) => {
        let localStorage = window.localStorage;
        let arrFromLocalStorage = localStorage.getItem(key);

        let pixelDataModel = JSON.parse(arrFromLocalStorage);
        
        return pixelDataModel;
    }

}


export default PersistanceService;