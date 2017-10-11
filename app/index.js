import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseApp } from './firebase';

import 'normalize.css/normalize.css';
import './styles/main.scss';

import Routing from './routing/Routing';

firebaseApp.auth().onAuthStateChanged(user => {
  if(user){
    console.log('user is signed in');
  }else{
    console.log('user has to sign in');
  }
})

ReactDOM.render(
  <Routing />
  , document.getElementById('root')
);
