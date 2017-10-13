import { TAKE_DB_DATA, LOG_OUT, ADD_ONE_SHOT } from '../actions/action_names';

const userDataDefault = {};

const dataReducer = (state=userDataDefault, action) => {
  switch(action.type){
    case TAKE_DB_DATA:
      return action.user;
    case ADD_ONE_SHOT:
      return state;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export default dataReducer;
