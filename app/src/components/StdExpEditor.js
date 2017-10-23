import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';

import { firebaseApp } from '../../firebase';
import { startRemoveStdExp, startEditStdExp } from '../actions/dataActions';
import { checkWhen } from '../helper-functions/checkWhen';

import StdExpForm from './StdExpForm';

class StdExpEditor extends Component {
  constructor(props){
    super(props);

    this.editStdExp = this.editStdExp.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.resetStatus = this.resetStatus.bind(this);
    this.state = {
      lastPayment: this.props.stdExp.lastPayment
    }
  }
  componentDidMount(){
    if(!firebaseApp.auth().currentUser){
      this.props.history.push('/login');
    }
  }
  handleRemoving(){
    this.props.startRemoveStdExp(this.props.stdExp.stdExpId);
    this.props.history.push('/app');
  }
  editStdExp(stdExp){
    this.props.startEditStdExp(stdExp, this.props.stdExp.stdExpId)
    this.props.history.push('/app');
  }
  changeStatus(){
    this.setState(prevState=>({
      lastPayment: moment().format('LL')
    }));
  }
  resetStatus(){
    this.setState(()=>({
      lastPayment: 'Nigdy'
    }));
  }
  render(){
    const { stdExpMoney, term } = this.props.stdExp;
    const when = checkWhen(term,true);
    return(
      <div>
        <div className="list list--sm list--center list--margin-top list--small-padding-bot">
          <div className="list__item">
            <h4 className="list__item--title list__item--title-details"><em>{this.props.stdExp.stdExpTitle}</em></h4>
            <div className="list__item--descr">
              <p className="list__item--black">Koszt:
                <span className="list__item--cash">
                  &nbsp;{numeral(this.props.stdExp.stdExpMoney).format('0,00.00')}
                </span>
                <span className="unit-list"> pln</span>
              </p>
                <p className="list__item--black">
                  {term}. każdego miesiąca <br/><span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
                <br/><span className="list__last-payment list__last-payment--details">
                  <i>Ostatnia wpłata: {this.state.lastPayment}</i>
                </span>
                </p>
            </div>
            <button onClick={this.handleRemoving} className="btn btn--red-const btn--top-right-detail-v">Usuń</button>
              <button onClick={this.changeStatus}
                className={`btn btn--top-left-detail-v smooth-transition-std btn--small-size btn--green btn--small-scale-hover`}>
                Zaznacz wpłatę
              </button>
              <button onClick={this.resetStatus}
                className={`btn btn--top-left-detail-v2 smooth-transition-std btn--small-size btn--red`}>
                Reset
              </button>
          </div>
        </div>
        <div className="wrapper-form">
          <div className="wrapper-helper">
            <StdExpForm lastPayment={this.state.lastPayment} duringEdition={true}
              stdExp={this.props.stdExp} addOneStdExpense={this.editStdExp}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const stdExp = !!state.usersData.stdExpenses ? state.usersData.stdExpenses.find(stdExp => stdExp.stdExpId === props.match.params.id) : '';
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
