import React, { Component } from 'react';

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
    console.log('Login state',this.state);
    return(
      <div>
        <h1>LoginPage</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" placeholder="email" onChange={this.onChangeEmail} value={this.state.email}/>
          <input type="password" name="password" placeholder="password" onChange={this.onChangePass} value={this.state.password}/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
