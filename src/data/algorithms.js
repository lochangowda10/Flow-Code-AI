export const algorithms = [
  {
    id: 'linear-search', title: 'Linear Search', difficulty: 'Beginner', category: 'Searching',
    desc: 'Find an element by checking each item sequentially.',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    steps: ['Start from the first element of the array.','Compare each element with the target value.','If a match is found, return the index.','If the end is reached without a match, return -1.'],
    implementations: {
      Python: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1\n\nnumbers = [4, 2, 7, 1, 9, 3]\nresult = linear_search(numbers, 7)\nprint(f"Found at index: {result}")  # Output: 2`,
      JavaScript: `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\n\nconst numbers = [4, 2, 7, 1, 9, 3];\nconsole.log(linearSearch(numbers, 7)); // Output: 2`,
      'C++': `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint linearSearch(vector<int>& arr, int target) {\n    for (int i = 0; i < arr.size(); i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> nums = {4, 2, 7, 1, 9, 3};\n    cout << "Found at index: " << linearSearch(nums, 7);\n    return 0;\n}`,
      Java: `public class LinearSearch {\n    static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {4, 2, 7, 1, 9, 3};\n        System.out.println("Found at index: " + linearSearch(nums, 7));\n    }\n}`
    }
  },
  {
    id: 'binary-search', title: 'Binary Search', difficulty: 'Beginner', category: 'Searching',
    desc: 'Efficiently find elements in a sorted array by halving the search space.',
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
    steps: ['Start with the full sorted array.','Find the middle element and compare with target.','If target is smaller, search the left half.','If target is larger, search the right half.','Repeat until found or search space is empty.'],
    implementations: {
      Python: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nsorted_nums = [1, 3, 5, 7, 9, 11, 13]\nprint(binary_search(sorted_nums, 7))  # Output: 3`,
      JavaScript: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}\n\nconsole.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 7)); // 3`,
      'C++': `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint binarySearch(vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> nums = {1, 3, 5, 7, 9, 11, 13};\n    cout << binarySearch(nums, 7);\n}`,
      Java: `public class BinarySearch {\n    static int binarySearch(int[] arr, int target) {\n        int low = 0, high = arr.length - 1;\n        while (low <= high) {\n            int mid = (low + high) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 3, 5, 7, 9, 11, 13};\n        System.out.println(binarySearch(nums, 7));\n    }\n}`
    }
  },
  {
    id: 'bubble-sort', title: 'Bubble Sort', difficulty: 'Beginner', category: 'Sorting',
    desc: 'Sort by repeatedly swapping adjacent elements that are out of order.',
    timeComplexity: 'O(n²)', spaceComplexity: 'O(1)',
    steps: ['Compare adjacent pairs of elements.','Swap them if they are in the wrong order.','After each pass, the largest unsorted element bubbles to its correct position.','Repeat until no swaps are needed.'],
    implementations: {
      Python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
      JavaScript: `function bubbleSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n; i++) {\n    let swapped = false;\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n  }\n  return arr;\n}\n\nconsole.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));`,
      'C++': `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}\n\nint main() {\n    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(arr);\n    for (int x : arr) cout << x << " ";\n}`,
      Java: `public class BubbleSort {\n    static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n; i++) {\n            boolean swapped = false;\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                    swapped = true;\n                }\n            }\n            if (!swapped) break;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        bubbleSort(arr);\n        for (int x : arr) System.out.print(x + " ");\n    }\n}`
    }
  },
  {
    id: 'selection-sort', title: 'Selection Sort', difficulty: 'Beginner', category: 'Sorting',
    desc: 'Sort by finding the minimum and placing it at the beginning.',
    timeComplexity: 'O(n²)', spaceComplexity: 'O(1)',
    steps: ['Find the minimum element in the unsorted portion.','Swap it with the first unsorted element.','Move the boundary of sorted portion one step right.','Repeat until the entire array is sorted.'],
    implementations: {
      Python: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i + 1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))`,
      JavaScript: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    }\n    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n  }\n  return arr;\n}\n\nconsole.log(selectionSort([64, 25, 12, 22, 11]));`,
      'C++': `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid selectionSort(vector<int>& arr) {\n    for (int i = 0; i < arr.size(); i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < arr.size(); j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        swap(arr[i], arr[minIdx]);\n    }\n}\n\nint main() {\n    vector<int> arr = {64, 25, 12, 22, 11};\n    selectionSort(arr);\n    for (int x : arr) cout << x << " ";\n}`,
      Java: `public class SelectionSort {\n    static void selectionSort(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < arr.length; j++) {\n                if (arr[j] < arr[minIdx]) minIdx = j;\n            }\n            int temp = arr[i];\n            arr[i] = arr[minIdx];\n            arr[minIdx] = temp;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        selectionSort(arr);\n        for (int x : arr) System.out.print(x + " ");\n    }\n}`
    }
  },
  {
    id: 'insertion-sort', title: 'Insertion Sort', difficulty: 'Beginner', category: 'Sorting',
    desc: 'Build a sorted array one element at a time.',
    timeComplexity: 'O(n²)', spaceComplexity: 'O(1)',
    steps: ['Start from the second element.','Compare the current element with elements in the sorted portion.','Shift larger elements to the right.','Insert the current element in its correct position.'],
    implementations: {
      Python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\nprint(insertion_sort([12, 11, 13, 5, 6]))`,
      JavaScript: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    const key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}\n\nconsole.log(insertionSort([12, 11, 13, 5, 6]));`,
      'C++': `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid insertionSort(vector<int>& arr) {\n    for (int i = 1; i < arr.size(); i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nint main() {\n    vector<int> arr = {12, 11, 13, 5, 6};\n    insertionSort(arr);\n    for (int x : arr) cout << x << " ";\n}`,
      Java: `public class InsertionSort {\n    static void insertionSort(int[] arr) {\n        for (int i = 1; i < arr.length; i++) {\n            int key = arr[i];\n            int j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6};\n        insertionSort(arr);\n        for (int x : arr) System.out.print(x + " ");\n    }\n}`
    }
  },
  {
    id: 'stack-operations', title: 'Stack Operations', difficulty: 'Beginner', category: 'Data Structures',
    desc: 'Last-In-First-Out (LIFO) data structure operations.',
    timeComplexity: 'O(1) per operation', spaceComplexity: 'O(n)',
    steps: ['Push: Add an element to the top of the stack.','Pop: Remove and return the top element.','Peek: View the top element without removing it.','All operations run in constant time O(1).'],
    implementations: {
      Python: `class Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n\n    def peek(self):\n        if not self.is_empty():\n            return self.items[-1]\n\n    def is_empty(self):\n        return len(self.items) == 0\n\ns = Stack()\ns.push(10)\ns.push(20)\nprint(s.pop())   # 20\nprint(s.peek())  # 10`,
      JavaScript: `class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(item) { this.items.push(item); }\n  pop() { return this.items.pop(); }\n  peek() { return this.items[this.items.length - 1]; }\n  isEmpty() { return this.items.length === 0; }\n}\n\nconst s = new Stack();\ns.push(10);\ns.push(20);\nconsole.log(s.pop());   // 20\nconsole.log(s.peek());  // 10`,
      'C++': `#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    stack<int> s;\n    s.push(10);\n    s.push(20);\n\n    cout << s.top() << endl;  // 20\n    s.pop();\n    cout << s.top() << endl;  // 10\n    cout << "Empty? " << s.empty() << endl;\n    return 0;\n}`,
      Java: `import java.util.Stack;\n\npublic class StackDemo {\n    public static void main(String[] args) {\n        Stack<Integer> s = new Stack<>();\n        s.push(10);\n        s.push(20);\n\n        System.out.println(s.pop());   // 20\n        System.out.println(s.peek());  // 10\n        System.out.println(s.isEmpty()); // false\n    }\n}`
    }
  },
  {
    id: 'queue-operations', title: 'Queue Operations', difficulty: 'Beginner', category: 'Data Structures',
    desc: 'First-In-First-Out (FIFO) data structure operations.',
    timeComplexity: 'O(1) per operation', spaceComplexity: 'O(n)',
    steps: ['Enqueue: Add an element to the rear of the queue.','Dequeue: Remove and return the front element.','Using collections.deque for efficient O(1) operations.','Useful for BFS, task scheduling, and buffering.'],
    implementations: {
      Python: `from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n\n    def enqueue(self, item):\n        self.items.append(item)\n\n    def dequeue(self):\n        if not self.is_empty():\n            return self.items.popleft()\n\n    def is_empty(self):\n        return len(self.items) == 0\n\nq = Queue()\nq.enqueue("A")\nq.enqueue("B")\nprint(q.dequeue())  # A`,
      JavaScript: `class Queue {\n  constructor() {\n    this.items = [];\n  }\n  enqueue(item) { this.items.push(item); }\n  dequeue() { return this.items.shift(); }\n  peek() { return this.items[0]; }\n  isEmpty() { return this.items.length === 0; }\n}\n\nconst q = new Queue();\nq.enqueue("A");\nq.enqueue("B");\nconsole.log(q.dequeue()); // A`,
      'C++': `#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    queue<string> q;\n    q.push("A");\n    q.push("B");\n\n    cout << q.front() << endl;  // A\n    q.pop();\n    cout << q.front() << endl;  // B\n    return 0;\n}`,
      Java: `import java.util.LinkedList;\nimport java.util.Queue;\n\npublic class QueueDemo {\n    public static void main(String[] args) {\n        Queue<String> q = new LinkedList<>();\n        q.add("A");\n        q.add("B");\n\n        System.out.println(q.poll());  // A\n        System.out.println(q.peek());  // B\n    }\n}`
    }
  },
  {
    id: 'recursion', title: 'Recursion', difficulty: 'Intermediate', category: 'Concepts',
    desc: 'Solve problems by having functions call themselves.',
    timeComplexity: 'Varies', spaceComplexity: 'O(n) call stack',
    steps: ['A recursive function calls itself with a smaller input.','Every recursion needs a base case to stop.','The problem is broken down until it reaches the base case.','Results are combined as the call stack unwinds.'],
    implementations: {
      Python: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(factorial(5))    # 120\nprint(fibonacci(7))    # 13`,
      JavaScript: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(factorial(5));   // 120\nconsole.log(fibonacci(7));   // 13`,
      'C++': `#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n    cout << factorial(5) << endl;   // 120\n    cout << fibonacci(7) << endl;   // 13\n}`,
      Java: `public class Recursion {\n    static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n\n    static int fibonacci(int n) {\n        if (n <= 1) return n;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(factorial(5));   // 120\n        System.out.println(fibonacci(7));   // 13\n    }\n}`
    }
  },
];
