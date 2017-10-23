import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startAddOneShot} from '../actions/dataActions';
import { firebaseApp } from '../../firebase';

import OneShotForm from './OneShotForm';

class OneShotCreator extends Component {
  constructor(props){
    super(props);
    this.addOneShot = this.addOneShot.bind(this);
  }
  componentDidMount(){
    if(!firebaseApp.auth().currentUser){
      this.props.history.push('/login');
    }
  }
  addOneShot(oneShot){
    this.props.startAddOneShot(oneShot);
    this.props.history.push('/app');
  }
  render(){
    return(
      <div className="wrapper-form">
        <OneShotForm addOneShot={this.addOneShot}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startAddOneShot: (oneShot)=>dispatch(startAddOneShot(oneShot))
  }
}
export default connect(null, mapDispatchToProps)(OneShotCreator);
