/**
 * AI Client — routes to the correct provider based on key format.
 * Supports: Google Gemini (AIza...), OpenAI (sk-...), Anthropic (sk-ant-...)
 */

function detectProvider(apiKey) {
  if (!apiKey) return null;
  if (apiKey.startsWith('AIza')) return 'gemini';
  if (apiKey.startsWith('sk-ant-')) return 'anthropic';
  if (apiKey.startsWith('sk-')) return 'openai';
  return 'openai'; // default fallback attempt
}

async function callGemini(apiKey, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
    })
  });
  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callOpenAI(apiKey, prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3, max_tokens: 1024
    })
  });
  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callAnthropic(apiKey, prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);
  const data = await res.json();
  return data.content?.[0]?.text || '';
}

export async function callAI(apiKey, mode, userInput) {
  const provider = detectProvider(apiKey);

  const prompts = {
    'Generate Code': `You are a coding assistant. The user wants Python code for: "${userInput}". 
Respond in this exact JSON format (no markdown, no code fences, just raw JSON):
{"code": "the complete Python code here", "steps": ["Step 1: description", "Step 2: description", "Step 3: description"]}`,

    'Explain Code': `You are a code explainer. Explain this code clearly:
\`\`\`
${userInput}
\`\`\`
Respond in this exact JSON format (no markdown, just raw JSON):
{"steps": ["Step 1: what this part does", "Step 2: what this part does", "Step 3: what this part does"]}`,

    'Debug Code': `You are a debugging assistant. Find and fix bugs in this code:
\`\`\`
${userInput}
\`\`\`
Respond in this exact JSON format (no markdown, just raw JSON):
{"code": "the corrected code here", "steps": ["Bug 1: description and fix", "Bug 2: description and fix"]}`
  };

  const prompt = prompts[mode];
  let rawText = '';

  if (provider === 'gemini') rawText = await callGemini(apiKey, prompt);
  else if (provider === 'anthropic') rawText = await callAnthropic(apiKey, prompt);
  else rawText = await callOpenAI(apiKey, prompt);

  // Parse JSON from response (strip accidental markdown fences)
  const cleaned = rawText.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  return {
    filename: mode === 'Generate Code' ? 'output.py' : mode === 'Explain Code' ? 'analysis.py' : 'fixed_code.py',
    code: parsed.code || userInput,
    steps: parsed.steps || ['AI response received.']
  };
}

export { detectProvider };
