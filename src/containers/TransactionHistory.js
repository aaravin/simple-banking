import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Segment, Divider, Label } from 'semantic-ui-react';

export class TransactionHistory extends Component {
	formatAmount(amount) {
		return amount >= 0 ?
					 '$' + parseFloat(amount).toFixed(2) :
					 '-$' + parseFloat(amount * -1).toFixed(2);
	}

	renderTransactions() {
		return this.props.transactions.map((transaction) => {
			return (
				<div key={transaction.description} className='transaction'>
					<div>{transaction.description}</div>
					<div className='transaction-row'>
						<span>{transaction.date}</span>
						<span>{this.formatAmount(transaction.amount)}</span>
					</div>
					<Divider />
				</div>
			);
		});
	}

	render() {
		return (
			<Segment padded>
				<Label attached='top'>Transaction History</Label>
				{this.renderTransactions()}
				<div className='transaction-row'>
					<strong>Total Balance</strong>
					<strong>{this.formatAmount(this.props.totalBalance)}</strong>
				</div>
      </Segment>
    );
	}
}

const mapStateToProps = (state) => {
  return {
  	transactions: state.bank.transactions,
    totalBalance: state.bank.totalBalance
  }
};

export default connect(mapStateToProps, null)(TransactionHistory);