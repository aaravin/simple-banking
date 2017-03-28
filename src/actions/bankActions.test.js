import * as bankActions from './bankActions';

describe('bankActions', () => {
  describe('performTransaction', () => {
    it('returns an action object with the correct type and transaction', () => {
    	const transaction = Symbol('transaction');

      expect(bankActions.performTransaction(transaction)).toEqual({
        type: bankActions.PERFORM_TRANSACTION,
        transaction: transaction
      });
    });
  });
});