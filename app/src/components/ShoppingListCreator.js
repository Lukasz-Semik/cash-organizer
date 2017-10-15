import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startAddShoppingList } from '../actions/dataActions';
import { firebaseApp } from '../../firebase';
import history from '../../routing/history';

import ShoppingListForm from './ShoppingListForm';

class ShoppingListCreator extends Component {
  constructor(props){
    super(props);
    this.addShoppingList = this.addShoppingList.bind(this);
  }
  componentDidMount(){
    if(!firebaseApp.auth().currentUser){
      this.props.history.push('/login');
    }
  }
  addShoppingList(shoppingList){
    this.props.startAddShoppingList(shoppingList);
    history.push('/app');
  }
  render(){
    console.log('props from shopping list creator', this.props)
    return(
      <div>
        <h4>Shopping List Creator</h4>
        <ShoppingListForm addShoppingList={this.addShoppingList}/>
        <Link to="/app">Back</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startAddShoppingList: (shoppingList)=>dispatch(startAddShoppingList(shoppingList))
  }
}
export default connect(null, mapDispatchToProps)(ShoppingListCreator);
