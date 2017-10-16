import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';

import OneShot from './OneShot';

class OneShotsList extends Component {

  generateOneShotList(){
    if(!this.props.oneShots || this.props.oneShots === 'empty'){
      return(<div className="list__empty-msg"><i>Add item to start</i></div>)
    }else{
      return(
        <div>
          {this.props.oneShots.map((oneShot, i)=>{
            return(<OneShot key={oneShot.oneShotId} oneShot={oneShot} />);
          })}
        </div>
      );
    }
  }
  render(){
    return(
      <div>
        <h4 className="list__title">One Shots</h4>
        <div className="list__separator"></div>
        {this.generateOneShotList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const oneShots = state.usersData.oneShots;
  return {
    oneShots
  }
}
export default connect(mapStateToProps)(OneShotsList);
