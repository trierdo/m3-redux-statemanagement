import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IWindow } from './framework/IWindow';
declare let window: IWindow;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App stateCounter={window.CS.getUIState().counter} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
