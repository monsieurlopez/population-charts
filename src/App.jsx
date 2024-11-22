import React from 'react';
import Header from './assets/Header';
import Main from './assets/Main';
import Footer from './assets/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <React.StrictMode>
      <Header/>
      <Main/>
      <Footer/>
    </React.StrictMode>
  )
}

export default App
