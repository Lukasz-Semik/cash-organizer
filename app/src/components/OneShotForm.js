import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class OneShotForm extends Component{
  constructor(props){
    super(props);
    this.state={
      oneShotTitle: this.props.oneShot ? this.props.oneShot.oneShotTitle : '',
      oneShotMoney: this.props.oneShot ? this.props.oneShot.oneShotMoney : '',
      deadline: this.props.oneShot ? this.props.oneShot.deadline : ''
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  onChangeTitle(event){
    const oneShotTitle = event.target.value.trim();
    this.setState(()=>({oneShotTitle}));
  }
  onChangeMoney(event){
    const oneShotMoney = event.target.value;
    if(!oneShotMoney || oneShotMoney.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({oneShotMoney}))
    }
  }
  handleDateChange(date){
    this.setState(()=>({deadline: date.format('LL')}))
  }
  handleOnSubmit(event){
    event.preventDefault();
    if(this.state.deadline !== ''){
      this.props.addOneShot({...this.state, done: false});
    }else{
        this.props.addOneShot({
          ...this.state,
          done: false,
          deadline: moment().format('LL')
        })
    }
  }
  render(){
    console.log('one shot form state', this.state);
    return(
      <div>
        <p>One Shot form</p>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="oneShotTitle" value={this.state.oneShotTitle}
            onChange={this.onChangeTitle} placeholder="One Shot"/>
          <input type="text" name="oneShotMoney" value={this.state.oneShotMoney}
            onChange={this.onChangeMoney} placeholder="Cash"/>
          <DatePicker selected={moment()} onChange={this.handleDateChange}/>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default OneShotForm;
