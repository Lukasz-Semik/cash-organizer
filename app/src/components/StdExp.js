import React from 'react';
import { Link } from 'react-router-dom';

import StdExpEditor from './StdExpEditor';

const StdExp = (props) => {

  return(
    <div>
      <hr/>
      <h3>{props.stdExp.stdExpTitle}</h3>
      <p>Cash: {props.stdExp.stdExpMoney}</p>
      <p>Last day of payment: {props.stdExp.term}. of each month</p>
      <Link to={`/stdexpeditor/${props.stdExp.stdExpId}`}>Edit</Link>
      <hr/>
    </div>
  )
}

export default StdExp;
