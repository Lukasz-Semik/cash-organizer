import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import { firebaseApp } from '../../firebase';
import history from '../../routing/history';

import { startLogOut } from '../actions/dataActions';

import SummaryDisplay from './SummaryDisplay';

class Navigation extends Component{
  render(){
    console.log('props from navigation: ', this.props)
    //nav for logged in user.
    if(this.props.user.username !== 'not logged in'){
      return(
        <header className="header">
          <nav className="header__navigation">
            <h1 className="header__title">Hello {this.props.user.username} </h1>
            <button className="button button--clear" onClick={()=>this.props.startLogOut()}>LogOut</button>
            <SummaryDisplay user={this.props.user} />
          </nav>
        </header>
      );
    }else{ //nav for not logged in user
      return(
        <header className="header">
          <nav className="header__navigation">
            <h1 className="header__title">Cash Organizer</h1>
            <NavLink className="button" to="/login">Log In</NavLink>
            <NavLink className="button" to="/signup">Sign Up</NavLink>
          </nav>
        </header>
      );
    }
  }
}

const mapStateToProps = state => {
  const user = state.usersData || 'not logged in';
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startLogOut: ()=>dispatch(startLogOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
