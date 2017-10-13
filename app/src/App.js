import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startTakeDbData } from './actions/dataActions';

import OneShotsList from './components/OneShotsList';


class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: firebaseApp.auth().currentUser
    }
  }
  componentDidMount(){
    const { user } = this.state;
    if(!this.state.user){
      this.props.history.push('/login');
    }else{
      this.props.startTakeDbData();
    }
  }
  render(){
    console.log('props from App', this.props);
    return(
      <div>
        <OneShotsList />
        <Link to="/oneshotcreator">Create One Shot</Link>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTakeDbData: () => dispatch(startTakeDbData())
  }
}


export default connect(null, mapDispatchToProps)(App);
