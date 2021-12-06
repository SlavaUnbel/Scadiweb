import { compose, createStore } from 'redux';

import rootReducer, { IStore } from './reducers/rootReducer';

// @ts-ignore
const enchancerArgs = window.__REDUX_DEVTOOLS_EXTENSION__ && [
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__(),
];

const store: IStore = createStore(rootReducer, compose(...enchancerArgs));

export default store;
