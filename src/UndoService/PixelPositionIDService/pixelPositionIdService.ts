import { Position } from '../../Components/CommonInterfaces/commonInterfaces';

export default class PixelPositionIDService {
    static count = 0
    private map :Map<string, Position>;

    constructor() {
        // do something so only 1 gets made ever
        PixelPositionIDService.count = 1;
        this.map = new Map<string, Position>();
    }

    static getCount() {
        return PixelPositionIDService.count;
    }

    getPosition = (pixelElement: HTMLElement): Position => {
        let id = pixelElement.getAttribute('id');

        const cached :Position = this.map.get(id);
        let position :Position;
        if(cached) {
            position = cached;
        } else {
            position = this.createPosition(id);
            this.map.set(id, position);
        }
        return position
    }


    createPosition(id :string) :Position {
        const rowAndColumn = id.split('__')
        let row: number = parseInt(rowAndColumn[0].replace('row_', ''));
        let column: number = parseInt(rowAndColumn[1].replace('col_', ''));
        let position: Position = {row:row, column:column};

        return position;
    }

}