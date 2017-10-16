import React, { Component } from 'react';
import { firebaseApp, database } from '../../firebase';

class SignUpPage extends Component{
  constructor(props){
    super(props);

    this.state={
      email: '',
      password: '',
      username: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    const { email, password, username } = this.state;
    const history = this.props.history;
    //const oneShots = 'empty';
    //const stdExpenses = 'empty';
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      const userId = firebaseApp.auth().currentUser.uid;
      database.ref(`user/${userId}`).set({
        email,
        username,
      })
      history.push('/app')
    })
    .catch(error=>{
      console.log(error);
    })
  }
  onChangeEmail(event){
    const email = event.target.value;
    this.setState(()=>({ email }));
  }
  onChangePass(event){
    const password = event.target.value;
    this.setState(()=>({ password }));
  }
  onChangeUsername(event){
    const username = event.target.value;
    this.setState(()=>({username}))
  }
  render(){
    return(
      <div className="wrapper-form">
        <h2 className="form__title">SignUpPage</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <input type="text" name="username" placeholder="username" className="form__input"
            onChange={this.onChangeUsername} value={this.state.username}/>
          <input type="text" name="email" placeholder="email" className="form__input"
            onChange={this.onChangeEmail} value={this.state.email}/>
          <input type="password" name="password" className="form__input"
            placeholder="password" onChange={this.onChangePass}
            value={this.state.password}/>
          <button className="button button--login">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
