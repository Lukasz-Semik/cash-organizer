import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import { firebaseApp } from '../firebase';
import history from '../routing/history';
import { startLogOut } from './actions/dataActions';

class Navigation extends Component{
  render(){
    console.log('props from navigation: ', this.props)
    if(this.props.username !== 'not logged in'){
      return(
        <div>
          <h1>Let's organize!</h1>
          <h3>Hello {this.props.username} </h3>
          <button onClick={()=>this.props.startLogOut()}>LogOut</button>
        </div>
      );
    }else{
      return(
        <div>
          <h1>Let's organize!</h1>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const username = state.usersData.username || 'not logged in';
  return {
    username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startLogOut: ()=>dispatch(startLogOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
