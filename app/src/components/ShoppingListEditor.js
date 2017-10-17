import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRemoveShoppingList, startEditShoppingList } from '../actions/dataActions';

import ShoppingListForm from './ShoppingListForm';

class ShoppingListEditor extends Component {
  constructor(props){
    super(props);
    this.editShoppingList = this.editShoppingList.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
  }

  handleRemoving(){
    this.props.startRemoveShoppingList(this.props.shoppingList.shoppingListId);
    this.props.history.push('/app');
  }
  editShoppingList(shoppingList){
    this.props.startEditShoppingList(shoppingList, this.props.shoppingList.shoppingListId);
    this.props.history.push('/app');
  }

  render(){
    console.log('shopping list editor props', this.props);
    //console.log('shopping list editor state', this.state);
    return(
      <div>
        <div className="list list--sm list--center list--margin-top list--small-padding-bot">
          <div className="list__item">
            <h4 className="list__item--title list__item--title-details"><em>{this.props.shoppingList.shoppingListTitle}</em></h4>
            <div className="list__item--descr">
              <p>Cash: {this.props.shoppingList.shoppingListMoney}</p>
              <p>Deadline: {this.props.shoppingList.deadline}</p>
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
