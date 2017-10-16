import React, { Component } from 'react';
import { connect } from 'react-redux';

import StdExp from './StdExp';

class StdExpList extends Component{
  generateStdExpensesList(){
    if(!this.props.stdExpenses || this.props.stdExpenses === 'empty'){
      return(<div className="list__empty-msg"><i>Add item to start</i></div>)
    }else{
      return(
        <div>
          {this.props.stdExpenses.map((stdExp, i)=>{
            return(<StdExp key={stdExp.stdExpId} stdExp={stdExp} />);
          })}
        </div>
      );
    }
  }
  render(){
    //console.log('std exp list props', this.props);
    return(
      <div>
        <h4 className="list__title">Standard Expenses</h4>
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
