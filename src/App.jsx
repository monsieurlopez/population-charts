import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './assets/pages/Header.jsx';
import { Main } from './assets/pages/Main.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
//* Estilos Primereact Component *//
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

export default function App() {
  const [view, setView] = useState('table');

  const handleToggleChange = (value) => {
    setView(value === '1' ? 'table' : 'chart');
  };

  return (
    <>
      {/* Header */}
      <Header onToggleChange={handleToggleChange} />
      {/* Main */}
      <Main view={view} />
    </>
  );
}

// Renderiza la aplicación directamente desde App.jsx
createRoot(document.getElementById('root')).render(<App />);
