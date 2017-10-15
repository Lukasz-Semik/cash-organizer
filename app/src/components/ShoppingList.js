import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingList = (props) => {
  return(
    <div>
      <hr/>
      <h3>{props.shoppingList.shoppingListTitle}</h3>
      <p>Cash: {props.shoppingList.shoppingListMoney}</p>
      <p>Deadline: {props.shoppingList.deadline}</p>
      <Link to={`/shoppinglisteditor/${props.shoppingList.shoppingListId}`}>View and edit</Link>
      <hr/>
    </div>
  );
}

export default ShoppingList;
