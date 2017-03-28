import {shallow} from 'enzyme';
import React from 'react';

import BankingView from './BankingView';
import ActionList from '../containers/ActionList';
import TransactionHistory from '../containers/TransactionHistory';

describe('BankingView', () => {
  let bankingView;

  beforeEach(() => {
  	bankingView = shallow(<BankingView />);
  });

  it('renders a ActionList', () => {
    expect(bankingView.containsMatchingElement(<ActionList/>)).toEqual(true);
  });

  it('renders a TransactionHistory', () => {
    expect(bankingView.containsMatchingElement(<TransactionHistory/>)).toEqual(true);
  });
});

