import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import Header from './Components/User Interface/Header';
import theme from './Components/User Interface/Theme';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Hello!
    </ThemeProvider>
  ); 
}

export default App;
