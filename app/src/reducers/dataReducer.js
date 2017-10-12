import { TAKE_DB_DATA } from '../actions/action_names';

const userDataDefault = {};

const dataReducer = (state=userDataDefault, action) => {
  switch(action.type){
    case TAKE_DB_DATA:
      return action.user;
    default:
      return state;
  }
}

export default dataReducer;
