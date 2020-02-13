import '../undo.service';
import UndoService from '../undo.service';



describe('undo service', () => {
    it('works backwards in basic cases', () => {
        const undoService = new UndoService();

        undoService.store('state-1');
        undoService.store('state-2');
        undoService.store('state-3');

        expect(undoService.backward()).toEqual('state-2');
        expect(undoService.backward()).toEqual('state-1');
    });

    it('works forwards in basic cases', () => {
        const undoService = new UndoService();

        undoService.store('state-1');
        undoService.store('state-2');
        undoService.store('state-3');

        expect(undoService.backward()).toEqual('state-2');
        expect(undoService.backward()).toEqual('state-1');
        expect(undoService.backward()).toEqual(undefined);

        expect(undoService.forward()).toEqual('state-2');

    });

    it('stays within range, returns undefined when excess range attempted', () => {
        const undoService = new UndoService();

        undoService.store('state-1');
        undoService.store('state-2');
        undoService.store('state-3');

        expect(undoService.backward()).toEqual('state-2');
        expect(undoService.backward()).toEqual('state-1');
        expect(undoService.backward()).toEqual(undefined);

        expect(undoService.forward()).toEqual('state-2');
        expect(undoService.forward()).toEqual('state-3');

        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);

        expect(undoService.backward()).toEqual('state-2')
    });

    it('forwards index to front when storing new states', () => {
        const undoService = new UndoService();

        undoService.store('state-1');
        undoService.store('state-2');
        undoService.store('state-3');

        expect(undoService.backward()).toEqual('state-2');
        expect(undoService.backward()).toEqual('state-1');
        expect(undoService.backward()).toEqual(undefined);

        expect(undoService.forward()).toEqual('state-2');
        expect(undoService.forward()).toEqual('state-3');
        
        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);
        expect(undoService.forward()).toEqual(undefined);

        expect(undoService.backward()).toEqual('state-2');

        undoService.store('state-4');

        expect(undoService.backward()).toEqual('state-3');
        expect(undoService.backward()).toEqual('state-2');
        expect(undoService.backward()).toEqual('state-1');

        expect(undoService.backward()).toEqual(undefined);
        expect(undoService.backward()).toEqual(undefined);
        expect(undoService.backward()).toEqual(undefined);
        expect(undoService.backward()).toEqual(undefined);

        expect(undoService.forward()).toEqual('state-2');
    });



});