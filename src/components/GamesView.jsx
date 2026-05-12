import React, { useState, useEffect } from 'react';
import { Star, Award, CheckCircle2, AlertCircle, Code, Brain, Sparkles, LogIn } from 'lucide-react';

const allQuestions = [
  // CODING
  { id: 'two-sum', category: 'Coding', title: 'Two Sum', badge: 'easy', question: 'Given an array of integers, return indices of the two numbers that add up to a specific target.', options: ['Brute Force O(n²)', 'Hash Map O(n)', 'Sorting O(n log n)', 'Binary Search O(n log n)'], correctAnswer: 'Hash Map O(n)', points: 10 },
  { id: 'reverse-linked-list', category: 'Coding', title: 'Reverse Linked List', badge: 'easy', question: "Reverse a singly linked list iteratively. What's the optimal approach?", options: ['Use a stack', 'Three pointers (prev, curr, next)', 'Recursion only', 'Copy to array and reverse'], correctAnswer: 'Three pointers (prev, curr, next)', points: 10 },
  { id: 'detect-cycle', category: 'Coding', title: 'Detect Linked List Cycle', badge: 'medium', question: 'Determine if a linked list contains a cycle using O(1) auxiliary memory.', options: ["Floyd's Tortoise and Hare", 'Store visited nodes in Hash Set', 'Modify node payloads directly', 'Traverse for 1 million iterations'], correctAnswer: "Floyd's Tortoise and Hare", points: 15 },
  { id: 'find-duplicate', category: 'Coding', title: 'Find Duplicate Number', badge: 'hard', question: 'Find the repeated value in an array of n+1 integers in range [1, n] with O(N) time and O(1) space.', options: ['Sort array first', "Floyd's Cycle Detection", 'Compare all possible pairs', 'Count frequencies using HashMap'], correctAnswer: "Floyd's Cycle Detection", points: 20 },
  // LOGIC
  { id: 'time-complexity-bfs', category: 'Logic', title: 'BFS Time Complexity', badge: 'easy', question: 'What is the time complexity of Breadth-First Search on a graph with V vertices and E edges?', options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'], correctAnswer: 'O(V + E)', points: 10 },
  { id: 'stable-sort', category: 'Logic', title: 'Stable Sorting', badge: 'medium', question: 'Which of the following sorting algorithms is NOT stable?', options: ['Merge Sort', 'Bubble Sort', 'Quick Sort', 'Insertion Sort'], correctAnswer: 'Quick Sort', points: 15 },
  { id: 'recursion-base', category: 'Logic', title: 'Recursion Fundamentals', badge: 'easy', question: 'What happens if a recursive function has no base case?', options: ['It returns 0', 'Stack overflow / infinite loop', 'It runs once and stops', 'Compiler auto-adds a base case'], correctAnswer: 'Stack overflow / infinite loop', points: 10 },
  { id: 'dp-vs-greedy', category: 'Logic', title: 'DP vs Greedy', badge: 'hard', question: 'When should you use Dynamic Programming over a Greedy approach?', options: ['When the problem has optimal substructure only', 'When subproblems overlap and greedy choice fails', 'When the input is sorted', 'When recursion depth is small'], correctAnswer: 'When subproblems overlap and greedy choice fails', points: 20 },
  // PATTERNS
  { id: 'sliding-window', category: 'Patterns', title: 'Sliding Window', badge: 'medium', question: 'Which problem is best solved using the Sliding Window pattern?', options: ['Finding shortest path in graph', 'Maximum sum subarray of size K', 'Sorting an array', 'Finding median of stream'], correctAnswer: 'Maximum sum subarray of size K', points: 15 },
  { id: 'two-pointer', category: 'Patterns', title: 'Two Pointer Technique', badge: 'easy', question: 'The two-pointer technique works most efficiently on what type of data?', options: ['Unsorted arrays', 'Sorted arrays or linked lists', 'Binary trees', 'Hash tables'], correctAnswer: 'Sorted arrays or linked lists', points: 10 },
  { id: 'divide-conquer', category: 'Patterns', title: 'Divide & Conquer', badge: 'medium', question: 'Which algorithm does NOT use the Divide and Conquer paradigm?', options: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Dijkstra\'s Algorithm'], correctAnswer: 'Dijkstra\'s Algorithm', points: 15 },
  { id: 'backtracking', category: 'Patterns', title: 'Backtracking', badge: 'hard', question: 'Backtracking is most appropriate for which type of problem?', options: ['Finding shortest path', 'Constraint satisfaction (e.g., N-Queens)', 'Array sorting', 'Hash table lookups'], correctAnswer: 'Constraint satisfaction (e.g., N-Queens)', points: 20 },
];

