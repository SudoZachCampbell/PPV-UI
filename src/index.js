import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.scss';
import App from './App';

import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
