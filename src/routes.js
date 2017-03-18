import React from 'react';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';

import App from './App.js';

export default function(){
  return(
    <Router history={hashHistory}>
      <Route path='/' component={App} >

      </Route>
    </Router>
    )
}
