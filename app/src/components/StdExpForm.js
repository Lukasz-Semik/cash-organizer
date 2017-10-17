import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StdExpForm extends Component{
  constructor(props){
    super(props);
    this.state={
      stdExpTitle: this.props.stdExp ? this.props.stdExp.stdExpTitle : '',
      stdExpMoney: this.props.stdExp ? this.props.stdExp.stdExpMoney : '',
      term: this.props.stdExp ? this.props.stdExp.term : ''
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
      <div className="wrapper-helper">
        <h4 className="form__title">{this.props.oneShot ? 'Edit' : 'Create'} Standard Expense</h4>
        <form onSubmit={this.handleOnSubmit} className="form">
          <input type="text" name="stdExpTitle" value={this.state.stdExpTitle} className="form__input form__input--item-size"
            onChange={this.onChangeTitle} placeholder="stdExpTitle"/>
          <input type="text" name="stdExpMoney" value={this.state.stdExpMoney} className="form__input form__input--item-size"
            onChange={this.onChangeMoney} placeholder="Cash"/>
          <input type="number" name="term" placeholder="Last day of payment of each month"
            className="form__input form__input--item-size"
            onChange={this.onChangeTerm} value={this.state.term}/>
          <button className="btn btn--green-const btn--left-bot-v2 btn--lg">{this.props.stdExp ? 'Edit' : 'Add'}</button>
        </form>
        <Link to="/app" className="btn btn--orange-const btn--right-bot-v2 btn--lg">Back</Link>
      </div>
    );
  }
}

export default StdExpForm;
