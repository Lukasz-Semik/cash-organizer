import React from 'react';
import { Link } from 'react-router-dom';

import StdExpEditor from './StdExpEditor';

const StdExp = (props) => {

  return(
    <div>
      <div className="list__item">
        <h3>{props.stdExp.stdExpTitle}</h3>
        <p>Cash: {props.stdExp.stdExpMoney}</p>
        <p>Last day of payment: {props.stdExp.term}. of each month</p>
        <Link to={`/stdexpeditor/${props.stdExp.stdExpId}`}>Edit</Link>
      </div>
      <div className="list__separator"></div>
    </div>
  )
}

export default StdExp;
