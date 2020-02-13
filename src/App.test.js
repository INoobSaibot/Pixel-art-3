import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // needed to stop errors for jest;s unimplmented canvas methods
  // may want to move to base test
  window.HTMLCanvasElement.prototype.getContext = () => {}
  window.HTMLCanvasElement.prototype.toDataURL = () => {}

  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
