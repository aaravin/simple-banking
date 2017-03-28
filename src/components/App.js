import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import BankingView from './BankingView';
import combinedReducer from '../reducers/combinedReducer';

class App extends Component {
  render() {
    const store = createStore(combinedReducer);

    return (
      <Provider store={store}>
        <BankingView />
      </Provider>
    );
  }
}

export default App;
