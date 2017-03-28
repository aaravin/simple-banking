export const PERFORM_TRANSACTION = 'PERFORM_TRANSACTION';

export function performTransaction(transaction) {
	return {
		type: PERFORM_TRANSACTION,
		transaction: transaction
	}
}