import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRemoveStdExp, startEditStdExp } from '../actions/dataActions';

import StdExpForm from './StdExpForm';

class StdExpEditor extends Component {
  constructor(props){
    super(props);

    this.editStdExp = this.editStdExp.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
  }

  handleRemoving(){
    this.props.startRemoveStdExp(this.props.stdExp.stdExpId);
    this.props.history.push('/app');
  }
  editStdExp(stdExp){
    this.props.startEditStdExp(stdExp, this.props.stdExp.stdExpId)
    this.props.history.push('/app');
  }

  render(){

    return(
      <div>
        <h3>{this.props.stdExp.stdExpTitle}</h3>
        <p>Cash: {this.props.stdExp.stdExpMoney}</p>
        <p>Deadline: {this.props.stdExp.term} of each month</p>
        <StdExpForm stdExp={this.props.stdExp} addOneStdExpense={this.editStdExp}/>
        <button onClick={this.handleRemoving}>Delete</button>
        <Link to="/app">Back</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const stdExp = state.usersData.stdExpenses.find(stdExp => stdExp.stdExpId === props.match.params.id);
  return {
    stdExp
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    startRemoveStdExp: oneShotId=>dispatch(startRemoveStdExp(oneShotId)),
    startEditStdExp: (stdExp, stdExpId)=>dispatch(startEditStdExp(stdExp, stdExpId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StdExpEditor);
