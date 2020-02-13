import React from 'react';
import ReactDOM from 'react-dom';
import Square from '../../../Components/Board/Board';
import 'jasmine';
import '@testing-library/jest-dom/extend-expect'
import PixelPositionIDService from '../pixelPositionIdService';
import { Position } from '../../../Components/CommonInterfaces/commonInterfaces';


describe('pixel id position service', () => {
    it('works ', () => {
        const pixelService = new PixelPositionIDService();
        const id :string = 'row_0__col_0';

        const htmlElement :HTMLElement = {
            getAttribute: function(value) {
                return id;
            }
        }

        const positionObject: Position = {row:0, column:0};

        pixelService.getPosition(htmlElement);

        expect(pixelService.getPosition(htmlElement).row).toEqual(0);
        expect(pixelService.getPosition(htmlElement).column).toEqual(0);

        // same value different obj;
        const cachedPositionObject = pixelService.getPosition(htmlElement);
        expect(cachedPositionObject).toEqual(positionObject);
        expect(pixelService.getPosition(htmlElement)).not.toBe(positionObject);

        // same cached object
        expect(pixelService.getPosition(htmlElement)).toBe(cachedPositionObject);
    });
});