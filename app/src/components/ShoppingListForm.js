import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      return(
        <div className="wrapper-for-shopping-list">
          <div className="list__empty-msg">
            <i>list is empty</i>
          </div>
        </div>
      );
    }else{
      return(
        <div className="wrapper-for-shopping-list ">
          {this.state.items.map((item,i)=>{
            return(
              <p className="list__shopping-items"key={i}>{item}</p>
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
        <div className="wrapper-helper wrapper-helper--move-up wrapper-helper--padd-bot">
          <h4 className="form__title">{this.props.oneShot ? 'Edit' : 'Create'} Shopping List</h4>
          <form onSubmit={this.handleOnSubmit} className="form">
            <input type="text" name="shoppingListTitle" value={this.state.shoppingListTitle}
              onChange={this.onChangeTitle} placeholder="shoppingList" className="form__input"/>
            <input type="text" name="shoppingListMoney" value={this.state.shoppingListMoney}
              onChange={this.onChangeMoney} placeholder="Cash" className="form__input"/>
            <div className="form__date-picker">
              <DatePicker selected={this.state.deadline} onChange={this.handleDateChange}
                dateFormat="LL" className="form__input form__input--bot-margin"/>
            </div>
            <button className="btn btn--green-const btn--left-bot btn--lg">{this.props.oneShot ? 'Modify' : 'Add'}</button>
          </form>
          <Link to="/app" className="btn btn--orange-const btn--right-bot btn--lg">Back</Link>
        </div>
        <div className="wrapper-for-shopping-list">
          <input type="text" placeholder="Item to buy title" name="newItemTitle"
            className="form__input form__input--shopping-list-size form__input--bot-margin"
            value={this.state.newItemTitle} onChange={this.handleItemTitleChange} />
          <button onClick={this.addNewItem}
            className="btn btn--green-const btn--md btn--center">
            <i>Add Item</i>
          </button>
        </div>
        {this.showItemsList()}
      </div>
    );
  }
}

export default ShoppingListForm;
