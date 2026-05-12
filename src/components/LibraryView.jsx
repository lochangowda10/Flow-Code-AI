import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight, X, Code, Cpu } from 'lucide-react';
import { algorithms } from '../data/algorithms.js';
import { algorithmsAdvanced } from '../data/algorithmsAdvanced.js';

const algorithmsData = [...algorithms, ...algorithmsAdvanced];

export default function LibraryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All'); // 'All', 'Beginner', 'Intermediate', 'Advanced'
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [langTab, setLangTab] = useState('Python');

  // Perform dynamic reactive search checks
  const filteredAlgorithms = useMemo(() => {
    return algorithmsData.filter((algo) => {
      const matchesSearch = algo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            algo.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            algo.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || algo.difficulty === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleOpenDetail = (algo) => {
    setSelectedAlgo(algo);
    setLangTab('Python'); // Default premium code render view
  };

  const getDifficultyBadgeStyle = (diff) => {
    if (diff === 'Beginner') return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' };
    if (diff === 'Intermediate') return { color: '#a78bfa', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.3)' };
    return { color: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)' };
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      {/* Detail Overlay View if an item is focused */}
      {selectedAlgo ? (
        <div className="glass-panel animate-fade-in" style={{ overflow: 'hidden' }}>
          {/* Modal Header */}
          <div style={{
            background: 'var(--bg-surface)',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <span style={{ ...getDifficultyBadgeStyle(selectedAlgo.difficulty), padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {selectedAlgo.difficulty}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{selectedAlgo.category}</span>
              </div>
              <h2 className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: 0 }}>
                {selectedAlgo.title}
              </h2>
            </div>

            <button
              onClick={() => setSelectedAlgo(null)}
              style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body Container Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1px', background: 'var(--border-color)' }}>
            {/* Logic Steps Pane */}
            <div style={{ background: 'var(--bg-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '8px' }}>
                  Algorithm Concept
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {selectedAlgo.desc}
                </p>
              </div>

              <div>
                <h3 className="font-heading" style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '12px' }}>
                  Execution Flow
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedAlgo.steps.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>
                        {idx + 1}
                      </span>
                      <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5, marginTop: '2px' }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complexities Block */}
              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '24px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Time Complexity</span>
                  <strong className="font-code" style={{ color: 'var(--secondary)', fontSize: '1.1rem' }}>{selectedAlgo.timeComplexity}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Space Complexity</span>
                  <strong className="font-code" style={{ color: 'var(--secondary)', fontSize: '1.1rem' }}>{selectedAlgo.spaceComplexity}</strong>
                </div>
              </div>
            </div>

            {/* Code Implementation Pane */}
            <div style={{ background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
              {/* Language Switch Tabs matching screenshots */}
              <div style={{
                background: 'var(--bg-surface)',
                padding: '8px 16px',
                display: 'flex',
                gap: '8px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                {['Python', 'JavaScript', 'C++', 'Java'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLangTab(lang)}
                    style={{
                      background: langTab === lang ? 'var(--primary)' : 'transparent',
                      color: langTab === lang ? '#fff' : 'var(--text-muted)',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: langTab === lang ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Code Pre container */}
              <pre className="font-code" style={{
                padding: '24px',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                overflowX: 'auto',
                margin: 0,
                flex: 1
              }}>
                {selectedAlgo.implementations[langTab] || '// Detailed code setup mapped directly in language core...'}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Default Catalog Grid View View */}
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="font-heading" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
              Algorithm <span className="text-gradient">Library</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Explore common algorithms with code examples, flowcharts, and step-by-step explanations.
            </p>
          </div>

          {/* Search bar & Category filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            {/* Search Input Box */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '650px'
            }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input
                type="text"
                placeholder="Search algorithms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '14px 16px 14px 48px',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Pills matching screen */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-surface)',
                    color: activeCategory === cat ? '#fff' : 'var(--text-main)',
                    border: `1px solid ${activeCategory === cat ? 'transparent' : 'var(--border-color)'}`,
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: activeCategory === cat ? '0 2px 12px var(--primary-glow)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Flexbox Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {filteredAlgorithms.map((algo) => (
              <div
                key={algo.id}
                onClick={() => handleOpenDetail(algo)}
                className="glass-panel"
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top line indicator icon and diff pill */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <BookOpen size={18} style={{ color: 'var(--primary)' }} />
                    <span style={{ ...getDifficultyBadgeStyle(algo.difficulty), padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {algo.difficulty}
                    </span>
                  </div>

                  <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)' }}>
                    {algo.title}
                  </h3>
                  
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {algo.desc}
                  </p>
                </div>

                {/* Card footer details */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem'
                }}>
                  <span>{algo.category}</span>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
            ))}

            {filteredAlgorithms.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                No standard algorithm profiles matching &quot;{searchQuery}&quot; found inside catalog.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
