import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { startRemoveStdExp, startEditStdExp } from '../actions/dataActions';
import { checkWhen } from '../helper-functions/checkWhen';

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
    const { stdExpMoney, term } = this.props.stdExp;
    const when = checkWhen(term,true);
    return(
      <div>
        <div className="list list--sm list--center list--margin-top list--small-padding-bot">
          <div className="list__item">
            <h4 className="list__item--title list__item--title-details"><em>{this.props.stdExp.stdExpTitle}</em></h4>
            <div className="list__item--descr">
              <p className="list__item--black">Cash:
                <span className="list__item--cash">
                  &nbsp;{numeral(this.props.stdExp.stdExpMoney).format('0,00.00')}
                </span>
                <span className="unit-list"> pln</span>
              </p>
                <p className="list__item--black">
                  {term}. każdego miesiąca <br/><span className={`list__item--${when.deadlineClassModifier}`}>{when.time}</span>
                </p>
            </div>
            <button onClick={this.handleRemoving} className="btn btn--red-const btn--top-right-detail-v">Delete</button>
          </div>
        </div>
        <div className="wrapper-form wrapper-form--item-size">
          <div className="wrapper-helper">
            <StdExpForm stdExp={this.props.stdExp} addOneStdExpense={this.editStdExp}/>
          </div>
        </div>
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
