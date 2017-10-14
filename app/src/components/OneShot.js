import React from 'react';
import { Link } from 'react-router-dom';

const OneShot = (props) => {
  console.log('props from one shot', props);
  return(
    <div>
      <hr/>
      <h3>{props.oneShot.oneShotTitle}</h3>
      <p>Cash: {props.oneShot.oneShotMoney}</p>
      <p>Deadline: {props.oneShot.deadline}</p>
      <Link to={`/oneshoteditor/${props.oneShot.oneShotId}`}>Edit</Link>
      <hr/>
    </div>
  );
}

export default OneShot;
