import React, { Component } from 'react';
//import DatePicker from 'react-datepicker';
//import moment from 'moment';

class StdExpForm extends Component{
  constructor(props){
    super(props);
    this.state={
      stdExpTitle: this.props.stdExp ? this.props.stdExp.stdExpTitle : '',
      stdExpMoney: this.props.stdExp ? this.props.stdExp.stdExpMoney : '',
      term: this.props.stdExp ? this.props.stdExp.term : 1
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.onChangeTerm = this.onChangeTerm.bind(this);
    //this.handleDateChange = this.handleDateChange.bind(this);
  }
  onChangeTitle(event){
    const stdExpTitle = event.target.value;
    this.setState(()=>({stdExpTitle}));
  }
  onChangeMoney(event){
    const stdExpMoney = event.target.value;
    if(!stdExpMoney || stdExpMoney.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({stdExpMoney}))
    }
  }
  onChangeTerm(event){
    const term = event.target.value;
    if(term >= 0 && term<=28){
      this.setState(()=>({term}));
    }
  }
  handleOnSubmit(event){
    event.preventDefault();
    this.props.addOneStdExpense({...this.state});
  }
  render(){
    return(
      <div>
        <p>Std Exp form</p>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="stdExpTitle" value={this.state.stdExpTitle}
            onChange={this.onChangeTitle} placeholder="stdExpTitle"/>
          <input type="text" name="stdExpMoney" value={this.state.stdExpMoney}
            onChange={this.onChangeMoney} placeholder="Cash"/>
          <input type="number" name="term" placeholder="Last day of payment of each month"
            onChange={this.onChangeTerm} value={this.state.term}/>
          <button>{this.props.stdExp ? 'Edit' : 'Add'}</button>
        </form>
      </div>
    );
  }
}

export default StdExpForm;
