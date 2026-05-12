import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isDark, setIsDark }) {
  const tabs = ['Home', 'Playground', 'Library', 'Games', 'Network', 'Dashboard'];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: isDark ? 'rgba(11, 15, 25, 0.8)' : 'rgba(248, 250, 252, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('Home')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          cursor: 'pointer' 
        }}
      >
        <div style={{
          background: 'var(--primary)',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: '8px',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 2px 8px var(--primary-glow)'
        }}>
          &lt;/&gt;
        </div>
        <span className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
          FlowCode <span className="text-gradient">AI</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: isActive ? 'var(--bg-surface)' : 'transparent',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                border: `1px solid ${isActive ? 'var(--border-hover)' : 'transparent'}`,
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-main)',
          padding: '8px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}
