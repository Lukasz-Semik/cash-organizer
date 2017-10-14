import React, { Component } from 'react';

class OneShotForm extends Component{
  constructor(props){
    super(props);

    this.state={
      oneShotTitle: '',
      oneShotMoney: ''
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
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
  handleOnSubmit(event){
    event.preventDefault();
    this.props.addOneShot({...this.state});
  }
  render(){
    return(
      <div>
        <p>One Shot form</p>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="oneShotTitle" value={this.state.oneShotTitle}
            onChange={this.onChangeTitle} placeholder="One Shot"/>
          <input type="text" name="oneShotMoney" value={this.state.oneShotMoney}
            onChange={this.onChangeMoney} placeholder="Cash"/>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default OneShotForm;
