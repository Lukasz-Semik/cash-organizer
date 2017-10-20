import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';

import { checkWhen } from '../helper-functions/checkWhen';

const ShoppingList = (props) => {
  let marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  const {
    shoppingListTitle,
    shoppingListMoney,
    deadline,
    shoppingListId
  } = props.shoppingList;
  const when = checkWhen(null, false, moment(deadline));
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{shoppingListTitle}</em>
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
            <span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
          </p>
        </div>
        <Link to={`/shoppinglisteditor/${shoppingListId}`}
          className="btn btn--top-right btn--orange">
          <i>Edit</i>
        </Link>
        <Link to={`/specificshoppinglist/${shoppingListId}`}
          className="btn btn--green btn--top-left"><i>View</i></Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default ShoppingList;
