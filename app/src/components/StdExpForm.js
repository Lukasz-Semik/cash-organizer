import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StdExpForm extends Component{
  constructor(props){
    super(props);
    this.state={
      stdExpTitle: this.props.stdExp ? this.props.stdExp.stdExpTitle : '',
      stdExpMoney: this.props.stdExp ? this.props.stdExp.stdExpMoney : '',
      term: this.props.stdExp ? this.props.stdExp.term : '',
      lastPayment: this.props.stdExp ? this.props.stdExp.lastPayment : 'Nigdy',
      error: ''
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.onChangeTerm = this.onChangeTerm.bind(this);
  }
  onChangeTitle(event){
    const stdExpTitle = event.target.value;
    this.setState(()=>({stdExpTitle, error: ''}));
  }
  onChangeMoney(event){
    const stdExpMoney = event.target.value;
    if(!stdExpMoney || stdExpMoney.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({stdExpMoney, error: ''}))
    }
  }
  onChangeTerm(event){
    const term = event.target.value;
    this.setState(()=>({term, error: ''}));
  }
  handleOnSubmit(event){
    event.preventDefault();
    const { stdExpTitle, stdExpMoney, term } = this.state;
    if(stdExpTitle.length < 3){
      this.setState(()=>({error: 'Tytul musi mieć conajmiej 3 znaki'}))
    }else if(stdExpMoney === ''){
      this.setState(()=>({error: 'Pole koszt jest puste...'}))
    }else if(term<1 || term>28 || term ===''){
      this.setState(()=>({error: 'Pole data jest pusta lub nieprawidłowa. Nie każdy miesiąc ma więcej niż 28 dni.'}))
    }else{
      const lastPayment = this.props.duringEdition ? this.props.lastPayment : this.state.lastPayment
      this.props.addOneStdExpense({
        stdExpTitle,
        stdExpMoney,
        term,
        lastPayment
      });
    }
  }
  render(){
    return(
      <div className="wrapper-helper">
        <h4 className="form__title">{this.props.stdExp ? 'Edytuj' : 'Stwórz'} Wydatek Stały</h4>
        <form onSubmit={this.handleOnSubmit} className="form">
          <div className="wrapper-helper">
            <input type="text" name="stdExpTitle" value={this.state.stdExpTitle} className="form__input"
              onChange={this.onChangeTitle} placeholder="Tytul"/>
            <span className="form-msg form-msg--hints">{this.props.stdExp ? 'Tytul' : ''}</span>
          </div>
          <div className="wrapper-helper">
            <input type="text" name="stdExpMoney" value={this.state.stdExpMoney} className="form__input"
              onChange={this.onChangeMoney} placeholder="Koszt"/>
            <span className="form-msg form-msg--hints">{this.props.stdExp ? 'Koszt' : ''}</span>
          </div>
          <div className="wrapper-helper">
            <input type="number" name="term" placeholder="Ostatni dzień płatności"
              className="form__input"
              onChange={this.onChangeTerm} value={this.state.term}/>
            <span className="form-msg form-msg--hints">{this.props.stdExp ? 'Ostatni Dzień' : ''}</span>
          </div>
          <button className="btn btn--green-const btn--left-bot-v2 btn--lg">{this.props.stdExp ? 'Zapisz' : 'Dodaj'}</button>
        </form>
        <Link to="/app" className="btn btn--orange-const btn--right-bot-v2 btn--lg">Wróć</Link>
        <p className="form-msg form-msg--pull-down-more">{!!this.state.error ? this.state.error : ''}</p>
      </div>
    );
  }
}

export default StdExpForm;
