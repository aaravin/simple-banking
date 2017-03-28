import {shallow} from 'enzyme';
import React from 'react';

import {ActionList} from './ActionList';
import { Segment, Button, Input, Modal, Label, Form } from 'semantic-ui-react';

//Would normally test this a bit differently, but attempting to mount Semantic UI components throws a strange error
//from within the Modal component. Instead, just tested methods of the ActionList class and assumed the correct props
//were passed into the Semanti UI components.
describe('ActionList', () => {
  let actionList,
      performTransaction;

  beforeEach(() => {
    performTransaction = jest.fn();
  	actionList = shallow(<ActionList performTransaction={performTransaction} />);
  });

  describe('openModal', () => {
    it('sets showModal and action of state', () => {
      const event = {target: {textContent: 'test'}};
      actionList.instance().openModal(event);
      expect(actionList.instance().state.showModal).toEqual(true);
      expect(actionList.instance().state.action).toEqual(event.target.textContent);
    });
  });

  describe('closeModal', () => {
    it('sets showModal, inputAmount, inputDescription, and error of state', () => {
      actionList.setState({
        showModal: true,
        inputAmount: '100',
        inputDescription: 'test',
        error: true
      });
      actionList.instance().closeModal();
      expect(actionList.instance().state.showModal).toEqual(false);
      expect(actionList.instance().state.inputAmount).toEqual('');
      expect(actionList.instance().state.inputDescription).toEqual('');
      expect(actionList.instance().state.error).toEqual(false);
    });
  });

  describe('handleSubmit', () => {
    describe('with invalid dollar amounts', () => {
      it('sets error to true if inputAmount is not numeric', () => {
        actionList.setState({
          inputAmount: 'abc',
          error: false
        });
        actionList.instance().handleSubmit();
        expect(actionList.instance().state.error).toEqual(true);
      });

      it('sets error to true if inputAmount does not have 0 or 2 decimal places', () => {
        actionList.setState({
          inputAmount: '123.456',
          error: false
        });
        actionList.instance().handleSubmit();
        expect(actionList.instance().state.error).toEqual(true);
      });
    });

    describe('with valid dollar amounts', () => {
      beforeEach(() => {
        actionList.setState({
          showModal: true,
          inputAmount: '100.22',
          inputDescription: 'test',
          error: false,
          action: 'Withdraw'
        });
      });

      describe('withdraw transaction', () => {
        it('calls performTransaction with inputDescription, NEGATIVE amount value, and date', () => {
          actionList.setState({
            action: 'Withdraw'
          });

          actionList.instance().handleSubmit();
          const date = new Date();
          expect(performTransaction).toHaveBeenCalledWith({
            description: 'test',
            amount: -100.22,
            date: date.toLocaleDateString('en-US')
          });
        });
      });

      describe('deposit transaction', () => {
        it('calls performTransaction with inputDescription, POSITIVE amount value, and date', () => {
          actionList.setState({
            action: 'Deposit'
          });

          actionList.instance().handleSubmit();
          const date = new Date();
          expect(performTransaction).toHaveBeenCalledWith({
            description: 'test',
            amount: 100.22,
            date: date.toLocaleDateString('en-US')
          });
        });
      });

      it('closes modal', () => {
        actionList.instance().handleSubmit();
        expect(actionList.instance().state.showModal).toEqual(false);
        expect(actionList.instance().state.inputAmount).toEqual('');
        expect(actionList.instance().state.inputDescription).toEqual('');
        expect(actionList.instance().state.error).toEqual(false);
      });
    });
  });

  describe('error message', () => {
    it('is hidden when error in state is false', () => {
      actionList.setState({error: false});
      expect(actionList.containsMatchingElement(<Label basic color='red' pointing>Please enter a valid dollar amount</Label>)).toBe(false);
    });

    it('is shown when error in state is true', () => {
      actionList.setState({error: true});
      expect(actionList.containsMatchingElement(<Label basic color='red' pointing>Please enter a valid dollar amount</Label>)).toBe(true);
    });
  });
});

