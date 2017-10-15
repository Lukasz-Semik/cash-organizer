import React, { Component } from 'react';
import { connect } from 'react-redux';

//import OneShot from './OneShot';

class ShoppingListsList extends Component {

  generateShoppingListsList(){
    if(!this.props.shoppingLists || this.props.shoppingLists === 'empty'){
      return(<div>Empty</div>)
    }else{
      return(
        <div>
          {this.props.shoppingLists.map((shoppingList, i)=>{
            return(<OneShot key={shoppingList.shoppingListId} oneShot={shoppingList} />);
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
