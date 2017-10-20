import moment from 'moment';

export const checkWhen = (term) => {
  //----deadline display
  const currentMonth = moment().format('M');
  const currentYear = moment().format('YYYY');
  let currentMonthDeadline = `${currentYear}-${currentMonth}-${term}`;
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
  return when;
}
