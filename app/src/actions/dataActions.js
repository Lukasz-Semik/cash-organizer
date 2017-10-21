import { TAKE_DB_DATA, LOG_OUT, ADD_ONE_SHOT,
  REMOVE_ONE_SHOT, EDIT_ONE_SHOT, ADD_STD_EXP, REMOVE_STD_EXP, EDIT_STD_EXP,
  ADD_SHOPPING_LIST, REMOVE_SHOPPING_LIST, EDIT_SHOPPING_LIST } from './action_names';
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
      //if tere is no fetaures used, we are not preparing the object, just return simply user info.
      if((!tempUser.stdExpenses && !tempUser.oneShots && !tempUser.shoppingLists)){
        dispatch(takeDbData(tempUser))
      }else{ // preperation data from DB to use in app
        const tempOneShots = tempUser.oneShots;
        let tempOneShotsArr = [];
        for(let props in tempOneShots){
          tempOneShotsArr.push({
            ...tempOneShots[props],
            oneShotId: props
          })
        }
        const tempStdExpenses = tempUser.stdExpenses;
        let tempStdExpensesArr = [];
        for(let props in tempStdExpenses){
          tempStdExpensesArr.push({
            ...tempStdExpenses[props],
            stdExpId: props
          })
        }
        const tempShoppingLists = tempUser.shoppingLists;
        let tempShoppingListsArray = [];
        for(let props in tempShoppingLists){
          tempShoppingListsArray.push({
            ...tempShoppingLists[props],
            shoppingListId: props,
            items: tempShoppingLists[props].items.split('***')
          })
        }
        const user = {
          ...tempUser,
          oneShots: tempOneShotsArr.length>0 ? tempOneShotsArr : null,
          stdExpenses: tempStdExpensesArr.length>0 ? tempStdExpensesArr : null,
          shoppingLists: tempShoppingListsArray.length>0 ? tempShoppingListsArray : null
        }
        dispatch(takeDbData(user));
      }
    })
  }
}

// ---------- ONE SHOT SECTION ---------
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

// ---------- STD EXPENSES SECTION ---------

export const addStdExp = (stdExp) => ({
  type: ADD_STD_EXP,
  stdExp
});

export const startAddStdExp = (stdExp) => {
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/stdExpenses`)
    .push(stdExp)
    .then((ref)=>{
      dispatch(addStdExp({
        id: ref,
        ...stdExp
      }))
    });
  }
}

export const editStdExp = (stdExp, stdExpId) => ({
  type: EDIT_STD_EXP,
  stdExp,
  stdExpId
})

export const startEditStdExp = (stdExp, stdExpId) => {
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/stdExpenses/${stdExpId}`)
    .update(stdExp)
    .then(()=>dispatch(removeOneShot(stdExp, stdExpId)))
  }
}

export const removeStdExp = (stdExpId) => ({
  type: REMOVE_STD_EXP,
  stdExpId
});

export const startRemoveStdExp = (stdExpId) => {
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/stdExpenses/${stdExpId}`)
    .remove()
    .then(()=>dispatch(removeOneShot(stdExpId)))
  }
}

// -------- SHOPPING LISTS SECTION --------
export const addShoppingList = shoppingList => ({
  type: ADD_SHOPPING_LIST,
  shoppingList
})

export const startAddShoppingList = shoppingList => {
  const shoppingListForDB = {
    shoppingListTitle: shoppingList.shoppingListTitle,
    shoppingListMoney: shoppingList.shoppingListMoney,
    items: shoppingList.items.join('***'),
    deadline: shoppingList.deadline
  }
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/shoppingLists`)
    .push(shoppingListForDB)
    .then(()=>dispatch(addShoppingList(shoppingList)));
  }
}

export const editShoppingList = (shoppingList, shoppingListId) => ({
  type: EDIT_SHOPPING_LIST,
  shoppingList,
  shoppingListId
})

export const startEditShoppingList = (shoppingList, shoppingListId) => {
  const shoppingListForDB = {
    shoppingListTitle: shoppingList.shoppingListTitle,
    shoppingListMoney: shoppingList.shoppingListMoney,
    items: shoppingList.items.join('***'),
    deadline: shoppingList.deadline,
    done: shoppingList.done
  }
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/shoppingLists/${shoppingListId}`)
    .update(shoppingListForDB)
    .then(()=>dispatch(removeOneShot(shoppingList, shoppingListId)))
  }
}


export const removeShoppingList = (shoppingListId) => ({
  type: REMOVE_SHOPPING_LIST,
  shoppingList
});

export const startRemoveShoppingList = (shoppingListId) => {
  return dispatch => {
    return database.ref(`user/${firebaseApp.auth().currentUser.uid}/shoppingLists/${shoppingListId}`)
    .remove()
    .then(()=>dispatch(removeOneShot(shoppingListId)))
  }
}

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
