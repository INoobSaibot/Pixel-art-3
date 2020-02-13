import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import UndoService from '../../../UndoService/undo.service';
import Board from '../Board';



afterEach(cleanup)

beforeAll( () => {
    // needed to stop errors for jest;s unimplemented canvas methods
    // may want to move to base test
    window.HTMLCanvasElement.prototype.getContext = () => {return{clearRect: () =>{}, fillRect: () =>{}}}
    window.HTMLCanvasElement.prototype.toDataURL = () => {}
});

describe('old board tests that fail due to canvas usage', () => {

    it('renders with out crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Board></Board>, div);
    });

    it('constructs obj with out crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Board ></Board>, div);

        expect(UndoService.count).toEqual(1);
        const board = new Board();
        // expect(board.state).toEqual({'pixelData':[]});

        // test props, which were not passed into constructor
        expect(board.props).toEqual(undefined);

        // test UndoService
        expect(UndoService.count).toEqual(1);

        // test store and retrieve
        board.undoService.store({pixels:'first'});
        board.undoService.store({pixels:'second'});
        board.undoService.store({pixels:'third'});

        expect(board.undoService.backward()).toEqual({pixels:'second'});
        expect(board.undoService.backward()).toEqual({pixels:'first'});
        expect(board.undoService.backward()).toBe(undefined);
    });

    it('renders back button correctly', () => {
        const { getByTestId } = render(<Board />);

        const undoButton = getByTestId('undo');
        expect(undoButton).toHaveTextContent('undo');

        undoButton.click();
    });

    it('renders back button, and back button sets state', () => {
        let mockProps = {
            playPaintFillSound: function() {
                return '';
            },
            color:'mock-color'
        }

        const { getByTestId } = render(<Board color={mockProps.color} playPaintFillSound={mockProps.playPaintFillSound} />);

        const undoButton = getByTestId('undo');
        expect(undoButton).toHaveTextContent('undo');

        const pixel00 = getByTestId('row_0__col_0');
        pixel00.click();
        // expect(pixel00.getAttributeNames()).toEqual()
        expect(pixel00.getAttribute('style')).toEqual("width: 0px; height: 0px;");


        undoButton.click();
    });

    function MyComponent() {
        return (
            <div>
                <SubComponent foo="bar" />
                <p className="my">Hello</p>
            </div>
        )
    }

    function SubComponent() {
        return (
            <p className="sub">Sub</p>
        );
    }

    it('whut', () => {
        const testRenderer = TestRenderer.create(<MyComponent />);
        const testInstance = testRenderer.root;

        expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
        expect(testInstance.findByProps({className: 'sub'}).children).toEqual(['Sub']);
    });

    it('un does changes to the art when undo is run', () => {
        const board = new Board();
        expect(board.state).toEqual({"pixelData": [], "windowWidth": 0});

        expect(board.props).toEqual(undefined);

        // test store and retrieve
        board.undoService.store({pixels:'first'});
        board.undoService.store({pixels:'second'});
        board.undoService.store({pixels:'third'});

        expect(board.undoService.backward()).toEqual({pixels:'second'});
        expect(board.undoService.backward()).toEqual({pixels:'first'});
        expect(board.undoService.backward()).toBe(undefined);
    });
});
