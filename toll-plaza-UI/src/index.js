import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from 'react-dom';

import signup from './pages/signup';
import signin from './pages/signin';
import dashboard from './pages/dashboard';

const Root = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={signin} />
        <Route path="/signup" component={signup} />
        <Route path="/dashboard" component={dashboard} />

      </div>
    </Router>
  )
}

render(<Root />, document.querySelector('#root'));