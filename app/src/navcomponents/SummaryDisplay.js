import React from 'react';
import numeral from 'numeral';
import history from '../../routing/history';

const SummaryDisplay = (props) => {
  const {
    oneShots =[],
    stdExpenses = [],
    shoppingLists = []
  } = props.user;
  let oneShotsTotalMoney = 0;
  if(!!oneShots){
    for(let i=0; i<oneShots.length; i++){
      oneShotsTotalMoney += parseFloat(oneShots[i].oneShotMoney);
    }
  }
  let stdExpensesTotalMoney= 0;
  if(!!stdExpenses){
    for(let i=0; i<stdExpenses.length; i++){
      stdExpensesTotalMoney += parseFloat(stdExpenses[i].stdExpMoney);
    }
  }
  let shoppingListTotalMoney= 0;
  if(!!shoppingLists){
    for(let i=0; i<shoppingLists.length; i++){
      shoppingListTotalMoney += parseFloat(shoppingLists[i].shoppingListMoney);
    }
  }
  const total = oneShotsTotalMoney + stdExpensesTotalMoney + shoppingListTotalMoney;
  return(
  <div className={`summaryDisplay`}>
    <p><em>Wydatki: {numeral(total).format('0,0.00')} <span className="unit">pln</span></em></p>
    <p><em>Jednorazowe: {numeral(oneShotsTotalMoney).format('0,0.00')} <span className="unit">pln</span></em></p>
    <p><em>Stałe: {numeral(stdExpensesTotalMoney).format('0,0.00')} <span className="unit">pln</span></em></p>
    <p><em>Listy zakupów: {numeral(shoppingListTotalMoney).format('0,0.00')} <span className="unit">pln</span></em></p>
  </div>)
}

export default SummaryDisplay;