export default function GamesView() {
  const [activeCategory, setActiveCategory] = useState('Coding');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedStates, setSubmittedStates] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('flowcode_game_score');
    if (savedScore) setScore(parseInt(savedScore, 10));
    const savedAnswers = localStorage.getItem('flowcode_selected_answers');
    const savedStates = localStorage.getItem('flowcode_submitted_states');
    if (savedAnswers) setSelectedAnswers(JSON.parse(savedAnswers));
    if (savedStates) setSubmittedStates(JSON.parse(savedStates));
  }, []);

  const filteredQuestions = allQuestions.filter(q => q.category === activeCategory);

  const handleSelectOption = (qId, option) => {
    if (submittedStates[qId]) return;
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

  const getBadgeStyle = (badge) => {
    if (badge === 'easy') return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' };
    if (badge === 'medium') return { color: '#a78bfa', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.3)' };
    return { color: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)' };
  };

  const categoryIcons = { Coding: <Code size={16} />, Logic: <Brain size={16} />, Patterns: <Sparkles size={16} /> };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
          Daily <span className="text-gradient">Puzzles</span> & Games
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Sharpen your algorithm skills with daily challenges</p>
      </div>

      {/* Score + Sign-in bar */}
      <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} style={{ color: 'var(--primary)' }} />
            <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{score}</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Points</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} style={{ color: 'var(--secondary)' }} />
            <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{Object.values(submittedStates).filter(s => s === 'correct').length}</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Solved</span>
          </div>
        </div>
        <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '8px 20px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogIn size={14} />
          Sign in to save progress
        </button>
      </div>

      {/* Category Tabs */}
      <div className="glass-panel" style={{ padding: '6px', display: 'flex', borderRadius: '12px' }}>
        {['Coding', 'Logic', 'Patterns'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: activeCategory === cat ? 'var(--bg-surface)' : 'transparent',
              color: activeCategory === cat ? 'var(--text-main)' : 'var(--text-muted)',
              border: 'none', padding: '12px 20px', borderRadius: '8px', fontSize: '0.95rem',
              fontWeight: activeCategory === cat ? 700 : 500, cursor: 'pointer', transition: 'all 0.2s ease'
            }}
          >
            {categoryIcons[cat]}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {filteredQuestions.map((q) => {
          const chosenAnswer = selectedAnswers[q.id];
          const submissionStatus = submittedStates[q.id];
          return (
            <div key={q.id} className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div>
                  <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '6px' }}>{q.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{q.question}</p>
                </div>
                <span style={{ ...getBadgeStyle(q.badge), padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', flexShrink: 0 }}>{q.badge}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {q.options.map((opt) => {
                  const isChosen = chosenAnswer === opt;
                  let optStyle = {
                    background: isChosen ? 'var(--bg-surface)' : 'var(--bg-base)', border: `1px solid ${isChosen ? 'var(--primary)' : 'var(--border-color)'}`,
                    color: isChosen ? 'var(--text-main)' : 'var(--text-muted)', padding: '14px 20px', borderRadius: '12px',
                    cursor: submissionStatus ? 'default' : 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: '0.95rem', fontWeight: isChosen ? 600 : 400, transition: 'all 0.2s ease'
                  };
                  if (submissionStatus === 'correct' && opt === q.correctAnswer) { optStyle.background = 'rgba(16, 185, 129, 0.1)'; optStyle.border = '1px solid var(--success)'; optStyle.color = 'var(--success)'; }
                  else if (submissionStatus === 'incorrect' && isChosen) { optStyle.background = 'rgba(239, 68, 68, 0.1)'; optStyle.border = '1px solid var(--danger)'; optStyle.color = 'var(--danger)'; }
                  else if (submissionStatus === 'incorrect' && opt === q.correctAnswer) { optStyle.border = '1px dashed var(--success)'; optStyle.color = 'var(--success)'; }
                  return (
                    <div key={opt} onClick={() => handleSelectOption(q.id, opt)} style={optStyle}>
                      <span>{opt}</span>
                      {submissionStatus === 'correct' && opt === q.correctAnswer && <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />}
                      {submissionStatus === 'incorrect' && isChosen && <AlertCircle size={18} style={{ color: 'var(--danger)' }} />}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Star size={14} style={{ color: '#ffbd2e' }} /><span>{q.points} pts</span>
                </div>
                {!submissionStatus ? (
                  <button onClick={() => handleSubmitAnswer(q)} disabled={!chosenAnswer} style={{ background: chosenAnswer ? 'var(--primary)' : 'var(--bg-surface)', color: chosenAnswer ? '#fff' : 'var(--text-muted)', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: chosenAnswer ? 'pointer' : 'not-allowed', opacity: chosenAnswer ? 1 : 0.5, transition: 'all 0.2s ease', boxShadow: chosenAnswer ? '0 2px 10px var(--primary-glow)' : 'none' }}>Submit Answer</button>
                ) : (
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: submissionStatus === 'correct' ? 'var(--success)' : 'var(--danger)' }}>{submissionStatus === 'correct' ? '✓ Correct!' : '✗ Incorrect'}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
