import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startRemoveOneShot } from '../actions/dataActions';

import OneShotForm from './OneShotForm';

class OneShotEditor extends Component {

  handleRemoving(){
    this.props.startRemoveOneShot(this.props.oneShot.oneShotId);
    this.props.history.push('/app');
  }

  render(){
    console.log('one shot editor props', this.props);
    return(
      <div>
        <h3>{this.props.oneShot.oneShotTitle}</h3>
        <p>Cash: {this.props.oneShot.oneShotMoney}</p>
        <p>Deadline: {this.props.oneShot.deadline}</p>
        <OneShotForm />
        <button onClick={this.handleRemoving.bind(this)}>Delete</button>
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
    startRemoveOneShot: oneShotId=>dispatch(startRemoveOneShot(oneShotId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneShotEditor);
