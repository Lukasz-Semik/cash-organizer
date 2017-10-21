import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startAddStdExp} from '../actions/dataActions';
import { firebaseApp } from '../../firebase';

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
    this.props.history.push('/app');
  }
  render(){
    return(
      <div>
        <div className="wrapper-form wrapper-form--item-size">
          <StdExpForm addOneStdExpense={this.addOneStdExp}/>
        </div>
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
