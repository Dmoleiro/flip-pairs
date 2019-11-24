import React from 'react';
import ReactDOM from 'react-dom';
import PlayBoard from './playBoard';
import createStore from '../createStore';

it('renders without crashing', () => {
    const div = document.createElement('div');
    let store = createStore();
    ReactDOM.render(<PlayBoard store={store}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
