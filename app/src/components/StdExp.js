import React from 'react';
import { Link } from 'react-router-dom';

import StdExpEditor from './StdExpEditor';

const StdExp = (props) => {

  return(
    <div>
      <div className="list__item">
        <h4 className="list__item--title">{props.stdExp.stdExpTitle}</h4>
        <div className="list__item--descr">
          <p className="list__item--cash">Cash: {props.stdExp.stdExpMoney}</p>
          <p>{props.stdExp.term}. of each month</p>
          <Link to={`/stdexpeditor/${props.stdExp.stdExpId}`}
            className="btn btn--top-right btn--orange">
            <i>Edit</i>
          </Link>
        </div>
      </div>
      <div className="list__separator"></div>
    </div>
  )
}

export default StdExp;
