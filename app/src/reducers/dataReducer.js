import { TAKE_DB_DATA, LOG_OUT, ADD_ONE_SHOT, REMOVE_ONE_SHOT } from '../actions/action_names';

const userDataDefault = {};

const dataReducer = (state=userDataDefault, action) => {
  switch(action.type){
    case TAKE_DB_DATA:
      return action.user;
    case ADD_ONE_SHOT:
      return state;
    case LOG_OUT:
      return {};
    case REMOVE_ONE_SHOT:
      //const oneShots = state.usersData.oneShots.filter(oneShot=>oneShot !== action.oneShotId)
      console.log('userDataReducer', state.oneShots);
      const oneShots = !!state.oneShots ?
                        (state.oneShots.filter(oneShot=>oneShot !== action.oneShotId)) :
                        []
      return {
        ...state,
        oneShots
      }
    default:
      return state;
  }
}

export default dataReducer;
