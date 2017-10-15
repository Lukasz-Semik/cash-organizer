import React from 'react';

const SummaryDisplay = (props) => {
  const {
    oneShots =[],
    stdExpenses = [],
    shoppingList = []
  } = props.user;
  console.log('sum display one shots', oneShots);
  let oneShotsTotalMoney = 0;
  if(!!oneShots){
    for(let i=0; i<oneShots.length; i++){
      oneShotsTotalMoney += parseFloat(oneShots[i].oneShotMoney);
    }
  }
  let stdExpensesTotalMoney= 0;
  if(!!stdExpenses){
    for(let i=0; i<stdExpenses.length; i++){
      stdExpensesTotalMoney += parseFloat(stdExpenses[i].stdExpensestMoney);
    }
  }
  let shoppingListTotalMoney= 0;
  if(!!shoppingList){
    for(let i=0; i<shoppingList.length; i++){
      shoppingListTotalMoney += parseFloat(shoppingList[i].shoppingListMoney);
    }
  }
  const total = oneShotsTotalMoney + stdExpensesTotalMoney + shoppingListTotalMoney;
  return(
  <div className="summaryDisplay">
    <p><em> Total: {total}</em></p>
    <p><em>One Shots Total: {oneShotsTotalMoney}</em></p>
    <p><em>Std Expenses Total: {stdExpensesTotalMoney}</em></p>
    <p><em>Shopping List Total: {shoppingListTotalMoney}</em></p>
  </div>)
}

export default SummaryDisplay;
