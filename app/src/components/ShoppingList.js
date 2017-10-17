import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingList = (props) => {
  return(
    <div>
      <div className="list__item">
        <h4 className="list__item--title">{props.shoppingList.shoppingListTitle}</h4>
        <div className="list__item--descr">
          <p>Cash: {props.shoppingList.shoppingListMoney}</p>
          <p>Deadline: <br/>{props.shoppingList.deadline}</p>
        </div>
        <Link to={`/shoppinglisteditor/${props.shoppingList.shoppingListId}`}
          className="btn btn--top-right btn--orange">
          <i>Edit</i>
        </Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default ShoppingList;
