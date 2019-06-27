import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}

serviceWorker.unregister();
