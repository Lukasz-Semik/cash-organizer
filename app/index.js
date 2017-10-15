import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseApp } from './firebase';
import { Provider } from 'react-redux';
import storeConfig from './src/storeConfig';

import 'normalize.css/normalize.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/main.scss';

import Routing from './routing/Routing';

firebaseApp.auth().onAuthStateChanged(user => {
  if(user){
    console.log('user is signed in');
  }else{
    console.log('user has to sign in');
  }
})

const store = storeConfig();

store.subscribe(()=>{
  const state = store.getState();
  console.log('state from index.js', state);
})

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>
  , document.getElementById('root')
);
