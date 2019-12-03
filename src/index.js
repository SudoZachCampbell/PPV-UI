import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.scss';
import App from './App';

import {
  setRentTypes,
  setMinPrice
} from './actions/index';

import appState from './reducers';

const store = createStore(appState);

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
store.dispatch(setRentTypes(['toLet']))
store.dispatch(setRentTypes(['toLet', 'letAgreed']))
store.dispatch(setRentTypes(['let']))
store.dispatch(setMinPrice(20))
store.dispatch(setMinPrice(30.5))

// Stop listening to state updates
unsubscribe()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
