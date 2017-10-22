import React, { Component } from 'react';
import { firebaseApp, database } from '../../firebase';

class SignUpPage extends Component{
  constructor(props){
    super(props);

    this.state={
      email: '',
      password: '',
      username: '',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    if(this.state.username.length < 2){
      this.setState(()=>({error: 'Nazwa użytkownika musi mieć conajmniej 3 znaki'}));
    }else{
      const { email, password, username } = this.state;
      const history = this.props.history;
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
        let errorMsg;
        if(error.message === 'The email address is badly formatted.'){
          errorMsg = 'Nieprawidłowy adres e-mail.'
        }
        if(error.message === 'The password must be 6 characters long or more.'){
          errorMsg = 'Hasło musi mieć conajmniej 6 znaków'
        }
        this.setState(()=>({error: errorMsg}));
      })
    }
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
      <div className="wrapper-form wrapper-helper">
        <h2 className="form__title">Zarejestruj się</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <input type="text" name="username" placeholder="Nazwa Użytkownika" className="form__input"
            onChange={this.onChangeUsername} value={this.state.username}/>
          <input type="text" name="email" placeholder="Twój e-mail" className="form__input"
            onChange={this.onChangeEmail} value={this.state.email}/>
          <input type="password" name="password" className="form__input"
            placeholder="Hasło" onChange={this.onChangePass}
            />
          <button className="button button--login">Start</button>
        </form>
        <p className="form-msg">{!!this.state.error ? this.state.error : ''}</p>
      </div>
    );
  }
}

export default SignUpPage;
