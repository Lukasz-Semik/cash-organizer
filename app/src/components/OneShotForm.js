import React, { Component } from 'react';

class OneShotForm extends Component{
  constructor(props){
    super(props);

    this.state={
      oneShotTitle: ''
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  onChangeTitle(event){
    const oneShotTitle = event.target.value;
    this.setState(()=>({oneShotTitle}));
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
          <input type="text" name="oneShotTitle" onChange={this.onChangeTitle}/>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default OneShotForm;
