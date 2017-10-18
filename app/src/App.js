import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startTakeDbData } from './actions/dataActions';

import OneShotsList from './components/OneShotsList';
import StdExpList from './components/StdExpList';
import ShoppingListsList from './components/ShoppingListsList';



class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: firebaseApp.auth().currentUser
    }
  }
  componentDidMount(){
    // const { user } = this.state;
    // if(!this.state.user){
    //   this.props.history.push('/login');
    // }else{
        this.props.startTakeDbData();
    // }
  }
  render(){
    return(
      <div className="wrapper">
        <div className="row">

          <div className="col col--6">
            <div className="list">
              <OneShotsList />
              <Link className="list__add-item" to="/oneshotcreator">+</Link>
            </div>
          </div>

          <div className="col col--6">
            <div className="list">
              <StdExpList />
              <Link className="list__add-item" to="/stdexpcreator">+</Link>
            </div>
          </div>

          <div className="col col--6">
            <div className="list">
              <ShoppingListsList />
              <Link className="list__add-item" to="/shoppinglistcreator">+</Link>
            </div>
          </div>

        </div>
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
