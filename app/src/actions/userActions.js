import { firebaseApp, database } from '../../firebase';
import { LOG_OUT, REMOVE_USER } from './action_names';
import history from '../../routing/history';


// -------- LOG OUT -----------------

export const logOut = () => ({type: LOG_OUT});

export const startLogOut = () => {
  return dispatch => {
    return firebaseApp.auth().signOut()
    .then(()=>{
      dispatch(logOut());
      history.push('/');
    })
    .catch(error=>console.log(error));
  }
}

export const removeUser = () => ({ type: REMOVE_USER });

export const startRemoveUser = () => {
  const userId = firebaseApp.auth().currentUser.uid;
  return dispatch => {
    return firebaseApp.auth().currentUser.delete()
    .then(()=>{
      return database.ref(`user/${userId}`)
      .remove()
      .then(()=>{
        dispatch(removeUser());
        history.push('/');
      })
    })
    .catch(error=>console.log(error));
  }
}
