import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ShoppingListForm extends Component{
  constructor(props){
    super(props);
    this.state={
      shoppingListTitle: this.props.shoppingList ? this.props.shoppingList.shoppingListTitle : '',
      shoppingListMoney: this.props.shoppingList ? this.props.shoppingList.shoppingListMoney : '',
      deadline: this.props.shoppingList ? moment(this.props.shoppingList.deadline) : moment(),
      newItemTitle: '',
      items: this.props.shoppingList ? this.props.shoppingList.items : []
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.handleItemTitleChange = this.handleItemTitleChange.bind(this);
  }
  onChangeTitle(event){
    const shoppingListTitle = event.target.value;
    this.setState(()=>({shoppingListTitle}));
  }
  onChangeMoney(event){
    const shoppingListMoney = event.target.value;
    if(!shoppingListMoney || shoppingListMoney.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({shoppingListMoney}))
    }
  }
  handleDateChange(date){
    this.setState(()=>({deadline: date}))
  }
  handleItemTitleChange(event){
    const newItemTitle = event.target.value;
    this.setState(()=>({newItemTitle}))
  }
  addNewItem(){
    if(this.state.newItemTitle.length>0){
      let items = this.state.items;
      items.push(this.state.newItemTitle);
      this.setState(()=>({newItemTitle: '', items}));
    }
  }
  showItemsList(){
    if(this.state.items.length<1){
      return(<p>list is empty</p>);
    }else{
      return(
        <div>
          {this.state.items.map((item,i)=>{
            return(
              <p key={i}>{item}</p>
            );
          })}
        </div>
      );
    }
  }
  handleOnSubmit(event){
    event.preventDefault();
    this.props.addShoppingList({...this.state, done: false, deadline: this.state.deadline.format('LL')});
  }
  render(){
    return(
      <div>
        <p>Shopping list form</p>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="shoppingListTitle" value={this.state.shoppingListTitle}
            onChange={this.onChangeTitle} placeholder="shoppingList"/>
          <input type="text" name="shoppingListMoney" value={this.state.shoppingListMoney}
            onChange={this.onChangeMoney} placeholder="Cash"/>
          <DatePicker selected={this.state.deadline} onChange={this.handleDateChange} dateFormat="LL"/>
          <button>Add</button>
        </form>
        <input type="text" placeholder="Item to buy title" name="newItemTitle"
          value={this.state.newItemTitle} onChange={this.handleItemTitleChange} />
        <button onClick={this.addNewItem}>Add item</button>
        {this.showItemsList()}
      </div>
    );
  }
}

export default ShoppingListForm;
