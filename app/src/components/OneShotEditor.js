import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startRemoveOneShot, startEditOneShot } from '../actions/dataActions';

import OneShotForm from './OneShotForm';

class OneShotEditor extends Component {
  constructor(props){
    super(props);
    this.editOneShot = this.editOneShot.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
  }

  handleRemoving(){
    this.props.startRemoveOneShot(this.props.oneShot.oneShotId);
    this.props.history.push('/app');
  }
  editOneShot(oneShot){
    this.props.startEditOneShot(oneShot, this.props.oneShot.oneShotId);
    this.props.history.push('/app');
  }

  render(){
    console.log('one shot editor props', this.props);
    return(
      <div>
        <h3>{this.props.oneShot.oneShotTitle}</h3>
        <p>Cash: {this.props.oneShot.oneShotMoney}</p>
        <p>Deadline: {this.props.oneShot.deadline}</p>
        <OneShotForm oneShot={this.props.oneShot} addOneShot={this.editOneShot}/>
        <button onClick={this.handleRemoving}>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const oneShot = state.usersData.oneShots.find(oneShot => oneShot.oneShotId === props.match.params.id);
  return {
    oneShot
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    startRemoveOneShot: oneShotId=>dispatch(startRemoveOneShot(oneShotId)),
    startEditOneShot: (oneShot, oneShotId)=>dispatch(startEditOneShot(oneShot, oneShotId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneShotEditor);
