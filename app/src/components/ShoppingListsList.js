import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShoppingList from './ShoppingList';

class ShoppingListsList extends Component {

  generateShoppingListsList(){
    if(!this.props.shoppingLists || this.props.shoppingLists === 'empty'){
      return(<div>Empty</div>)
    }else{
      return(
        <div>
          {this.props.shoppingLists.map((shoppingList, i)=>{
            return(<ShoppingList key={shoppingList.shoppingListId} shoppingList={shoppingList} />);
          })}
        </div>
      );
    }
  }
  render(){
    return(
      <div>
        <h4>Shopping Lists List</h4>
        {this.generateShoppingListsList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const shoppingLists = state.usersData.shoppingLists;
  return {
    shoppingLists
  }
}
export default connect(mapStateToProps)(ShoppingListsList);
