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
        <h3>{this.props.shoppingList.shoppingListTitle}</h3>
        <p>Cash: {this.props.shoppingList.shoppingListMoney}</p>
        <p>Deadline: {this.props.shoppingList.deadline}</p>
        <ShoppingListForm shoppingList={this.props.shoppingList} addShoppingList={this.editShoppingList}/>
        <button onClick={this.handleRemoving}>Delete</button>
        <Link to="/app">Back</Link>
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
