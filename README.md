<div align="center">
  
# 🌊 FlowCode AI
**Visual Logic Translator**

[![React](https://img.shields.io/badge/React-18.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-latest-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Hackathon_Build-success.svg?style=for-the-badge)](#)

*FlowCode AI bridges the gap between natural logic and functional code, empowering developers to seamlessly translate, understand, and master algorithms across multiple programming languages.*

</div>

## 🚀 Overview (Hackathon Edition)
FlowCode AI is built to make algorithmic logic universally accessible. Designed with a premium glassmorphism aesthetic, this platform allows users to input natural language or pseudo-code and receive highly optimized, multi-language code translations. 

*Note: This is our initial Hackathon submission build. We have architected the frontend to be fully resilient and production-ready, utilizing local storage persistence. Post-hackathon, we will be scaling this infrastructure to integrate a full Supabase cloud backend.*

---

## ✨ Core Features

*   **🛠️ Interactive Logic Playground**: Generate, explain, and debug code dynamically. Features simulated LLM token streaming and language toggling.
*   **📚 Curated Algorithm Library**: A comprehensive, searchable database of 15+ standard algorithms (Searching, Sorting, Graphs, DP). Compare implementations across **Python, JavaScript, C++, and Java** instantly.
*   **🎮 Gamified Learning**: Test your logic skills in the Games module with interactive quizzes and persistent local scoring.
*   **📊 Analytics Dashboard**: Track your translation metrics, success rates, and learning progression over time.
*   **🌐 Peer Network**: A beautifully designed community module showcasing leaderboards and developer streaks.

---

## 💻 Tech Stack
*   **Frontend Framework**: React 18
*   **Build Tool**: Vite (for sub-second HMR)
*   **Styling**: Pure Vanilla CSS (Custom Glassmorphism Design System, CSS Variables, Micro-animations)
*   **Icons**: Lucide React
*   **Persistence**: Browser `localStorage` (Cloud-ready for Supabase migration)

---

## 🛠️ Local Installation

To run FlowCode AI on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lochangowda10/Flow-Code-AI.git
   cd "Flow-Code-AI"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` to explore the platform.

---

## 🛣️ Post-Hackathon Roadmap (Scaling to Production)
While this hackathon build operates seamlessly in the browser using client-side persistence, our architecture is strictly mapped to our planned backend schema. 

**Upcoming Integrations:**
*   **Supabase Backend**: Migrating `localStorage` data to a live PostgreSQL database.
*   **Auth Flow**: Integrating OAuth via Supabase Auth for cross-device progress syncing.
*   **Live LLM Engine**: Hooking up the Playground view to live Gemini/OpenAI API endpoints for real-time inference.

---

<div align="center">
  <i>Built with ❤️ for the Hackathon</i>
</div>
