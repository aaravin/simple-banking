import _ from 'lodash';

import bankDefaults from './defaults/bankDefaults';
import { PERFORM_TRANSACTION } from '../actions/bankActions';

export default function(state = bankDefaults, action) {
	let newState = _.cloneDeep(state);

	switch(action.type) {
		case PERFORM_TRANSACTION:
			newState.transactions.push(action.transaction);
			newState.totalBalance += action.transaction.amount;
			return newState;
		default:
			return state;
	}
}