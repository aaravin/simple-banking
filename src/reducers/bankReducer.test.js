import bankReducer from './bankReducer';
import defaults from './defaults/bankDefaults';
import * as bankActions from '../actions/bankActions';

describe('bankReducer', () => {
  describe('on PERFORM_TRANSACTION', () => {
    it('adds transaction and updates totalBalance', () => {
    	const amount = 1000;
      const transaction = {
      	description: Symbol('description'),
      	amount: amount,
      	date: Symbol('date')
      };
      const expectedState = {
      	transactions: [transaction],
      	totalBalance: amount
      }

      expect(bankReducer(defaults, {
      	type: bankActions.PERFORM_TRANSACTION,
      	transaction: transaction
      })).toEqual(expectedState);
    });
  });
});