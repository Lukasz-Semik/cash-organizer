import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css/normalize.css';
import './styles/main.scss';

import Routing from './routing/Routing';

ReactDOM.render(
  <Routing />
  , document.getElementById('root')
);
