import React from 'react';
import { Link } from 'react-router-dom';
import { checkWhen } from '../helper-functions/checkWhen';
import numeral from 'numeral';

const StdExp = (props) => {
  let marginResetForHiddenList = props.classModifier ? 'list__item--title-no-margins' : '';
  const { stdExpTitle, stdExpMoney, stdExpId, term, lastPayment } = props.stdExp;
  const when = checkWhen(term,true);
  return(
    <div className={`list-hiding-div ${props.classModifier}`}>
      <div className="list__item">
        <h4 className={`list__item--title ${marginResetForHiddenList}`}>
          <em>{stdExpTitle}</em>
        </h4>
        <div className="list__item--descr">
          <p className="list__item--black">Cash:
            <span className="list__item--cash">
              &nbsp;{numeral(stdExpMoney).format('0,00.00')}</span>
            <span className="unit-list"> pln</span>
          </p>
          <p className="list__item--black">
            {term}. każdego miesiąca <br/><span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
          </p>
        </div>
        <Link to={`/stdexpeditor/${stdExpId}`}
          className="btn btn--top-right btn--orange">
          <i>Edit</i>
        </Link>
        <p className="list__last-payment">Ostatnia wpłata: {lastPayment}</p>
      </div>
      <div className="list__separator"></div>
    </div>
  )
}

export default StdExp;
