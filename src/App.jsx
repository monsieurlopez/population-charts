import React, { useState, useEffect } from 'react';
import Header from './assets/Header';
import Main from './assets/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1400);
  const [focusSearchIcon, setFocusSearchIcon] = useState(false);
  const [hasClickedSearchIcon, setHasClickedSearchIcon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1400);
    };

    // Detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Si el panel derecho está abierto, desactivamos la animación
    if (showRightPanel) {
      setFocusSearchIcon(false);
    } else if (hasClickedSearchIcon || !isSmallScreen || showLeftPanel) {
      // Si se hizo clic o si el panel izquierdo está abierto, desactivamos la animación
      setFocusSearchIcon(false);
    } else {
      // Si la pantalla es pequeña y el panel izquierdo está cerrado, activamos la animación
      setFocusSearchIcon(true);
    }
  }, [showLeftPanel, showRightPanel, isSmallScreen, hasClickedSearchIcon]);

  const handleToggleLeftPanel = () => {
    if (!hasClickedSearchIcon) {
      setHasClickedSearchIcon(true);
    }
    setShowLeftPanel(!showLeftPanel);
  };

  const handleToggleRightPanel = () => {
    setShowRightPanel(!showRightPanel);
  };

  return (
    <React.StrictMode>
      {/* Header */}
      <Header
        onToggleLeftPanel={handleToggleLeftPanel}
        onToggleRightPanel={handleToggleRightPanel}
        showLeftPanel={showLeftPanel}
        showRightPanel={showRightPanel}
        focusSearchIcon={focusSearchIcon}
      />
      {/* Main recibe el control de los paneles */}
      <Main
        showLeftPanel={showLeftPanel}
        showRightPanel={showRightPanel}
        onToggleLeftPanel={handleToggleLeftPanel}
        onToggleRightPanel={handleToggleRightPanel}
      />
    </React.StrictMode>
  );
}

export default App;
