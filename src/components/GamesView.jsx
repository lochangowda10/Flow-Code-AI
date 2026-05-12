import React, { useState, useEffect } from 'react';
import { Star, Award, CheckCircle2, AlertCircle } from 'lucide-react';

const quizQuestions = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    badge: 'easy',
    question: 'Given an array of integers, return indices of the two numbers that add up to a specific target.',
    options: [
      'Brute Force O(n²)',
      'Hash Map O(n)',
      'Sorting O(n log n)',
      'Binary Search O(n log n)'
    ],
    correctAnswer: 'Hash Map O(n)',
    points: 10
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    badge: 'easy',
    question: "Reverse a singly linked list iteratively. What's the optimal approach?",
    options: [
      'Use a stack',
      'Three pointers (prev, curr, next)',
      'Recursion only',
      'Copy to array and reverse'
    ],
    correctAnswer: 'Three pointers (prev, curr, next)',
    points: 10
  },
  {
    id: 'detect-cycle',
    title: 'Detect Linked List Cycle',
    badge: 'medium',
    question: 'Determine if a linked list contains a cycle utilizing exactly O(1) auxiliary memory allocations.',
    options: [
      "Floyd's Tortoise and Hare",
      'Store visited nodes in Hash Set',
      'Modify node payloads directly',
      'Traverse for 1 million iterations'
    ],
    correctAnswer: "Floyd's Tortoise and Hare",
    points: 15
  },
  {
    id: 'find-duplicate',
    title: 'Find Duplicate Number',
    badge: 'hard',
    question: 'Given an array containing n+1 integers where each integer is in the range [1, n], find the repeated value in O(N) time and O(1) space.',
    options: [
      'Sort array first',
      "Floyd's Cycle Detection",
      'Compare all possible pairs',
      'Count frequencies using HashMap'
    ],
    correctAnswer: "Floyd's Cycle Detection",
    points: 20
  }
];

