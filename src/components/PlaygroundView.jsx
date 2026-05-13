import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Bug, Copy, Check, Key, AlertTriangle, X } from 'lucide-react';
import { callAI, detectProvider } from '../utils/aiClient.js';

// Pre-coded responses for common queries (works without API key)
const MOCK_RESPONSES = {
  'generate': {
    'binary search': {
      filename: 'output.py',
      code: `def binary_search(arr, target):\n    """\n    Performs binary search on a sorted list.\n    """\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
      steps: [
        'Initialize Pointers: Set `low = 0` and `high = len(arr) - 1` to define search boundaries.',
        'Calculate Midpoint: Compute `mid = (low + high) // 2` to find the center of the current range.',
        'Compare: If `arr[mid] == target`, return the index. If smaller, move `low` up; if larger, move `high` down.',
        'Repeat until found or the search space is empty (return -1).'
      ]
    },
    'prime': {
      filename: 'output.py',
      code: `def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True`,
      steps: [
        'Boundary Guard: Numbers ≤ 1 are not prime, return False immediately.',
        'Optimized Loop: Only check divisors up to √n — if no factor exists there, none exist beyond.',
        'Divisibility Check: If any i divides n evenly, n is composite — return False.',
        'Confirmed Prime: If the loop completes without a divisor, n is prime — return True.'
      ]
    },
    'fibonacci': {
      filename: 'output.py',
      code: `def fibonacci(n):\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b`,
      steps: [
        'Base Case: If n is 0 or 1, return n directly.',
        'Iterative Approach: Use two variables `a` and `b` to track consecutive Fibonacci numbers.',
        'Update: At each step, shift `a = b` and `b = a + b`.',
        'Space Efficient: This runs in O(n) time and O(1) space — better than naive recursion.'
      ]
    },
    'linear search': {
      filename: 'output.py',
      code: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1`,
      steps: [
        'Iterate: Loop through every element in the array one by one.',
        'Compare: Check if the current element matches the target.',
        'Return Index: If found, return the current index immediately.',
        'Not Found: If the loop ends without a match, return -1.'
      ]
    },
    'bubble sort': {
      filename: 'output.py',
      code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr`,
      steps: [
        'Outer Loop: Runs n times, each pass bubbles the largest unsorted element to the right.',
        'Inner Loop: Compares adjacent pairs; swaps them if out of order.',
        'Early Exit: If no swaps occurred in a pass, the array is already sorted — break early.',
        'Result: After n passes, the array is fully sorted in ascending order.'
      ]
    },
    'factorial': {
      filename: 'output.py',
      code: `def factorial(n):\n    if n < 0:\n        raise ValueError("Factorial not defined for negative numbers")\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)`,
      steps: [
        'Input Validation: Raise an error for negative inputs.',
        'Base Case: factorial(0) = factorial(1) = 1.',
        'Recursive Step: n! = n × (n-1)! — call recursively with n-1.',
        'Unwind: The call stack unwinds, multiplying results back up to n.'
      ]
    }
  }
};

function findMockResponse(mode, query) {
  const q = query.toLowerCase().trim();
  if (mode === 'Generate Code') {
    const bank = MOCK_RESPONSES['generate'];
    for (const key of Object.keys(bank)) {
      if (q.includes(key)) return bank[key];
    }
  }
  return null;
}

