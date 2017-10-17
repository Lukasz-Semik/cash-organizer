import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    const history = this.props.history;
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{history.push('/app')})
    .catch(error=>console.log(error));
  }
  onChangeEmail(event){
    const email = event.target.value;
    this.setState(()=>({ email }));
  }
  onChangePass(event){
    const password = event.target.value;
    this.setState(()=>({ password }));
  }
  render(){
    return(
      <div className="wrapper-form">
        <h2 className="form__title">Let's Log In</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <input type="text" name="email" placeholder="email" className="form__input"
            onChange={this.onChangeEmail} value={this.state.email} />
          <input type="password" name="password" placeholder="password" className="form__input"
            onChange={this.onChangePass} />
          <button className="button button--login">Log In</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