export default function GamesView() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedStates, setSubmittedStates] = useState({});
  const [score, setScore] = useState(0);

  // Initialize accumulated points storage from client layer
  useEffect(() => {
    const savedScore = localStorage.getItem('flowcode_game_score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }

    const savedAnswers = localStorage.getItem('flowcode_selected_answers');
    const savedStates = localStorage.getItem('flowcode_submitted_states');
    if (savedAnswers) setSelectedAnswers(JSON.parse(savedAnswers));
    if (savedStates) setSubmittedStates(JSON.parse(savedStates));
  }, []);

  const handleSelectOption = (qId, option) => {
    if (submittedStates[qId]) return; // locked once verified

    const updated = { ...selectedAnswers, [qId]: option };
    setSelectedAnswers(updated);
    localStorage.setItem('flowcode_selected_answers', JSON.stringify(updated));
  };

  const handleSubmitAnswer = (q) => {
    const chosen = selectedAnswers[q.id];
    if (!chosen) return;

    const isCorrect = chosen === q.correctAnswer;
    const nextStates = { ...submittedStates, [q.id]: isCorrect ? 'correct' : 'incorrect' };
    setSubmittedStates(nextStates);
    localStorage.setItem('flowcode_submitted_states', JSON.stringify(nextStates));

    if (isCorrect) {
      const nextScore = score + q.points;
      setScore(nextScore);
      localStorage.setItem('flowcode_game_score', nextScore.toString());
    }
  };

  const handleResetGame = () => {
    setSelectedAnswers({});
    setSubmittedStates({});
    setScore(0);
    localStorage.removeItem('flowcode_selected_answers');
    localStorage.removeItem('flowcode_submitted_states');
    localStorage.removeItem('flowcode_game_score');
  };

  const getBadgeStyle = (badge) => {
    if (badge === 'easy') return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' };
    if (badge === 'medium') return { color: '#a78bfa', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.3)' };
    return { color: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)' };
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      {/* Platform Title Banner & Accumulated Score Hub */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '2.2rem', marginBottom: '4px' }}>
            Logic <span className="text-gradient">Games</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Sharpen absolute optimal efficiency constraints checking standard multiple choice modules.
          </p>
        </div>

        {/* Scalable Points Card Container */}
        <div className="glass-panel" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 20px',
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid var(--border-hover)'
        }}>
          <Award style={{ color: 'var(--primary)' }} size={24} />
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Total Earned</span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{score} <span style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600 }}>pts</span></strong>
          </div>

          {score > 0 && (
            <button 
              onClick={handleResetGame}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', textDecoration: 'underline', marginLeft: '8px', cursor: 'pointer' }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Primary Question Grid blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {quizQuestions.map((q) => {
          const chosenAnswer = selectedAnswers[q.id];
          const submissionStatus = submittedStates[q.id];

          return (
            <div key={q.id} className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Question heading line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div>
                  <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                    {q.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {q.question}
                  </p>
                </div>

                <span style={{ ...getBadgeStyle(q.badge), padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {q.badge}
                </span>
              </div>

              {/* Dynamic options map matching screen parameters exactly */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {q.options.map((opt) => {
                  const isChosen = chosenAnswer === opt;
                  let optStyle = {
                    background: isChosen ? 'var(--bg-surface)' : 'var(--bg-base)',
                    border: `1px solid ${isChosen ? 'var(--primary)' : 'var(--border-color)'}`,
                    color: isChosen ? 'var(--text-main)' : 'var(--text-muted)',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    cursor: submissionStatus ? 'default' : 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                    fontWeight: isChosen ? 600 : 400
                  };

                  // Annotate highlight borders if verified
                  if (submissionStatus === 'correct' && opt === q.correctAnswer) {
                    optStyle.background = 'rgba(16, 185, 129, 0.1)';
                    optStyle.border = '1px solid var(--success)';
                    optStyle.color = 'var(--success)';
                  } else if (submissionStatus === 'incorrect' && isChosen) {
                    optStyle.background = 'rgba(239, 68, 68, 0.1)';
                    optStyle.border = '1px solid var(--danger)';
                    optStyle.color = 'var(--danger)';
                  } else if (submissionStatus === 'incorrect' && opt === q.correctAnswer) {
                    optStyle.border = '1px dashed var(--success)';
                    optStyle.color = 'var(--success)';
                  }

                  return (
                    <div
                      key={opt}
                      onClick={() => handleSelectOption(q.id, opt)}
                      style={optStyle}
                      onMouseEnter={(e) => {
                        if (!submissionStatus && !isChosen) {
                          e.currentTarget.style.borderColor = 'var(--border-hover)';
                          e.currentTarget.style.color = 'var(--text-main)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!submissionStatus && !isChosen) {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }
                      }}
                    >
                      <span>{opt}</span>
                      {submissionStatus === 'correct' && opt === q.correctAnswer && <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />}
                      {submissionStatus === 'incorrect' && isChosen && <AlertCircle size={18} style={{ color: 'var(--danger)' }} />}
                    </div>
                  );
                })}
              </div>

              {/* Validation Footer Block */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Star size={14} style={{ color: '#ffbd2e' }} />
                  <span>{q.points} pts</span>
                </div>

                {!submissionStatus ? (
                  <button
                    onClick={() => handleSubmitAnswer(q)}
                    disabled={!chosenAnswer}
                    style={{
                      background: chosenAnswer ? 'var(--primary)' : 'var(--bg-surface)',
                      color: chosenAnswer ? '#fff' : 'var(--text-muted)',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: chosenAnswer ? 'pointer' : 'not-allowed',
                      opacity: chosenAnswer ? 1 : 0.5,
                      transition: 'all 0.2s ease',
                      boxShadow: chosenAnswer ? '0 2px 10px var(--primary-glow)' : 'none'
                    }}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: submissionStatus === 'correct' ? 'var(--success)' : 'var(--danger)' }}>
                    {submissionStatus === 'correct' ? '✓ Correct Result Verified' : '✗ Review Valid Implementation Paths'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
