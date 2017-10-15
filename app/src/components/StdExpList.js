import React, { Component } from 'react';
import { connect } from 'react-redux';

import StdExp from './StdExp';

class StdExpList extends Component{
  generateStdExpensesList(){
    if(!this.props.stdExpenses || this.props.stdExpenses === 'empty'){
      return(<div>Empty</div>)
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
        <h4>std expenses list</h4>
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
