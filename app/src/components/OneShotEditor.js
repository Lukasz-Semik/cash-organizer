import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import { startRemoveOneShot, startEditOneShot } from '../actions/dataActions';
import { checkWhen } from '../helper-functions/checkWhen';

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
    const { oneShotMoney, deadline } = this.props.oneShot;
    const when = checkWhen(null, false, deadline);
    return(
      <div>
        <div className="list list--sm list--center list--margin-top list--small-padding-bot">
          <div className="list__item">
            <h4 className="list__item--title list__item--title-details"><em>{this.props.oneShot.oneShotTitle}</em></h4>
            <div className="list__item--descr">
              <p className="list__item--black">Cash:
                <span className="list__item--cash">
                  &nbsp;{numeral(oneShotMoney).format('0,00.00')}
                </span>
                <span className="unit-list"> pln</span>
              </p>

              <p className="list__item--black">
                {deadline}
                <br/>
                <span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
              </p>
            </div>
            <button onClick={this.handleRemoving} className="btn btn--red-const btn--top-right-detail-v">Delete</button>
          </div>
        </div>
        <div className="wrapper-form wrapper-form--item-size">
          <div className="wrapper-helper">
            <OneShotForm oneShot={this.props.oneShot} addOneShot={this.editOneShot}/>
          </div>
        </div>
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
