import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link } from 'react-router-dom';

class OneShotForm extends Component{
  constructor(props){
    super(props);
    this.state={
      oneShotTitle: this.props.oneShot ? this.props.oneShot.oneShotTitle : '',
      oneShotMoney: this.props.oneShot ? this.props.oneShot.oneShotMoney : '',
      deadline: this.props.oneShot ? moment(this.props.oneShot.deadline) : moment()
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  onChangeTitle(event){
    const oneShotTitle = event.target.value;
    this.setState(()=>({oneShotTitle}));
  }
  onChangeMoney(event){
    const oneShotMoney = event.target.value;
    if(!oneShotMoney || oneShotMoney.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({oneShotMoney}))
    }
  }
  handleDateChange(date){
    this.setState(()=>({deadline: date}))
  }
  handleOnSubmit(event){
    event.preventDefault();
    this.props.addOneShot({...this.state, done: false, deadline: this.state.deadline.format('LL')});
  }
  render(){
    return(
        <div className="wrapper-helper">
          <h4 className="form__title">{this.props.oneShot ? 'Edit' : 'Create'} One Shot</h4>
          <form onSubmit={this.handleOnSubmit} className="form">
            <input type="text" name="oneShotTitle" value={this.state.oneShotTitle}
              onChange={this.onChangeTitle} placeholder="One Shot" className="form__input"/>
            <input type="text" name="oneShotMoney" value={this.state.oneShotMoney}
              onChange={this.onChangeMoney} placeholder="Cash" className="form__input"/>
            <div className="form__date-picker">
              <DatePicker selected={this.state.deadline} onChange={this.handleDateChange}
              dateFormat="LL" className="form__input" />
            </div>
            <button className="btn btn--green-const btn--left-bot btn--lg">{this.props.oneShot ? 'Modify' : 'Add'}</button>
          </form>
          <Link to="/app" className="btn btn--orange-const btn--right-bot btn--lg">Back</Link>
        </div>

    );
  }
}

export default OneShotForm;
