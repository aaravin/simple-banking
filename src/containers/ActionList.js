import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Segment, Button, Input, Modal, Label, Form } from 'semantic-ui-react';

import {performTransaction} from '../actions/bankActions';

const WITHDRAW = 'Withdraw';
const DEPOSIT = 'Deposit';

export class ActionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			action: '',
			inputAmount: '',
			inputDescription: '',
			error: false
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	openModal(event) {
		this.setState({
			showModal: true,
			action: event.target.textContent
		});
	}

	closeModal() {
		this.setState({
			showModal: false,
			inputAmount: '',
			inputDescription: '',
			error: false
		});
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit() {
		if (!(/^-?\d+(\.\d{2})?$/.test(this.state.inputAmount))) {
			this.setState({
				error: true
			});
		} else {
			const amount = this.state.action === WITHDRAW ?
										 parseFloat(this.state.inputAmount) * -1:
										 parseFloat(this.state.inputAmount);
			const date = new Date();
			this.props.performTransaction({
				description: this.state.inputDescription,
				amount: amount,
				date: date.toLocaleDateString('en-US')
			});
			this.closeModal();
		}
	}

	render() {
		const errorMessage = this.state.error ?
												 <Label basic color='red' pointing>Please enter a valid dollar amount</Label> :
												 null;
		return (
			<Segment padded>
				<Label attached='top'>Actions</Label>
        <Button onClick={this.openModal} color='red'>
			    {WITHDRAW}
			  </Button>
			  <Button onClick={this.openModal} color='green'>
			    {DEPOSIT}
			  </Button>

        <Modal size='small'
        			 open={this.state.showModal}>
          <Modal.Header>{`Set ${this.state.action} Amount`}</Modal.Header>
          <Modal.Content>
          	<Input fluid
            			 name='inputDescription'
            			 className='input-description'
            			 value={this.state.inputDescription}
            			 onChange={this.handleInputChange}
            			 placeholder='Enter description...'/>
            <Form.Field>
	            <Input fluid
	            			 label='$'
	            			 name='inputAmount'
	            			 value={this.state.inputAmount}
	            			 onChange={this.handleInputChange}
	            			 placeholder='Enter amount in dollars...'
	            			 error={this.state.error}/>
	          </Form.Field>
            {errorMessage}
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.closeModal}>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content={this.state.action} onClick={this.handleSubmit} />
          </Modal.Actions>
        </Modal>
      </Segment>
    );
	}
}

const mapDispatchToProps = (dispatch) => {
  const actions = {performTransaction};
  return bindActionCreators(actions, dispatch);
};

export default connect(null, mapDispatchToProps)(ActionList);
