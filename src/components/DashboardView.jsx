import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Activity, Terminal, Sparkles, FolderGit2, ShieldCheck, Flame } from 'lucide-react';

export default function DashboardView({ setActiveTab }) {
  const [stats, setStats] = useState({
    prompts: 12,
    score: 0,
    scriptsSaved: 5,
    streak: 3
  });

  // Dynamically update dashboard summaries whenever active data loads
  useEffect(() => {
    const liveScore = localStorage.getItem('flowcode_game_score');
    const genInput = localStorage.getItem('flowcode_input_Generate Code');
    
    setStats(prev => ({
      ...prev,
      score: liveScore ? parseInt(liveScore, 10) : prev.score,
      prompts: genInput ? 13 : prev.prompts
    }));
  }, []);

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      {/* Title block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '2.2rem', marginBottom: '4px' }}>
            Developer <span className="text-gradient">Dashboard</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Monitor real-time workspace compilation counters and accumulated learning parameters.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>
            <Flame size={16} />
            <span>{stats.streak} Day Streak Active</span>
          </span>
        </div>
      </div>

      {/* Metrics Row Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total Translations</span>
            <Terminal size={18} style={{ color: 'var(--secondary)' }} />
          </div>
          <strong style={{ fontSize: '2rem', color: 'var(--text-main)', fontFamily: 'JetBrains Mono, monospace' }}>
            {stats.prompts}
          </strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>↑ 24% increase this week</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Games Accumulator</span>
            <Sparkles size={18} style={{ color: 'var(--primary)' }} />
          </div>
          <strong style={{ fontSize: '2rem', color: 'var(--text-main)', fontFamily: 'JetBrains Mono, monospace' }}>
            {stats.score} <span style={{ fontSize: '1rem', color: 'var(--primary)' }}>pts</span>
          </strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified constraints validation</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Saved Snippets</span>
            <FolderGit2 size={18} style={{ color: '#10b981' }} />
          </div>
          <strong style={{ fontSize: '2rem', color: 'var(--text-main)', fontFamily: 'JetBrains Mono, monospace' }}>
            {stats.scriptsSaved}
          </strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cached workspace objects</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>System Status</span>
            <ShieldCheck size={18} style={{ color: 'var(--success)' }} />
          </div>
          <strong style={{ fontSize: '1.4rem', color: 'var(--success)', marginTop: '4px' }}>
            Optimal
          </strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>0 latency tokens setup</span>
        </div>
      </div>

      {/* Embedded Activity Tracking Timeline Mockup */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} style={{ color: 'var(--primary)' }} />
            <span>Recent Translation Logs</span>
          </h3>
          <button 
            onClick={() => setActiveTab('Playground')}
            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
          >
            Open Console →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { tag: 'Translate', query: 'Check if input array contains any duplicate items', outcome: 'O(N) Set validation', time: '12 mins ago', success: true },
            { tag: 'Explain', query: 'def recursive_fibonacci(n)...', outcome: 'Deconstruction mapping done', time: '2 hours ago', success: true },
            { tag: 'Debug', query: 'def add_numbers(a, b): return a - b', outcome: 'Patched operator logic', time: '1 day ago', success: true }
          ].map((log, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--bg-base)',
              borderRadius: '8px',
              borderLeft: `3px solid ${log.tag === 'Translate' ? 'var(--secondary)' : log.tag === 'Explain' ? 'var(--primary)' : '#10b981'}`
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-main)' }}>
                    {log.tag}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{log.time}</span>
                </div>
                <p className="font-code" style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0 }}>
                  {log.query}
                </p>
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>
                ✓ {log.outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
