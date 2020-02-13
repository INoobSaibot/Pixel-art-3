import { EventEmitter } from '../EventEmitter/events';

class PersistanceService {

  save = (props, saveOrSaveAs) => {
        let localStorage = window.localStorage;
        let key = props.props.gameState.currentlySelectedArt;
        let model = props.state;
        let saveAs = saveOrSaveAs ==="saveAs";

        let value = JSON.stringify(model);

        localStorage.setItem(key,value);
        if ((props.props.currentlyOpenArt && !saveAs)) {
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
        const prefix = 'untitled-';
        for (let i = 1; i < 100; i++) {
            let attemptingName = prefix+i;
            if (!this.isThereOnNamed(attemptingName)){
                return attemptingName;
            }
        }
        return 'untitled-n'
    }

    isThereOnNamed(name) {
        let artWithName = window.localStorage.getItem(name);
        if(artWithName) {
            return true;
        } else {
            return false;
        }
    }

    openArt = (key) => {
        let localStorage = window.localStorage;
        let arrFromLocalStorage = localStorage.getItem(key);

        let pixelDataModel = JSON.parse(arrFromLocalStorage);

        return pixelDataModel;
    }

}


export default PersistanceService;