import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';

import { firebaseApp } from '../../firebase';
import { checkWhen } from '../helper-functions/checkWhen';

class SpecificShoppingList extends Component{
  constructor(props){
    super(props);
    this.state = {
      shoppingListId: '',
      items: [{
        item: '',
        done: false
      }]
    }
  }
  componentDidMount(){
    const shoppingListData = localStorage.getItem(`shoppingList${this.props.shoppingList.shoppingListId}`);
    const shoppingList = JSON.parse(shoppingListData);
    const { items, shoppingListId } = this.props.shoppingList;
    const newItems = items.map((item,i) => {
      let done = false;
      if(!!shoppingList && shoppingList.items[i] && shoppingList.items[i].item === this.props.shoppingList.items[i]){
        done = !!shoppingList.items[i] ? shoppingList.items[i].done : false;
      }
      return{
        item,
        done
      }
    })
    this.setState(()=>({
      shoppingListId,
      items: newItems
    }))
  }
  componentDidUpdate(){
    const taskData = JSON.stringify(this.state);
    localStorage.setItem(`shoppingList${this.state.shoppingListId}`, taskData);
  }
  changeTaskStatus(index){
    const newItems = this.state.items.map((item, i)=>{
      if(i===index){
        return {
          ...item,
          done: !item.done
        }
      }else{
        return { ...item };
      }
    })
    this.setState(()=>({
      items: newItems
    }))
  }
  render(){
    const { shoppingListTitle, shoppingListMoney, deadline } = this.props.shoppingList;
    const when = checkWhen(null, false, moment(deadline));
    return(
      <div className="list list--sm list--center list--margin-top">
        <div className="list__item">
          <h4 className="list__item--title list__item--title-details">
            <em>{shoppingListTitle}</em>
          </h4>
          <div className="list__item--descr">
            <p className="list__item--black">Koszt:
              <span className="list__item--cash">
                &nbsp;{numeral(shoppingListMoney).format('0,00.00')}
              </span>
              <span className="unit-list"> pln</span>
            </p>
            <p className="list__item--black">
              {moment(deadline).locale('pl').format('LL')}
              <br/>
              <span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
            </p>
          </div>
        </div>
        {this.state.items.map((item,i)=>(
          <div className="wrapper-helper" key={i}>
            <span className={`list__add-item ${item.done ? 'list__add-item--orange' : 'list__add-item--green'}
              list__add-item--pull-little-up`}
              onClick={this.changeTaskStatus.bind(this, i)}>
              <b>v</b>
            </span>
            <p className={`list__shopping-items ${item.done ? 'list__shopping-items--done' : ''}`}>{ item.item }</p>
            <div className="list__separator list__separator--orange"></div>
          </div>
        ))}
        <Link to="/app" className="btn btn--orange-const btn--top-right btn--pull-down">Wróć</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props)=>{
  const shoppingList = state.usersData.shoppingLists.find(shoppingList =>
    shoppingList.shoppingListId === props.match.params.id);
  return{
    shoppingList
  }
}
export default connect(mapStateToProps)(SpecificShoppingList);
