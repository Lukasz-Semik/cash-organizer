import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './reducers/dataReducer';

const storeConfig = () => {
  const store = createStore(
    combineReducers({
      usersData: dataReducer
    }), applyMiddleware(thunk)
  )
  return store;
}

export default storeConfig;
