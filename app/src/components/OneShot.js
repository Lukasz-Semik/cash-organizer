import React from 'react';
import { Link } from 'react-router-dom';

const OneShot = (props) => {
  let marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{props.oneShot.oneShotTitle}</em>
        </h4>
        <div className="list__item--descr">
          <p className="list__item--cash">Cash: {props.oneShot.oneShotMoney}</p>
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
