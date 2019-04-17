import React from 'react';
import ReactDOM from 'react-dom';

import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';

import './index.scss';

const App = () => (
  <div>
    <Nav />
    <Main />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
