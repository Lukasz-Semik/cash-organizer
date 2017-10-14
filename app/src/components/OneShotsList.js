import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';

import OneShot from './OneShot';

class OneShotsList extends Component {

  generateOneShotList(){
    if(!this.props.oneShots || this.props.oneShots === 'empty'){
      return(<div>Empty</div>)
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
        <h4>One Shots List</h4>
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
