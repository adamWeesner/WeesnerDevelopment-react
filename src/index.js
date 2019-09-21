import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#5fa463',
            main: '#388e3c',
            dark: '#27632a',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#fff',
        },
    },
    typography: {
        useNextVariants: true,
      },
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
