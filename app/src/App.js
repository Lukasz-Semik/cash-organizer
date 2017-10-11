import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: firebaseApp.auth().currentUser
    }
  }
  logOut(){
    const history = this.props.history;
    firebaseApp.auth().signOut()
    .then(()=>{history.push('/')})
    .catch(error=>console.log(error));
  }
  componentDidMount(){
    if(!this.state.user){
      this.props.history.push('/');
    }
  }
  render(){
    this.state.user && console.log(this.state.user.email);
    return(
      <div>
        <h1>Hello from App</h1>
        <button onClick={()=>{this.logOut()}}>LogOut</button>
      </div>
    );
  }
}

export default App;
