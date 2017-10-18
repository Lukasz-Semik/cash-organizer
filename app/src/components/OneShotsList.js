import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';

import OneShot from './OneShot';

class OneShotsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      listIsVisible: true
    }
    this.showHide = this.showHide.bind(this);
  }
  showHide(){
    this.setState(prevState => ({
      listIsVisible: !prevState.listIsVisible
    }))
  }
  generateOneShotList(){
    if(!this.props.oneShots){
      return(<div className="list__empty-msg"><i>Add item to start</i></div>)
    }else{
      let classModifier = '';
      if(!this.state.listIsVisible){
        classModifier = 'list-hiding-div--is-hiding'
      }
      return(
        <div>
          {this.props.oneShots.map((oneShot, i)=>{
            return(<OneShot key={oneShot.oneShotId} oneShot={oneShot} classModifier={classModifier}/>);
          })}
        </div>
      );
    }
  }
  render(){
    let showHideBtnModifier = '';
    if(!this.props.oneShots || (this.props.oneShots.length === 0)){
      showHideBtnModifier = 'list-btn-hidden';
    }
    if(this.props.oneShots && (this.props.oneShots.length > 0 && !this.state.listIsVisible)){
      showHideBtnModifier = 'list-items-hidden';
    }
    return(
      <div>
        <span className={`list__add-item list__add-item--left ${showHideBtnModifier}`}
          onClick={this.showHide}>
          <b>&darr;</b>
        </span>
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
