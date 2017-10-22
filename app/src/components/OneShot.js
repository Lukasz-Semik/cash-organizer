import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';
import { checkWhen } from '../helper-functions/checkWhen';

const OneShot = (props) => {
  const marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  const { oneShotTitle, oneShotMoney, deadline, oneShotId, done } = props.oneShot
  const when = checkWhen(null,false, moment(deadline));
  const deadlineClassModifier = done ? 'green' : when.deadlineClassModifier;
  const time = done ? 'Zapłacone' : when.time;

  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{oneShotTitle}</em>
        </h4>
        <div className="list__item--descr">
          <p className="list__item--black">Koszt:
            <span className="list__item--cash">
              &nbsp;{numeral(oneShotMoney).format('0,00.00')}
            </span>
            <span className="unit-list"> pln</span>
          </p>
          <p className="list__item--black">
            {moment(deadline).locale('pl').format('LL')}
            <br/>
            <span className={`list__item--${deadlineClassModifier}`}>{time}</span>
          </p>
        </div>
        <Link to={`/oneshoteditor/${oneShotId}`}
          className="btn btn--orange btn--top-right">
          <i>Edytuj</i>
        </Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default OneShot;
