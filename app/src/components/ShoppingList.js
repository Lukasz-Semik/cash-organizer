import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingList = (props) => {
  return(
    <div>
      <div className="list__item">
        <h4>{props.shoppingList.shoppingListTitle}</h4>
        <p>Cash: {props.shoppingList.shoppingListMoney}</p>
        <p>Deadline: {props.shoppingList.deadline}</p>
        <Link to={`/shoppinglisteditor/${props.shoppingList.shoppingListId}`}>View and edit</Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default ShoppingList;
