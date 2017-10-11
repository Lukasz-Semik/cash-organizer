import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

class App extends Component{
  logOut(){
    const history = this.props.history;
    firebaseApp.auth().signOut()
    .then(()=>{history.push('/')})
    .catch(error=>console.log(error));
  }
  render(){
    return(
      <div>
        <h1>Hello from App</h1>
        <button onClick={()=>{this.logOut()}}>LogOut</button>
      </div>
    );
  }
}

export default App;
