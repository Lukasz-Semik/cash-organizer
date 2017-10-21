import { TAKE_DB_DATA, LOG_OUT, ADD_ONE_SHOT, REMOVE_ONE_SHOT, EDIT_ONE_SHOT,
  ADD_STD_EXP, REMOVE_STD_EXP, EDIT_STD_EXP, ADD_SHOPPING_LIST,
  REMOVE_SHOPPING_LIST, REMOVE_USER } from '../actions/action_names';

const userDataDefault = {};

const dataReducer = (state=userDataDefault, action) => {
  let oneShots;
  let stdExpenses;
  let shoppingLists;
  switch(action.type){
    case TAKE_DB_DATA:
      return action.user;
    case ADD_ONE_SHOT:
      return state;
    case LOG_OUT:
      return {};
    case REMOVE_USER:
      return {};
    case REMOVE_ONE_SHOT:
      oneShots = !!state.oneShots ?
                        (state.oneShots.filter(oneShot=>oneShot !== action.oneShotId)) :
                        []
      return {
        ...state,
        oneShots
      }
    case EDIT_ONE_SHOT:
      oneShots = state.oneShots.map((oneShot)=>{
        if(oneShot.oneShotId === action.oneShotId){
          return {
            ...action.oneShot
          }
        }
      })
      return{
        ...state,
        oneShots
      }
    case ADD_STD_EXP:
      return state;
    case REMOVE_STD_EXP:
      stdExpenses = !!state.stdExpenses ?
                    (state.stdExpenses.filter(stdExp=>stdExp !== action.stdExpId)) :
                    []
      return {
        ...state,
        stdExpenses
      }
    case EDIT_STD_EXP:
      stdExpenses = state.stdExpenses.map((stdExp)=>{
        if(stdExp.stdExpId === action.stdExpId){
          return {
            ...action.stdExp
          }
        }
      })
      return{
        ...state,
        stdExpenses
      }
    case ADD_SHOPPING_LIST:
      return state;
    case REMOVE_SHOPPING_LIST:
      shoppingLists = !!state.shoppingLists ?
                        (state.shoppingLists.filter(shoppingList=>shoppingList !== action.shoppingListId)) :
                        []
      return {
        ...state,
        shoppingLists
      }
    default:
      return state;
  }
}

export default dataReducer;
