import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';

import { startRemoveShoppingList, startEditShoppingList } from '../actions/dataActions';
import { checkWhen } from '../helper-functions/checkWhen';

import ShoppingListForm from './ShoppingListForm';

class ShoppingListEditor extends Component {
  constructor(props){
    super(props);
    this.editShoppingList = this.editShoppingList.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
    this.changeStatus = this.changeStatus.bind(this);

    this.state = {
      done: this.props.shoppingList.done
    }
  }

  handleRemoving(){
    localStorage.removeItem(`shoppingList${this.props.shoppingList.shoppingListId}`);
    this.props.startRemoveShoppingList(this.props.shoppingList.shoppingListId);
    this.props.history.push('/app');
  }
  editShoppingList(shoppingList){
    this.props.startEditShoppingList(shoppingList, this.props.shoppingList.shoppingListId);
    this.props.history.push('/app');
  }
  changeStatus(){
    this.setState(prevState=>({
      done: !prevState.done
    }));
  }

  render(){
    const { shoppingListMoney, deadline, shoppingListTitle } = this.props.shoppingList;
    const when = checkWhen(null, false, moment(deadline));
    const time = this.state.done ? 'Zrobione' : when.time;
    const deadlineClassModifier = this.state.done ? 'green' : when.deadlineClassModifier;
    const classDoneBtnModifier = this.state.done ? 'btn--green-const' : '';
    return(
      <div>
        <div className="list list--sm list--center list--margin-top list--small-padding-bot">
          <div className="list__item">
            <h4 className="list__item--title list__item--title-details">
              <em>{this.props.shoppingList.shoppingListTitle}</em>
            </h4>
            <div className="list__item--descr">
              <p className="list__item--black">Cash:
                <span className="list__item--cash">
                  &nbsp;{numeral(shoppingListMoney).format('0,00.00')}
                </span>
                <span className="unit-list"> pln</span>
              </p>
              <p className="list__item--black">
                {deadline}
                <br/>
                <span className={`list__item--${deadlineClassModifier}`}>{time}</span>
              </p>
            </div>
            <button className="btn btn--red-const btn--top-right-detail-v"
              onClick={this.handleRemoving}>
              Delete
            </button>
            <button onClick={this.changeStatus}
              className={`btn ${classDoneBtnModifier} btn--top-left-detail-v smooth-transition-std`}>
              {this.state.done ? 'Zapłacone' : 'Oznacz'}
            </button>
          </div>
        </div>
        <div className="wrapper-form wrapper-form--item-size wrapper-form--padd-bot-sm wrapper-form--move-up">
          <div className="wrapper-helper">
            <ShoppingListForm done={this.state.done} duringEdition={true}
              shoppingList={this.props.shoppingList} addShoppingList={this.editShoppingList}/>
          </div>
        </div>
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
