import React, { Component } from 'react';
import { connect } from 'react-redux';

class SpecificShoppingList extends Component{
  render(){
    console.log(this.props.shoppingList)
    return(
      <div className="list list--sm list--center list--margin-top">
        <div className="list__item">
          <h4 className="list__item--title list__item--title-details">
            <em>{this.props.shoppingList.shoppingListTitle}</em>
          </h4>
          <div className="list__item--descr">
            <p className="list__item--cash">Cash: {this.props.shoppingList.shoppingListMoney}</p>
            <p>Deadline: <br/>{this.props.shoppingList.deadline} d</p>
          </div>
        </div>

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

// <div className={`list-hiding-div ${props.classModifier}`}>
//   <div className="list__item">
//     <h4 className={`list__item--title ${marginResetForHiddenList}`}>
//       <em>{props.stdExp.stdExpTitle}</em>
//     </h4>
//     <div className="list__item--descr">
//       <p className="list__item--cash">Cash: {props.stdExp.stdExpMoney}</p>
//       <p>Deadline: <br/>{props.stdExp.term}.of each month</p>
//     </div>
//     <Link to={`/stdexpeditor/${props.stdExp.stdExpId}`}
//       className="btn btn--top-right btn--orange">
//       <i>Edit</i>
//     </Link>
//   </div>
//   <div className="list__separator"></div>
// </div>
