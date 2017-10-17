import React from 'react';
import { Link } from 'react-router-dom';

const OneShot = (props) => {
  return(
    <div>
      <div className="list__item">
        <h4 className="list__item--title"><em>{props.oneShot.oneShotTitle}</em></h4>
        <div className="list__item--descr">
          <p className="list__item--cash">Cash: {props.oneShot.oneShotMoney}</p>
          <p>Deadline: <br/>{props.oneShot.deadline}</p>
        </div>
        <Link to={`/oneshoteditor/${props.oneShot.oneShotId}`}
          className="edit-btn">
          <i>Edit</i>
        </Link>
      </div>
      <div className="list__separator"></div>
    </div>
  );
}

export default OneShot;
