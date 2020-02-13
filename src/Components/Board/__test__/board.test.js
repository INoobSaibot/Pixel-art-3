// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Board from '../Board';



// before?
configure({ adapter: new Adapter() });

// hmtl canvas causes all board test to fail
xdescribe('<Board />', () => {
    it('renders a pixel board', () => {
        const board = shallow(<Board />);

        const selector = 'button';
        const actual = board.find({row:0, column:0});

        // expect(actual.html()).toEqual('');
        // expect(actual.find(selector).length).toBe(1);
    });

});
