import React, { Component } from 'react';
import { connect } from 'react-redux';

import StdExp from './StdExp';

class StdExpList extends Component{
  constructor(props){
    super(props);
    this.state = {
      listIsVisible: this.props.listIsVisible
    }
    this.showHide = this.showHide.bind(this);
  }
  showHide(){
    this.setState(prevState => ({
      listIsVisible: !prevState.listIsVisible
    }))
  }
  generateStdExpensesList(){
    if(!this.props.stdExpenses){
      return(<div className="list__empty-msg"><i>Lista wydatków stałych jest pusta</i></div>)
    }else{
      let classModifier = '';
      if(!this.state.listIsVisible){
        classModifier = 'list-hiding-div--is-hiding'
      }
      return(
        <div>
          {this.props.stdExpenses.map((stdExp, i)=>{
            return(<StdExp key={stdExp.stdExpId} stdExp={stdExp} classModifier={classModifier}/>);
          })}
        </div>
      );
    }
  }
  render(){
    let showHideBtnModifier = '';
    if(!this.props.stdExpenses || (this.props.stdExpenses.length === 0)){
      showHideBtnModifier = 'list-btn-hidden';
    }
    if(this.props.stdExpenses && (this.props.stdExpenses.length > 0 && !this.state.listIsVisible)){
      showHideBtnModifier = 'list-items-hidden';
    }
    return(
      <div>
        <span className={`list__add-item list__add-item--left ${showHideBtnModifier}`}
          onClick={this.showHide}>
          <b>&darr;</b>
        </span>
        <h4 className="list__title">Wydatki Stałe</h4>
        <div className="list__separator"></div>
        {this.generateStdExpensesList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stdExpenses = state.usersData.stdExpenses;
  return { stdExpenses };
}
export default connect(mapStateToProps)(StdExpList);
