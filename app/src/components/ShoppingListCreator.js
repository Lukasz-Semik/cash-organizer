import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startAddShoppingList } from '../actions/dataActions';
import { firebaseApp } from '../../firebase';

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
    this.props.history.push('/app');
  }
  render(){
    return(
      <div className="wrapper-form">
        <ShoppingListForm addShoppingList={this.addShoppingList}/>
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
