import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import ActionList from '../containers/ActionList';
import TransactionHistory from '../containers/TransactionHistory';

export default class BankingView extends Component {
	render() {
		return (
			<div>
				<nav>
					KUSTOMER
				</nav>
				<section>
					<Grid columns={2}>
						<Grid.Column>
			        <ActionList />
			      </Grid.Column>
			      <Grid.Column>
			        <TransactionHistory />
			      </Grid.Column>
		      </Grid>
	      </section>
      </div>
    );
	}
}
