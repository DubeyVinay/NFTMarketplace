import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Web3ReactProvider} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers'

const root = ReactDOM.createRoot(document.getElementById('root'));

const getLibrary = (provider) => {
  
  const library = new Web3Provider(provider);
  // const library1 = new Web3.providers.Web3Provider(provider);

  library.pollingInterval = 12000; // frequency provider is polling
  return library;
};
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
  <React.StrictMode>
    <Router>
   
        <App />
    
    </Router> 
  </React.StrictMode>
  </Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
