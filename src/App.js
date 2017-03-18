import React from 'react';
import Header from './component/Header.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render () {
    return(
      <MuiThemeProvider>
        <Header />
      </MuiThemeProvider>
    )
  }
}

export default App;
