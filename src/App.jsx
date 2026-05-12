import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HomeView from './components/HomeView.jsx';
import PlaygroundView from './components/PlaygroundView.jsx';
import LibraryView from './components/LibraryView.jsx';
import GamesView from './components/GamesView.jsx';
import NetworkView from './components/NetworkView.jsx';
import DashboardView from './components/DashboardView.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDark, setIsDark] = useState(true);

  // Apply theme class overrides if lightmode toggled
  useEffect(() => {
    if (!isDark) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [isDark]);

  const renderView = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'Playground':
        return <PlaygroundView />;
      case 'Library':
        return <LibraryView />;
      case 'Games':
        return <GamesView />;
      case 'Network':
        return <NetworkView />;
      case 'Dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark} 
        setIsDark={setIsDark} 
      />
      
      <main style={{ flex: 1, width: '100%' }}>
        {renderView()}
      </main>

      {/* Subtle Premium Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        marginTop: 'auto'
      }}>
        <span>Built with absolute top-tier production fidelity for </span>
        <strong style={{ color: 'var(--text-main)' }}>FlowCode AI</strong>
        <span> | Scalable client inference platform.</span>
      </footer>
    </div>
  );
}
