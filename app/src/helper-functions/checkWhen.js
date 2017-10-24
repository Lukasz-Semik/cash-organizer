import moment from 'moment';

//arguments - term stands for argument from stexp (only day). deadline - whole date.
export const checkWhen = (term, isStdExp, deadline) => {
  //----deadline display
  const currentMonth = moment().format('M');
  const currentYear = moment().format('YYYY');
  let currentMonthDeadline = `${currentYear}-${currentMonth}-${term}`;
  //version for standard expenses
  if(isStdExp){
    const isStillBefore = moment().isBefore(currentMonthDeadline);
    let when;
    //let's check if current day is still before deadline in current month range.
    if(isStillBefore){
      //if yes - whe can show when is next payment.
      when = moment(currentMonthDeadline).locale('pl').fromNow();
    }else{
      //if not - we have to switch to the next month (or year - december)
      let nextMonth = moment().add(1, 'M').format('M');
      let nextYear = nextMonth === 1 ? moment().add(1,'y').format('YYYY') : currentYear;
      currentMonthDeadline = `${nextYear}-${nextMonth}-${term}`;
      when = moment(currentMonthDeadline).locale('pl').fromNow();
    }
    when = 'Kolejny ' + when;
    const deadlineClassModifier = setClassModifier(moment(currentMonthDeadline));
    return {
      time: when,
      deadlineClassModifier
    };
  }else{// --- version for non standard expenses
    //check if user missed deadline.
    const isAfter = moment().isAfter(moment(deadline));
    //if yes, always red.
    let deadlineClassModifier
    if(isAfter){
      deadlineClassModifier = 'red';
    }else{
      deadlineClassModifier = setClassModifier(moment(deadline));
    }
    //--- check if is today and if yes, modify when
    const today = moment().format('D');
    const day = moment(deadline).format('D');
    const when = today === day ? 'Dzisiaj' : moment(deadline).locale('pl').fromNow();
    return{
      time: when,
      deadlineClassModifier
    }
  }
}
//function declaration for class modifier (to be hoisted);
function setClassModifier(deadline){
  const difference = deadline.diff(moment(), 'days');
  let deadlineClassModifier = 'grey';
  if(difference > 20 ){
    deadlineClassModifier = 'grey';
  }
  if(difference <=20 && difference > 10){
    deadlineClassModifier = 'orange';
  }
  if(difference < 10){
    deadlineClassModifier = 'red';
  }
  return deadlineClassModifier;
}
