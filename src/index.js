import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PlayBoard from './containers/playBoard';
import * as serviceWorker from './serviceWorker';
import createStore from './createStore';

let store = createStore();

document.body.style.backgroundImage = "url('https://picsum.photos/500/500?bust=0000')";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.boxShadow = "inset 0 0 0 2000px rgba(93,93,93,0.84)";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

ReactDOM.render(<PlayBoard store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
