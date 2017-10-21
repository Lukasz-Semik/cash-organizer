import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';

import { firebaseApp } from '../../firebase';
import { startRemoveOneShot, startEditOneShot } from '../actions/dataActions';
import { checkWhen } from '../helper-functions/checkWhen';

import OneShotForm from './OneShotForm';

class OneShotEditor extends Component {
  constructor(props){
    super(props);

    this.state = {
      done: this.props.oneShot.done
    }

    this.editOneShot = this.editOneShot.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }
  componentDidMount(){
    if(!firebaseApp.auth().currentUser){
      this.props.history.push('/login');
    }
  }
  handleRemoving(){
    this.props.startRemoveOneShot(this.props.oneShot.oneShotId);
    this.props.history.push('/app');
  }
  editOneShot(oneShot){
    this.props.startEditOneShot(oneShot, this.props.oneShot.oneShotId);
    this.props.history.push('/app');
  }
  changeStatus(){
    this.setState(prevState=>({
      done: !prevState.done
    }));
  }

  render(){
    const { oneShotMoney, deadline } = this.props.oneShot;
    const when = checkWhen(null, false, deadline);
    const deadlineClassModifier = this.state.done ? 'green' : when.deadlineClassModifier;
    const time = this.state.done ? 'Zrobione' : when.time;
    const classDoneBtnModifier = this.state.done ? 'btn--green-const' : '';
    return(
      <div>
        <div className="list list--sm list--center list--margin-top list--small-padding-bot">
          <div className="list__item">
            <h4 className="list__item--title list__item--title-details"><em>{this.props.oneShot.oneShotTitle}</em></h4>
            <div className="list__item--descr">
              <p className="list__item--black">Koszt:
                <span className="list__item--cash">
                  &nbsp;{numeral(oneShotMoney).format('0,00.00')}
                </span>
                <span className="unit-list"> pln</span>
              </p>

              <p className="list__item--black">
                {moment(deadline).locale('pl').format('LL')}
                <br/>
                <span className={`list__item--${deadlineClassModifier} smooth-transition-std`}>{time}</span>
              </p>
            </div>
            <button onClick={this.handleRemoving} className="btn btn--red-const btn--top-right-detail-v">
              Usuń
            </button>
            <button onClick={this.changeStatus}
              className={`btn ${classDoneBtnModifier} btn--top-left-detail-v smooth-transition-std`}>
              {this.state.done ? 'Zapłacone' : 'Oznacz'}
            </button>
          </div>
        </div>
        <div className="wrapper-form wrapper-form--item-size">
          <div className="wrapper-helper">
            <OneShotForm oneShot={this.props.oneShot} done={this.state.done} duringEdition={true}
              addOneShot={this.editOneShot}/>
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
