import React from 'react';
import { Link } from 'react-router-dom';

const StdExp = (props) => {
  let marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{props.stdExp.stdExpTitle}</em>
        </h4>
        <div className="list__item--descr">
          <p className="list__item--cash">Cash: {props.stdExp.stdExpMoney}</p>
          <p>Deadline: <br/>{props.stdExp.term}.of each month</p>
        </div>
        <Link to={`/stdexpeditor/${props.stdExp.stdExpId}`}
          className="btn btn--top-right btn--orange">
          <i>Edit</i>
        </Link>
      </div>
      <div className="list__separator"></div>
    </div>
  )
}

export default StdExp;
