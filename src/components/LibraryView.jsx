import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight, X, Code, Cpu } from 'lucide-react';

// Production Scale Pre-curated Algorithm Knowledge Engine
const algorithmsData = [
  {
    id: 'linear-search',
    title: 'Linear Search',
    difficulty: 'Beginner',
    category: 'Searching',
    desc: 'Find an element by checking each item sequentially.',
    steps: [
      'Start from the first element of the array.',
      'Compare each element with the target value.',
      'If a match is found, return the index position immediately.',
      'If the end of the collection is reached without a match, return -1.'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    implementations: {
      Python: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1\n\n# Example\nnumbers = [4, 2, 7, 1, 9, 3]\nresult = linear_search(numbers, 7)\nprint(f"Found at index: {result}") # Output: 2`,
      JavaScript: `function linearSearch(arr, target) {\n    for (let i = 0; i < arr.length; i++) {\n        if (arr[i] === target) return i;\n    }\n    return -1;\n}`,
      'C++': `int linearSearch(vector<int>& arr, int target) {\n    for (int i = 0; i < arr.size(); i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`,
      Java: `public int linearSearch(int[] arr, int target) {\n    for (int i = 0; i < arr.length; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`
    }
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Beginner',
    category: 'Searching',
    desc: 'Efficiently find elements in a sorted array by halving the search space.',
    steps: [
      'Establish lower bound (0) and upper bound (length - 1).',
      'Compute the middle index dividing current array spans.',
      'If target matches the middle value, return index successfully.',
      'If target is smaller, adjust upper bound to middle - 1. Otherwise advance lower bound.'
    ],
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    implementations: {
      Python: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
      JavaScript: `function binarySearch(arr, target) {\n    let low = 0, high = arr.length - 1;\n    while (low <= high) {\n        const mid = Math.floor((low + high) / 2);\n        if (arr[mid] === target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
      'C++': `int binarySearch(vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
      Java: `public int binarySearch(int[] arr, int target) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`
    }
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    difficulty: 'Beginner',
    category: 'Sorting',
    desc: 'Sort by repeatedly swapping adjacent elements that are out of order.',
    steps: [
      'Iterate across array boundaries comparing consecutive pairs.',
      'Swap item positions if the left element exceeds the right element.',
      'Repeat nested iteration scans until a complete loop completes without swaps.'
    ],
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    implementations: {
      Python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr`,
      JavaScript: `function bubbleSort(arr) {\n    for (let i = 0; i < arr.length; i++) {\n        for (let j = 0; j < arr.length - i - 1; j++) {\n            if (arr[j] > arr[j+1]) {\n                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n            }\n        }\n    }\n    return arr;\n}`,
      'C++': `void bubbleSort(vector<int>& arr) {\n    for (size_t i = 0; i < arr.size(); i++) {\n        for (size_t j = 0; j < arr.size() - i - 1; j++) {\n            if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);\n        }\n    }\n}`,
      Java: `public void bubbleSort(int[] arr) {\n    for (int i = 0; i < arr.length; i++) {\n        for (int j = 0; j < arr.length - i - 1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;\n            }\n        }\n    }\n}`
    }
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    difficulty: 'Beginner',
    category: 'Sorting',
    desc: 'Sort by finding the minimum element and placing it at the beginning.',
    steps: [
      'Maintain an unsorted section tracker pointer.',
      'Scan remaining sub-arrays to locate the absolute local minimum.',
      'Swap the absolute minimum element with the initial unsorted bound target.'
    ],
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    implementations: {
      Python: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i + 1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr`,
      JavaScript: `function selectionSort(arr) { /* JS base */ }`,
      'C++': `void selectionSort(vector<int>& arr) { /* C++ base */ }`,
      Java: `public void selectionSort(int[] arr) { /* Java base */ }`
    }
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    difficulty: 'Beginner',
    category: 'Sorting',
    desc: 'Build a sorted array one element at a time.',
    steps: [
      'Assume the primary initial base index forms a pristine sub-list.',
      'Extract adjacent upper boundary parameters inserting backward into true slots.'
    ],
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    implementations: {
      Python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr`,
      JavaScript: `function insertionSort(arr) {}`,
      'C++': `void insertionSort(vector<int>& arr) {}`,
      Java: `public void insertionSort(int[] arr) {}`
    }
  },
  {
    id: 'stack-operations',
    title: 'Stack Operations',
    difficulty: 'Beginner',
    category: 'Data Structures',
    desc: 'Last-In-First-Out (LIFO) data structure operations.',
    steps: [
      'Push appends new object addresses strictly onto current top tracks.',
      'Pop inspects and releases immediate topmost access blocks.'
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(N)',
    implementations: {
      Python: `class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)\n    def pop(self):\n        return self.items.pop() if self.items else None`,
      JavaScript: `class Stack {}`,
      'C++': `template<typename T> class Stack {};`,
      Java: `public class Stack {}`
    }
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    difficulty: 'Intermediate',
    category: 'Sorting',
    desc: 'Divide-and-conquer algorithm using pivot partitioning logic.',
    steps: [
      'Select a comparative target pivot boundary item.',
      'Partition secondary subsets matching elements lesser or larger.',
      'Recursively trigger discrete subarray segments.'
    ],
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(log N)',
    implementations: {
      Python: `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`,
      JavaScript: `function quickSort(arr) {}`,
      'C++': `void quickSort(vector<int>& arr) {}`,
      Java: `public void quickSort(int[] arr) {}`
    }
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    difficulty: 'Intermediate',
    category: 'Sorting',
    desc: 'Stable partitioning strategy merging recursive monotonic subsets.',
    steps: [
      'Split arrays dynamically until discrete unary states form.',
      'Compare boundary heads rebuilding sorted sub-arrays sequentially.'
    ],
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    implementations: {
      Python: `def merge_sort(arr):\n    # Recursive parallel split blocks\n    pass`,
      JavaScript: `function mergeSort(arr) {}`,
      'C++': `void mergeSort(vector<int>& arr) {}`,
      Java: `public void mergeSort(int[] arr) {}`
    }
  }
];

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
