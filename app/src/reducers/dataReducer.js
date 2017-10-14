import { TAKE_DB_DATA, LOG_OUT, ADD_ONE_SHOT, REMOVE_ONE_SHOT, EDIT_ONE_SHOT } from '../actions/action_names';

const userDataDefault = {};

const dataReducer = (state=userDataDefault, action) => {
  let oneShots;
  switch(action.type){
    case TAKE_DB_DATA:
      return action.user;
    case ADD_ONE_SHOT:
      return state;
    case LOG_OUT:
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
    consle.log('edit one shot', oneShots);
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
    default:
      return state;
  }
}

export default dataReducer;
