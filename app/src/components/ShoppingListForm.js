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
      items: this.props.shoppingList ? this.props.shoppingList.items : [],
      error: ''
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
    this.setState(()=>({shoppingListTitle, error:''}));
  }
  onChangeMoney(event){
    const shoppingListMoney = event.target.value;
    if(!shoppingListMoney || shoppingListMoney.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({shoppingListMoney, error:''}))
    }
  }
  handleDateChange(date){
    this.setState(()=>({deadline: date}))
  }
  handleItemTitleChange(event){
    const newItemTitle = event.target.value;
    this.setState(()=>({newItemTitle, error:''}))
  }
  addNewItem(){
    if(this.state.newItemTitle.length>0){
      let items = this.state.items;
      items.push(this.state.newItemTitle);
      this.setState(()=>({newItemTitle: '', items}));
    }
  }
  remove(index){
    const items = this.state.items.filter((item, i)=>{
      if(i !== index){
        return item;
      }
    })
    this.setState(()=>({items}));
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
              <div className="wrapper-helper" key={i}>
                <span className="list__add-item list__add-item--red list__add-item--pull-little-up" onClick={this.remove.bind(this, i)}>
                  <b>-</b>
                </span>
                <p className="list__shopping-items">{item}</p>
                <div className="list__separator list__separator--orange"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }
  handleOnSubmit(event){
    event.preventDefault();
    const { shoppingListTitle, shoppingListMoney, deadline, items } = this.state;
    if(shoppingListTitle === ''){
      this.setState(()=>({error: 'The title must be at least 3 characters long'}))
    }else if(shoppingListMoney === ''){
      this.setState(()=>({error: 'Money input is empty...'}))
    }else if(items.length<1){
      this.setState(()=>({error: 'Shpping list is empty...'}))
    }else{
      this.props.addShoppingList({
        deadline: this.state.deadline.format('LL'),
        shoppingListTitle,
        shoppingListMoney,
        items
      });
    }
  }
  render(){
    return(
      <div>
        <div className="wrapper-helper wrapper-helper--move-up wrapper-helper--padd-bot">
          <h4 className="form__title">{this.props.oneShot ? 'Edit' : 'Create'} Shopping List</h4>
          <form onSubmit={this.handleOnSubmit} className="form">
            <div className="wrapper-helper">
              <input type="text" name="shoppingListTitle" value={this.state.shoppingListTitle}
                onChange={this.onChangeTitle} placeholder="shoppingList" className="form__input"/>
              <span className="form-msg form-msg--hints">{this.props.shoppingList ? 'Title' : ''}</span>
            </div>
            <div className="wrapper-helper">
              <input type="text" name="shoppingListMoney" value={this.state.shoppingListMoney}
                onChange={this.onChangeMoney} placeholder="Cash" className="form__input"/>
              <span className="form-msg form-msg--hints">{this.props.shoppingList ? 'Cash' : ''}</span>
            </div>
            <div className="form__date-picker">
              <DatePicker selected={this.state.deadline} onChange={this.handleDateChange}
                dateFormat="LL" className="form__input form__input--bot-margin"/>
            </div>
            <button className="btn btn--green-const btn--left-bot btn--lg">{this.props.shoppingList ? 'Edit' : 'Add'}</button>
          </form>
          <Link to="/app" className="btn btn--orange-const btn--right-bot btn--lg">Back</Link>
        </div>
        <div className="wrapper-for-shopping-list wrapper-helper">
          <input type="text" placeholder="Item to buy title" name="newItemTitle"
            className="form__input form__input--shopping-list-size form__input--bot-margin"
            value={this.state.newItemTitle} onChange={this.handleItemTitleChange} />
          <button onClick={this.addNewItem}
            className="btn btn--green-const btn--md btn--center">
            <i>Add Item</i>
          </button>
          <p className="form-msg form-msg--pull-up">{!!this.state.error ? this.state.error : ''}</p>
        </div>
        {this.showItemsList()}
      </div>
    );
  }
}

export default ShoppingListForm;
