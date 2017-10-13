import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import { startTakeDbData } from './actions/dataActions';


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
        <h1>Hello {this.props.user.username} from App</h1>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTakeDbData: () => dispatch(startTakeDbData())
  }
}

const mapStateToProps = (state) => {
  const user = state.usersData;
  return{
    user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
