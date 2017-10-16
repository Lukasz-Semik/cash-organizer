import React from 'react';

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
  <div className="summaryDisplay">
    <p><em> Total: {total}</em></p>
    <p><em>One Shots: {oneShotsTotalMoney}</em></p>
    <p><em>Std Expenses: {stdExpensesTotalMoney}</em></p>
    <p><em>Shopping Lists: {shoppingListTotalMoney}</em></p>
  </div>)
}

export default SummaryDisplay;
