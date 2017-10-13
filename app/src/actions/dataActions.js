import { TAKE_DB_DATA, LOG_OUT } from './action_names';
import { database, firebaseApp } from '../../firebase';
import history from '../../routing/history';

export const takeDbData = (user) => ({
  type: TAKE_DB_DATA,
  user
});

export const startTakeDbData = () => {
  return dispatch => {
    return database.ref('user')
    .once('value')
    .then(snapshot=>{
      let user = {};
      snapshot.forEach(childSnapshot=>{
        if(childSnapshot.key === firebaseApp.auth().currentUser.uid)
        user = {
          userId: childSnapshot.key,
          ...childSnapshot.val()
        }
      })
      dispatch(takeDbData(user))
    })
  }
}

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
