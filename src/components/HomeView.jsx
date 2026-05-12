import React from 'react';
import { ArrowRight, Sparkles, Code, GitBranch } from 'lucide-react';

export default function HomeView({ setActiveTab }) {
  return (
    <div className="animate-fade-in" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '32px'
    }}>
      {/* Top pill badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--bg-surface)',
        border: '1px solid rgba(6, 182, 212, 0.4)',
        padding: '6px 16px',
        borderRadius: '24px',
        color: 'var(--secondary)',
        fontWeight: 600,
        fontSize: '0.85rem',
        boxShadow: '0 0 16px var(--secondary-glow)'
      }}>
        <Sparkles size={14} />
        <span>AI-Powered Visual Logic Translator</span>
      </div>

      {/* Main Headline */}
      <h1 className="font-heading" style={{
        fontSize: '4rem',
        lineHeight: 1.15,
        maxWidth: '850px',
        color: 'var(--text-main)',
        margin: 0
      }}>
        Turn Ideas into <br />
        <span className="text-gradient" style={{ fontSize: '4.5rem' }}>Code &amp; Flowcharts</span> <br />
        Instantly
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        maxWidth: '760px',
        lineHeight: 1.6,
        margin: 0
      }}>
        Describe your programming logic in plain language. FlowCode AI generates Python code, visual flowcharts, and step-by-step explanations — designed for beginners who want to understand the <em style={{ color: 'var(--primary)', fontStyle: 'normal', fontWeight: 600 }}>why</em> behind the code.
      </p>

      {/* Call To Actions */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => setActiveTab('Playground')}
          className="btn-primary"
          style={{ fontSize: '1.1rem', padding: '16px 32px' }}
        >
          <span>Start Building</span>
          <ArrowRight size={18} />
        </button>

        <button 
          onClick={() => setActiveTab('Library')}
          className="btn-secondary"
          style={{ fontSize: '1.1rem', padding: '16px 32px' }}
        >
          <span>Explore Algorithms</span>
        </button>
      </div>

      {/* Console Preview Mockup */}
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '900px',
        marginTop: '32px',
        textAlign: 'left',
        overflow: 'hidden'
      }}>
        {/* Editor Title Bar */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Window Controls */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--danger)', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning)', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }}></span>
            </div>
            <span className="font-code" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '12px' }}>
              flowcode_ai.py
            </span>
          </div>

          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
        </div>

        {/* Editor Body */}
        <div className="font-code" style={{ padding: '24px', lineHeight: 1.6, fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>1</span>
            <span style={{ color: '#a78bfa' }}># Logic Prompt: Check if an input list contains any duplicate values</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>2</span>
            <span style={{ color: '#38bdf8' }}>def</span> <span style={{ color: '#f43f5e' }}>has_duplicates</span>(arr):
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>3</span>
            <span style={{ color: 'var(--text-main)', paddingLeft: '24px' }}>seen = <span style={{ color: '#38bdf8' }}>set</span>()</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>4</span>
            <span style={{ color: '#38bdf8', paddingLeft: '24px' }}>for</span> <span style={{ color: 'var(--text-main)' }}>item</span> <span style={{ color: '#38bdf8' }}>in</span> <span style={{ color: 'var(--text-main)' }}>arr:</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>5</span>
            <span style={{ color: '#38bdf8', paddingLeft: '48px' }}>if</span> <span style={{ color: 'var(--text-main)' }}>item</span> <span style={{ color: '#38bdf8' }}>in</span> <span style={{ color: 'var(--text-main)' }}>seen:</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>6</span>
            <span style={{ color: '#38bdf8', paddingLeft: '72px' }}>return</span> <span style={{ color: '#10b981' }}>True</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>7</span>
            <span style={{ color: 'var(--text-main)', paddingLeft: '48px' }}>seen.add(item)</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ userSelect: 'none', opacity: 0.5 }}>8</span>
            <span style={{ color: '#38bdf8', paddingLeft: '24px' }}>return</span> <span style={{ color: '#10b981' }}>False</span>
          </div>
        </div>

        {/* Generated Outcome Banner */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          borderTop: '1px solid var(--border-color)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          <span style={{ background: 'var(--primary)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
            SUCCESS
          </span>
          <span>Time Complexity: <strong style={{ color: 'var(--secondary)' }}>O(N)</strong> | Auxiliary Space: <strong style={{ color: 'var(--secondary)' }}>O(N)</strong></span>
        </div>
      </div>

      {/* Feature grid cards below */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1200px',
        marginTop: '32px',
        textAlign: 'left'
      }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '16px' }}><Code size={28} /></div>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Plain Natural Language</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Type your ideas fluidly. Our parsing layer automatically formats abstract algorithms into structured logic models.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--secondary)', marginBottom: '16px' }}><GitBranch size={28} /></div>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Visual Explanations</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Each script is coupled with intuitive breakdown logs clarifying loops, invariants, and edge cases clearly.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ color: '#10b981', marginBottom: '16px' }}><Sparkles size={28} /></div>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Interactive Debugging</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Paste broken snippets to instantly spotlight error paths, variable mutations, and trace memory corrections.
          </p>
        </div>
      </div>
    </div>
  );
}
