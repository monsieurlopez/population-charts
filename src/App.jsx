import React, { useState } from 'react';
import Header from './assets/Header';
import Main from './assets/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

  const handleToggleLeftPanel = () => {
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
