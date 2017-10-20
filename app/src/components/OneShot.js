import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';
import { checkWhen } from '../helper-functions/checkWhen';

const OneShot = (props) => {
  let marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  const { oneShotTitle, oneShotMoney, deadline, oneShotId } = props.oneShot
  const when = checkWhen(null,false, moment(deadline));
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{oneShotTitle}</em>
        </h4>
        <div className="list__item--descr">
          <p className="list__item--black">Cash:
            <span className="list__item--cash">
              &nbsp;{numeral(oneShotMoney).format('0,00.00')}
            </span>
            <span className="unit-list"> pln</span>
          </p>
          <p className="list__item--black">
            {deadline}
            <br/>
            <span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
          </p>
        </div>
        <Link to={`/oneshoteditor/${oneShotId}`}
          className="btn btn--orange btn--top-right">
          <i>Edit</i>
        </Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default OneShot;
