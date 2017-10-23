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
    shoppingListId,
    done
  } = props.shoppingList;
  const when = checkWhen(null,false, moment(deadline));
  const deadlineClassModifier = done ? 'green' : when.deadlineClassModifier;
  const time = done ? 'Zapłacone' : when.time;
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
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
            Termin:
            <br/>
            {moment(deadline).locale('pl').format('LL')}
            <br/>
            <span className={`list__item--${deadlineClassModifier}`}>{time}</span>
          </p>
        </div>
        <Link to={`/shoppinglisteditor/${shoppingListId}`}
          className="btn btn--top-right btn--orange">
          <i>Edytuj</i>
        </Link>
        <Link to={`/specificshoppinglist/${shoppingListId}`}
          className="btn btn--green btn--top-left"><i>W sklepie</i></Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default ShoppingList;
