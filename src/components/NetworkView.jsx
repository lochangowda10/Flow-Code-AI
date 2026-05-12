import React, { useState, useEffect } from 'react';
import { Users, Trophy, UserCheck, Github, Mail, X, Sparkles } from 'lucide-react';

const initialLeaderboard = [
  { rank: 1, name: 'Alex_Dev', points: 420, tier: 'Diamond' },
  { rank: 2, name: 'SarahCode', points: 380, tier: 'Platinum' },
  { rank: 3, name: 'ByteMaster', points: 310, tier: 'Gold' },
  { rank: 4, name: 'LogicPro', points: 290, tier: 'Gold' },
  { rank: 5, name: 'CoderNewb', points: 150, tier: 'Silver' }
];

export default function NetworkView() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);

  // Sync user profiles and integrated live local scores to leaderboard
  useEffect(() => {
    const savedUser = localStorage.getItem('flowcode_user_profile');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      
      const liveScore = localStorage.getItem('flowcode_game_score');
      const scoreNum = liveScore ? parseInt(liveScore, 10) : parsed.points;
      
      // Inject user conditionally into live standings view
      const updatedList = initialLeaderboard.filter(u => u.name !== parsed.name);
      updatedList.push({
        rank: 0, // dynamic compute
        name: parsed.name + ' (You)',
        points: scoreNum,
        tier: scoreNum > 200 ? 'Platinum' : scoreNum > 100 ? 'Gold' : 'Silver'
      });
      
      updatedList.sort((a, b) => b.points - a.points);
      updatedList.forEach((item, index) => { item.rank = index + 1; });
      setLeaderboard(updatedList);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    const handle = customName.trim() || 'FlowCoder';
    const profile = { name: handle, points: 50 };
    
    setUser(profile);
    localStorage.setItem('flowcode_user_profile', JSON.stringify(profile));
    setShowAuthModal(false);

    // Refresh dynamic list order
    const updatedList = initialLeaderboard.filter(u => !u.name.includes('(You)'));
    const liveScore = localStorage.getItem('flowcode_game_score');
    const scoreNum = liveScore ? parseInt(liveScore, 10) : 50;

    updatedList.push({
      rank: 0,
      name: handle + ' (You)',
      points: scoreNum,
      tier: scoreNum > 200 ? 'Platinum' : scoreNum > 100 ? 'Gold' : 'Silver'
    });
    
    updatedList.sort((a, b) => b.points - a.points);
    updatedList.forEach((item, index) => { item.rank = index + 1; });
    setLeaderboard(updatedList);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('flowcode_user_profile');
    setLeaderboard(initialLeaderboard);
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      position: 'relative'
    }}>
      {/* Auth Setup Dialog Box overlay */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <form onSubmit={handleSignIn} className="glass-panel animate-fade-in" style={{
            background: 'var(--bg-surface)',
            padding: '32px',
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-block', padding: '12px', background: 'var(--primary-glow)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '12px' }}>
                <Users size={32} />
              </div>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '4px' }}>Sign in to Network</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure client auth payload mapping token parameters.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Desired Developer Username</label>
                <input
                  type="text"
                  placeholder="e.g. CodeMaverick"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'var(--bg-base)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                <Github size={18} />
                <span>Authorize &amp; Connect Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Header view matching parameters */}
      <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
        <div style={{ display: 'inline-block', padding: '16px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '16px' }}>
          <Users size={40} />
        </div>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
          Join the <span className="text-gradient">Network</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          Connect with fellow coders, compete on leaderboards, and grow together.
        </p>

        {!user ? (
          <button
            onClick={() => setShowAuthModal(true)}
            className="btn-primary"
            style={{ marginTop: '24px', padding: '14px 32px', fontSize: '1.05rem' }}
          >
            Sign in to get started
          </button>
        ) : (
          <div style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--bg-surface)', padding: '8px 20px', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            <UserCheck size={18} style={{ color: 'var(--success)' }} />
            <span style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Authenticated as <strong>{user.name.replace(' (You)', '')}</strong></span>
            <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline', marginLeft: '8px' }}>
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Standings Component Hub */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy style={{ color: '#ffbd2e' }} size={22} />
            <h2 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: 0 }}>Global Standings</h2>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated dynamically via local games engine</span>
        </div>

        {/* List lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {leaderboard.map((row) => {
            const isSelf = row.name.includes('(You)');
            return (
              <div
                key={row.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                  background: isSelf ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-surface)',
                  border: `1px solid ${isSelf ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    width: '28px', height: '28px',
                    borderRadius: '50%',
                    background: row.rank === 1 ? '#ffbd2e' : row.rank === 2 ? '#94a3b8' : row.rank === 3 ? '#d97706' : 'transparent',
                    color: row.rank <= 3 ? '#000' : 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.85rem'
                  }}>
                    {row.rank}
                  </span>
                  
                  <span style={{ fontWeight: isSelf ? 700 : 500, color: isSelf ? 'var(--primary)' : 'var(--text-main)', fontSize: '1rem' }}>
                    {row.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-base)', padding: '2px 8px', borderRadius: '4px' }}>
                    {row.tier}
                  </span>
                  <strong style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--secondary)', fontSize: '1.05rem' }}>
                    {row.points} pts
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
