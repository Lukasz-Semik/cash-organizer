import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startAddStdExp} from '../actions/dataActions';
import { firebaseApp } from '../../firebase';
import history from '../../routing/history';

import StdExpForm from './StdExpForm';

class StdExpCreator extends Component {
  constructor(props){
    super(props);
    this.addOneStdExp = this.addOneStdExp.bind(this);
  }
  componentDidMount(){
    if(!firebaseApp.auth().currentUser){
      this.props.history.push('/login');
    }
  }
  addOneStdExp(stdExp){
    this.props.startAddStdExp(stdExp);
    history.push('/app');
  }
  render(){
    return(
      <div>
        <h4>Stadard Expenses Creator</h4>
        <StdExpForm addOneStdExpense={this.addOneStdExp}/>
        <Link to="/app">Back</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startAddStdExp: (stdExp)=>dispatch(startAddStdExp(stdExp))
  }
}
export default connect(null, mapDispatchToProps)(StdExpCreator);
