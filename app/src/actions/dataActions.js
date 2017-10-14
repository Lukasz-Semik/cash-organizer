import { TAKE_DB_DATA, LOG_OUT, ADD_ONE_SHOT, REMOVE_ONE_SHOT, EDIT_ONE_SHOT } from './action_names';
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
      let tempUser = {};
      snapshot.forEach(childSnapshot=>{
        if(childSnapshot.key === firebaseApp.auth().currentUser.uid)
        tempUser = {
          userId: childSnapshot.key,
          ...childSnapshot.val()
        }
      })
      if(tempUser.oneShots === 'empty' || !tempUser.oneShots){
        dispatch(takeDbData(tempUser))
      }else{
        const tempOneShots = tempUser.oneShots;
        let tempOneShotsArr = [];
        for(let props in tempOneShots){

          tempOneShotsArr.push({
            ...tempOneShots[props],
            oneShotId: props
          })
        }
        const user = {
          ...tempUser,
          oneShots: tempOneShotsArr
        }
        dispatch(takeDbData(user));
      }
    })
  }
}

export const addOneShot = (oneShot) => ({
  type: ADD_ONE_SHOT,
  oneShot
});

export const startAddOneShot = (oneShot) => {
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/oneShots`)
    .push(oneShot)
    .then((ref)=>{
      dispatch(addOneShot({
        id: ref,
        ...oneShot
      }))
    });
  }
}

export const editOneShot = (oneShot, oneShotId) => ({
  type: EDIT_ONE_SHOT,
  oneShot,
  oneShotId
})

export const startEditOneShot = (oneShot, oneShotId) => {
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/oneShots/${oneShotId}`)
    .update(oneShot)
    .then(()=>dispatch(removeOneShot(oneShot, oneShotId)))
  }
}

export const removeOneShot = (oneShotId) => ({
  type: REMOVE_ONE_SHOT,
  oneShotId
});

export const startRemoveOneShot = (oneShotId) => {
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/oneShots/${oneShotId}`)
    .remove()
    .then(()=>dispatch(removeOneShot(oneShotId)))
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
