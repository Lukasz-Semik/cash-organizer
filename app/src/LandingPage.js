import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component{
  render(){
    return(
      <div className="landing-container">
        <h2 className="landing-title landing-title--orange animation animation--1">Super prosta</h2>
        <h2 className="landing-title landing-title--green animation animation--2">Kompletnie darmowa</h2>
        <h2 className="landing-title landing-title--red animation animation--3">Extra szybka</h2>
        <div className="landing-text">
          <h2 className="landing-title landing-title--orange landing-title--margin-modifier">
            Hajs się zgadza!
          </h2>
          <p>Kontroluj i planuj swoje wydatki</p>
          <p>Nie zapomnij o rachunkach</p>
          <p>Korzystaj z mobilnej listy zakupów</p>
          <Link to='/signup' className="button button--login button--to-sign-up">Zarejestruj się już teraz</Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