export default function PlaygroundView() {
  const [mode, setMode] = useState('Generate Code');
  const [inputCode, setInputCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [keySaved, setKeySaved] = useState(false);
  const [error, setError] = useState(null);
  const [showApiPrompt, setShowApiPrompt] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('flowcode_api_key');
    if (savedKey) setApiKey(savedKey);
    const defaults = {
      'Generate Code': 'Binary search',
      'Explain Code': 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)',
      'Debug Code': 'def add_numbers(a, b):\n    return a - b # Buggy implementation'
    };
    const saved = localStorage.getItem(`flowcode_input_${mode}`);
    setInputCode(saved || defaults[mode]);
    setOutputData(null);
    setError(null);
    setShowApiPrompt(false);
  }, [mode]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('flowcode_api_key', apiKey);
    setKeySaved(true);
    setShowKeyConfig(false);
    setShowApiPrompt(false);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const provider = detectProvider(apiKey);
  const providerLabel = provider === 'gemini' ? 'Google Gemini' : provider === 'anthropic' ? 'Anthropic Claude' : provider === 'openai' ? 'OpenAI GPT' : null;

  const handleTriggerAction = async () => {
    if (!inputCode.trim()) return;
    setIsGenerating(true);
    setOutputData(null);
    setError(null);
    setShowApiPrompt(false);

    // Try mock first
    const mock = findMockResponse(mode, inputCode);
    if (mock) {
      await new Promise(r => setTimeout(r, 700));
      setOutputData(mock);
      setIsGenerating(false);
      return;
    }

    // No mock match — need API key
    if (!apiKey) {
      await new Promise(r => setTimeout(r, 400));
      setIsGenerating(false);
      setShowApiPrompt(true);
      return;
    }

    // Call real AI API
    try {
      const result = await callAI(apiKey, mode, inputCode);
      setOutputData(result);
    } catch (err) {
      setError(err.message || 'API call failed. Check your key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!outputData?.code) return;
    navigator.clipboard.writeText(outputData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getModeIcon = () => {
    if (mode === 'Generate Code') return <Sparkles size={16} />;
    if (mode === 'Explain Code') return <RefreshCw size={16} />;
    return <Bug size={16} />;
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Mode Tabs + API Key button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-surface)', padding: '6px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {['Generate Code', 'Explain Code', 'Debug Code'].map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`mode-tab ${mode === m ? 'active' : ''}`}>
              {m === 'Generate Code' && <Sparkles size={14} />}
              {m === 'Explain Code' && <RefreshCw size={14} />}
              {m === 'Debug Code' && <Bug size={14} />}
              <span>{m}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowKeyConfig(!showKeyConfig)}
          style={{
            background: showKeyConfig ? 'var(--primary-glow)' : 'var(--bg-surface)',
            border: `1px solid ${apiKey ? 'var(--success)' : 'var(--border-color)'}`,
            color: apiKey ? 'var(--success)' : 'var(--text-muted)',
            padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease'
          }}
        >
          <Key size={14} />
          <span>{apiKey ? `${providerLabel} Connected` : 'Setup API Key'}</span>
        </button>
      </div>

      {/* API Key Config Panel */}
      {showKeyConfig && (
        <form onSubmit={handleSaveKey} className="glass-panel animate-fade-in" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>Configure AI Provider</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supports Gemini, OpenAI & Anthropic keys</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="password"
              placeholder="AIza... (Gemini)  /  sk-... (OpenAI)  /  sk-ant-... (Anthropic)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ flex: '1', minWidth: '280px', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 16px', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '8px' }}>
              {keySaved ? <Check size={16} /> : <span>Save Key</span>}
            </button>
            {apiKey && (
              <button type="button" onClick={() => { setApiKey(''); localStorage.removeItem('flowcode_api_key'); }}
                style={{ background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                Clear
              </button>
            )}
          </div>
          {apiKey && (
            <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>
              ✓ Detected provider: <strong>{providerLabel || 'Unknown (will attempt OpenAI-compatible)'}</strong>
            </span>
          )}
        </form>
      )}

      {/* "Need API Key" Prompt */}
      {showApiPrompt && (
        <div className="glass-panel animate-fade-in" style={{ padding: '20px', border: '1px solid var(--warning)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <AlertTriangle size={24} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px' }}>API Key Required</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Your query isn't in our built-in library. To generate a response for <strong>"{inputCode.slice(0, 40)}{inputCode.length > 40 ? '...' : ''}"</strong>, please connect an AI provider.
            </p>
          </div>
          <button onClick={() => { setShowKeyConfig(true); setShowApiPrompt(false); }}
            className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px', flexShrink: 0 }}>
            Add API Key
          </button>
          <button onClick={() => setShowApiPrompt(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="glass-panel animate-fade-in" style={{ padding: '16px 20px', border: '1px solid var(--danger)', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <AlertTriangle size={20} style={{ color: 'var(--danger)', flexShrink: 0 }} />
          <span style={{ color: 'var(--danger)', fontSize: '0.9rem', flex: 1 }}>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>
      )}

      {/* Editor Panel */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            </div>
            <span className="font-code" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {mode === 'Generate Code' ? 'prompt.txt' : mode === 'Explain Code' ? 'input.py' : 'buggy.py'}
            </span>
            {apiKey && (
              <span style={{ fontSize: '0.75rem', color: 'var(--success)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '2px 8px', borderRadius: '12px' }}>
                ⚡ AI-Powered
              </span>
            )}
          </div>
          <button
            onClick={handleTriggerAction}
            disabled={isGenerating || !inputCode.trim()}
            style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: isGenerating || !inputCode.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isGenerating || !inputCode.trim() ? 0.6 : 1, boxShadow: '0 2px 10px var(--primary-glow)', transition: 'all 0.2s ease' }}
          >
            {isGenerating
              ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /><span>Processing...</span></>
              : <>{getModeIcon()}<span>{mode === 'Generate Code' ? 'Generate' : mode === 'Explain Code' ? 'Explain' : 'Debug'}</span></>
            }
          </button>
        </div>

        <div style={{ display: 'flex', minHeight: '260px', background: 'var(--bg-base)' }}>
          <div className="font-code" style={{ padding: '20px 12px', background: 'rgba(0,0,0,0.2)', color: 'var(--text-muted)', textAlign: 'right', userSelect: 'none', borderRight: '1px solid var(--border-color)', minWidth: '45px', fontSize: '0.95rem', opacity: 0.6 }}>1</div>
          <textarea
            value={inputCode}
            onChange={(e) => { setInputCode(e.target.value); localStorage.setItem(`flowcode_input_${mode}`, e.target.value); }}
            placeholder={mode === 'Generate Code' ? "Describe your algorithm (e.g., 'Binary search', 'Fibonacci', 'Sort an array')..." : 'Paste code here...'}
            className="font-code"
            style={{ flex: 1, background: 'transparent', border: 'none', padding: '20px 16px', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, resize: 'vertical', outline: 'none', minHeight: '260px', width: '100%' }}
          />
        </div>
      </div>

      {/* Output Area */}
      {outputData && (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
          {/* Code Panel */}
          <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <span className="font-code" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{outputData.filename}</span>
                {apiKey && <span style={{ fontSize: '0.7rem', color: 'var(--primary)', opacity: 0.8 }}>via {providerLabel}</span>}
              </div>
              <button onClick={handleCopyCode} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: copied ? 'var(--success)' : 'var(--text-muted)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s ease' }}>
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div style={{ display: 'flex', flex: 1, background: 'var(--bg-base)', overflowX: 'auto' }}>
              <pre className="font-code" style={{ padding: '20px', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, width: '100%' }}>
                {outputData.code.split('\n').map((line, idx) => {
                  let c = 'var(--text-main)';
                  if (line.trim().startsWith('def ') || line.trim().startsWith('class ')) c = '#38bdf8';
                  else if (line.trim().startsWith('#') || line.trim().startsWith('"""')) c = '#a78bfa';
                  else if (line.includes('return')) c = '#f43f5e';
                  else if (/\b(while|for|if|elif|else)\b/.test(line)) c = '#06b6d4';
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ opacity: 0.4, userSelect: 'none', minWidth: '24px', textAlign: 'right' }}>{idx + 1}</span>
                      <span style={{ color: c }}>{line}</span>
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>

          {/* Explanation Panel */}
          <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '12px 20px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              Explanation
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
              {outputData.steps.map((step, index) => {
                const parts = step.split(': ');
                const title = parts.length > 1 ? parts[0] : '';
                const desc = parts.length > 1 ? parts.slice(1).join(': ') : step;
                return (
                  <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1rem', minWidth: '20px', paddingTop: '2px' }}>{index + 1}.</span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                      {title && <strong style={{ color: 'var(--text-main)' }}>{title}: </strong>}
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
