import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import history from '../../routing/history';

import { startLogOut } from '../actions/userActions';

import SummaryDisplay from './SummaryDisplay';

class Navigation extends Component{
  render(){
    //nav for logged in user.
    if(this.props.username !== 'not logged in'){
      return(
        <header className="header">
          <nav className="header__navigation">
            <h1 className="header__title">Cześć <span className="header__username"><em>{this.props.user.username}</em></span> </h1>
            <button className="button button--clear button--pull-right" onClick={()=>this.props.startLogOut()}>Wyloguj</button>
            <Link to="/removeuser" className="button button--clear button--pull-right button--remove-user">Usuń konto</Link>
            <SummaryDisplay user={this.props.user} />
          </nav>
        </header>
      );
    }else{ //nav for not logged in user
      return(
        <header className="header">
          <nav className="header__navigation">
            <h1 className="header__title">Organizer Szmalu</h1>
            <Link className="button button--pull-right" to="/login">Zaloguj</Link>
            <Link className="button button--pull-right" to="/signup">Dołącz</Link>
          </nav>
        </header>
      );
    }
  }
}

const mapStateToProps = state => {
  const username = state.usersData.username || 'not logged in';
  const user = state.usersData;
  return {
    username, user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startLogOut: ()=>dispatch(startLogOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
