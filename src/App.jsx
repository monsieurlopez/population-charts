//import React, { } from 'react';
import { createRoot } from 'react-dom/client'
import Header from './assets/pages/Header';
import Main from './assets/pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <>
      {/* Header */}
      <Header/>
      {/* Main */}
      <Main/>
    </>
  );
}

// Renderiza la aplicación directamente desde App.jsx
createRoot(document.getElementById('root')).render(<App />);

export default App;
