// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// test file
import { shallow, mount, render } from 'enzyme';

import React from 'react';
import Board from '../Board';
import Square from '../Board'

// before?
configure({ adapter: new Adapter() });


describe('<Board />', () => {
    it('renders a pixel board', () => {
        const board = shallow(<Board />);

        const selector = 'button';
        const actual = board.find({row:0, column:0});

        // expect(actual.html()).toEqual('');
        //expect(actual.find(selector).length).toBe(1);
    });

});
