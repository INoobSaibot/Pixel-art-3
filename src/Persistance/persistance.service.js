import {EventEmitter} from '../EventEmitter/events';
import HttpService from "../HTTPService/HTTPService";

class PersistanceService {
    http = HttpService.service_singleton

    save = async (props, saveOrSaveAs) => {
        let title = props.props.gameState.currentlySelectedArt;
        let model = props.state.pixelData
        let saveAs = saveOrSaveAs === "saveAs";

        let value = JSON.stringify(model);
        const record_id = props.state.record_id;

        if ((record_id && !saveAs)) {
            const model = JSON.stringify({title: title, content: value})
            this.http.put(record_id, model)
            // saVED!!
        } else {
            // new
            let msg = "Please name your art:";
            let untitled = this.generateNewFileName();
            let defaultName = props.props.currentlyOpenArt ? props.props.currentlyOpenArt : untitled;

            let artName = prompt(msg, defaultName);

            if (artName === null || artName === "") {
                // user cancelled prompt
            } else {
                title = artName;
                let promise = this.http.post(title, value)
                let result = await promise; // wait until the promise resolves (*)
                EventEmitter.dispatch('art-switched', title);

                return result; // "done!"
            }
        }

    }

    generateNewFileName() {
        const prefix = 'untitled-';
        for (let i = 1; i < 100; i++) {
            let attemptingName = prefix + i;
            if (!this.isThereOnNamed(attemptingName)) {
                return attemptingName;
            }
        }
        return 'untitled-n'
    }

    isThereOnNamed(name) {
        let artWithName = window.localStorage.getItem(name);
        if (artWithName) {
            return true;
        } else {
            return false;
        }
    }

    openArt = async (n) => {
        let promise = this.http.get(n)
        let data = await promise;

        console.log(data)
        return {id: data[0].id, title: data[0].title, content: JSON.parse(data[0].content)}
    }

    async getArtList() {
        const titles = []
        let arts = this.http.get()

        let records = await arts;
        console.log(records)
        records.forEach(record => {
            titles.push({title: record.title, record_id: record.id})
        })

        return await records
        }

        forEachKey(arr)
        {
            let localStorage = window.localStorage;
            for (var i = 0; i < localStorage.length; i++) {
                arr.push(localStorage.key(i));
            }

        }

    }


    export
    default
    PersistanceService;