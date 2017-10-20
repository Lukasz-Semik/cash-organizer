import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

const OneShot = (props) => {
  let marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{props.oneShot.oneShotTitle}</em>
        </h4>
        <div className="list__item--descr">
          <p className="list__item--black">Cash:
            <span className="list__item--cash"> {numeral(props.oneShot.oneShotMoney).format('0,00.00')}</span>
            <span className="unit-list"> pln</span>
          </p>
          <p>Deadline: <br/>{props.oneShot.deadline}</p>
        </div>
        <Link to={`/oneshoteditor/${props.oneShot.oneShotId}`}
          className="btn btn--orange btn--top-right">
          <i>Edit</i>
        </Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default OneShot;
