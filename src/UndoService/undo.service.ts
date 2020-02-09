


export default class UndoService {
    static count = 0
    constructor() {
        // do somehting so only 1 gets made ever
        UndoService.count = 1;
        this.snaps= [];
        this.currentIndex = 0
    }
    snaps: Array<any>;
    currentIndex: number;



    static getCount() {
        return UndoService.count;
    }

    store(state: any) {
        const deepCopied_not_refence = JSON.parse(JSON.stringify(state));
        this.snaps.push(deepCopied_not_refence);
        this.currentIndex = this.snaps.length -1;
    }

    backward() {
        if (this.currentIndex > 0) {
            this.currentIndex -=1;
            return this.snaps[this.currentIndex];
        } else {
            return undefined;
        }

    }

    forward() {
        if (this.currentIndex < this.snaps.length -1) {
            this.currentIndex++;
            return this.snaps[this.currentIndex];
        } else {
            return undefined;
        }
        
    }

}