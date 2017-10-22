import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='landing-container '>
      <div>
      <h1>404! = nie znaleziono strony!</h1>
       <Link to="/" className="button button--login">Wróć</Link>
       </div>
  </div>
);

export default NotFound;
