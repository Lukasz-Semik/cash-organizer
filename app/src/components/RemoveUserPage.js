import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startRemoveUser } from '../actions/userActions';
import { firebaseApp } from '../../firebase';

class RemoveUserPage extends Component {
  constructor(props){
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.state = {
      userEmail: firebaseApp.auth().currentUser ? firebaseApp.auth().currentUser.email : 'user not logged in',
      emailToDelete: '',
      error: ''
    }
    this.removeUser = this.removeUser.bind(this);
  }
  componentDidMount(){
    if(!firebaseApp.auth().currentUser){
      this.props.history.push('/login');
    }
  }
  onEmailChange(event){
    const emailToDelete = event.target.value;
    this.setState(()=>({
      emailToDelete
    }));
  }
  removeUser(){
    if(this.state.emailToDelete !== this.state.userEmail){
      this.setState(()=>({
        error: 'Nieprawidłowy e-mail!'
      }));
    }else{
      this.props.startRemoveUser();
    }
  }
  render(){
    return(
      <div className="wrapper-form wrapper-helper">
        <h4 className="list__title">Usuwanie Konta</h4>
        <p className="removal-text"><i>Szkoda, że się żegnamy :(</i></p>
        <p className="removal-text"><i>Po usunięciu konta, nie będzie możliwości odzyskania danych.</i></p>
        <p className="removal-text"><i>Wpisz swój adres e-mail i naciśnij usuń, aby usunąć konto.</i></p>
        <br/>
          <input type="text" name="email" value={this.state.emailToDelete}
            onChange={this.onEmailChange} placeholder="e-mail do usunięcia"
            className="form__input form__input--less-margin-bot"/>
          <button className="button button--login button--login--removal"
            onClick={this.removeUser}>
            Usuń
          </button>
          <p className="form-msg">{!!this.state.error ? this.state.error : ''}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startRemoveUser: ()=>dispatch(startRemoveUser())
  }
}


export default connect(null, mapDispatchToProps)(RemoveUserPage);
