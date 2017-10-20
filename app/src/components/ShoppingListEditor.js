import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';

import { startRemoveShoppingList, startEditShoppingList } from '../actions/dataActions';
import { checkWhen } from '../helper-functions/checkWhen';

import ShoppingListForm from './ShoppingListForm';

class ShoppingListEditor extends Component {
  constructor(props){
    super(props);
    this.editShoppingList = this.editShoppingList.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
  }

  handleRemoving(){
    localStorage.removeItem(`shoppingList${this.props.shoppingList.shoppingListId}`);
    this.props.startRemoveShoppingList(this.props.shoppingList.shoppingListId);
    this.props.history.push('/app');
  }
  editShoppingList(shoppingList){
    this.props.startEditShoppingList(shoppingList, this.props.shoppingList.shoppingListId);
    this.props.history.push('/app');
  }

  render(){
    const { shoppingListMoney, deadline, shoppingListTitle } = this.props.shoppingList;
    const when = checkWhen(null, false, moment(deadline));
    return(
      <div>
        <div className="list list--sm list--center list--margin-top list--small-padding-bot">
          <div className="list__item">
            <h4 className="list__item--title list__item--title-details">
              <em>{this.props.shoppingList.shoppingListTitle}</em>
            </h4>
            <div className="list__item--descr">
              <p className="list__item--black">Cash:
                <span className="list__item--cash">
                  &nbsp;{numeral(shoppingListMoney).format('0,00.00')}
                </span>
                <span className="unit-list"> pln</span>
              </p>
              <p className="list__item--black">
                {deadline}
                <br/>
                <span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
              </p>
            </div>
            <button className="btn btn--red-const btn--top-right-detail-v"
              onClick={this.handleRemoving}>
              Delete
            </button>
          </div>
        </div>
        <div className="wrapper-form wrapper-form--item-size wrapper-form--padd-bot-sm wrapper-form--move-up">
          <div className="wrapper-helper">
            <ShoppingListForm shoppingList={this.props.shoppingList} addShoppingList={this.editShoppingList}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const shoppingList = state.usersData.shoppingLists.find(shoppingList => shoppingList.shoppingListId === props.match.params.id);
  return {
    shoppingList
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    startRemoveShoppingList: shoppingListId=>dispatch(startRemoveShoppingList(shoppingListId)),
    startEditShoppingList: (shoppingList, shoppingListId)=>dispatch(startEditShoppingList(shoppingList, shoppingListId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListEditor);
