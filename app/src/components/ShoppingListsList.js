import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShoppingList from './ShoppingList';

class ShoppingListsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      listIsVisible: true
    }
    this.showHide = this.showHide.bind(this);
  }
  showHide(){
    this.setState(prevState => ({
      listIsVisible: !prevState.listIsVisible
    }))
  }
  generateShoppingListsList(){
    if(!this.props.shoppingLists || this.props.shoppingLists === 'empty'){
      return(<div className="list__empty-msg"><i>Add item to start</i></div>)
    }else{
      let classModifier = '';
      if(!this.state.listIsVisible){
        classModifier = 'list-hiding-div--is-hiding';
      }
      return(
        <div>
          {this.props.shoppingLists.map((shoppingList, i)=>{
            return(
              <ShoppingList key={shoppingList.shoppingListId}
                shoppingList={shoppingList} classModifier={classModifier}/>
            );
          })}
        </div>
      );
    }
  }
  render(){
    let showHideBtnModifier = '';
    if(!this.props.shoppingLists || (this.props.shoppingLists.length === 0)){
      showHideBtnModifier = 'list-btn-hidden';
    }
    if(this.props.shoppingLists && (this.props.shoppingLists.length > 0 && !this.state.listIsVisible)){
      showHideBtnModifier = 'list-items-hidden';
    }
    return(
      <div>
        <span className={`list__add-item list__add-item--left ${showHideBtnModifier}`}
          onClick={this.showHide}>
          <b>&darr;</b>
        </span>
        <h4 className="list__title">Shopping Lists</h4>
        <div className="list__separator"></div>
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
