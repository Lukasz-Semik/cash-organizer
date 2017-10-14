import React from 'react';

const OneShot = (props) => {
  console.log('props from one shot', props);
  return(
    <div>
      <hr/>
      <h3>{props.oneShot.oneShotTitle}</h3>
      <p>Cash: {props.oneShot.oneShotMoney}</p>
      <p>Deadline: {props.oneShot.deadline}</p>
      <hr/>
    </div>
  );
}

export default OneShot;
