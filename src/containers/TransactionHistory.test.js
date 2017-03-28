import {shallow} from 'enzyme';
import React from 'react';

import {TransactionHistory} from './TransactionHistory';

describe('TransactionHistory', () => {
  let transactionHistory,
      transactions,
      totalBalance;

  beforeEach(() => {
    const date = new Date();
    transactions = [
      {
        description: 'test description 1',
        amount: 100,
        date: date.toLocaleDateString('en-US')
      },
      {
        description: 'test description 2',
        amount: -155.43,
        date: date.toLocaleDateString('en-US')
      }
    ];
    totalBalance = -55.43;
  	transactionHistory = shallow(<TransactionHistory transactions={transactions}
                                                     totalBalance={totalBalance}/>);
  });

  it('renders list of transactions from transactions prop', () => {
    const transactionElements = transactionHistory.find('.transaction');
    expect(transactionElements.length).toEqual(2);

    expect(transactionElements.first().text()).toContain('test description 1');
    expect(transactionElements.first().text()).toContain('$100.00');
    expect(transactionElements.first().text()).toContain(transactions[0].date);
    
    expect(transactionElements.last().text()).toContain('test description 2');
    expect(transactionElements.last().text()).toContain('-$155.43');
    expect(transactionElements.last().text()).toContain(transactions[1].date);
  });

  it('renders totalBalance from totalBalance prop', () => {
    const transactionElements = transactionHistory.find('.transaction-row');
    
    expect(transactionElements.last().text()).toContain('-$55.43');
  });
});

