import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingList = (props) => {
  let marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{props.shoppingList.shoppingListTitle}</em>
        </h4>
        <div className="list__item--descr">
          <p>Cash: {props.shoppingList.shoppingListMoney}</p>
          <p>Deadline: <br/>{props.shoppingList.deadline}</p>
        </div>
        <Link to={`/shoppinglisteditor/${props.shoppingList.shoppingListId}`}
          className="btn btn--top-right btn--orange">
          <i>Edit</i>
        </Link>
        <Link to={`/specificshoppinglist/${props.shoppingList.shoppingListId}`}
          className="btn btn--green btn--top-left"><i>View</i></Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default ShoppingList;
