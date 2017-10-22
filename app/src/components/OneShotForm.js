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
      deadline: this.props.oneShot ? moment(this.props.oneShot.deadline) : moment(),
      done: this.props.oneShot ? this.props.oneShot.done : false,
      error: ''
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  onChangeTitle(event){
    const oneShotTitle = event.target.value;
    this.setState(()=>({oneShotTitle, error: ''}));
  }
  onChangeMoney(event){
    const oneShotMoney = event.target.value;
    if(!oneShotMoney || oneShotMoney.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({oneShotMoney, error: ''}))
    }
  }
  handleDateChange(date){
    this.setState(()=>({deadline: date}))
  }
  handleOnSubmit(event){
    event.preventDefault();
    const { oneShotTitle, oneShotMoney, deadline } = this.state;
    if(oneShotMoney === ''){
      this.setState(()=>({error: 'Pole koszt jest puste...'}))
    }else if(oneShotTitle.length < 3){
      this.setState(()=>({error: 'Tytul musi mieć conajmniej 3 znaki'}))
    }else{
      //if one shot is during edition, take data from props.
      const done = this.props.duringEdition ? this.props.done : this.state.done
      this.props.addOneShot({
        oneShotTitle,
        oneShotMoney,
        deadline: this.state.deadline.locale('en').format('LL'),
        done
      });
    }
  }
  render(){
    return(
        <div className="wrapper-helper">
          <h4 className="form__title">{this.props.oneShot ? 'Edytuj' : 'Stwórz'} Jednorazowy Wydatek</h4>
          <form onSubmit={this.handleOnSubmit} className="form">
            <div className="wrapper-helper">
              <input type="text" name="oneShotTitle" value={this.state.oneShotTitle}
                onChange={this.onChangeTitle} placeholder="Tytuł" className="form__input"/>
              <span className="form-msg form-msg--hints">{this.props.oneShot ? 'Tytuł' : ''}</span>
            </div>
            <div className="wrapper-helper">
              <input type="text" name="oneShotMoney" value={this.state.oneShotMoney}
                onChange={this.onChangeMoney} placeholder="Koszt" className="form__input"/>
              <span className="form-msg form-msg--hints">{this.props.oneShot ? 'Koszt' : ''}</span>
            </div>
            <div className="form__date-picker">
              <DatePicker selected={this.state.deadline} onChange={this.handleDateChange}
              dateFormat="LL" locale='pl' className="form__input form__input--bot-margin" />
            </div>
            <button className="btn btn--green-const btn--left-bot btn--lg">{this.props.oneShot ? 'Zapisz' : 'Dodaj'}</button>
          </form>
          <Link to="/app" className="btn btn--orange-const btn--right-bot btn--lg">Wróć</Link>
          <p className="form-msg">{!!this.state.error ? this.state.error : ''}</p>
        </div>

    );
  }
}

export default OneShotForm;
