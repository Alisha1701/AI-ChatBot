# 🎭 Scaler Persona Chat

> AI-powered chatbot that lets you have real conversations with three Scaler/InterviewBit personalities — **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**.

![Scaler Persona Chat](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs) ![Gemini](https://img.shields.io/badge/Gemini_2.0-Flash-blue?style=flat-square&logo=google) ![Deploy](https://img.shields.io/badge/Deploy-Vercel-000?style=flat-square&logo=vercel)

## 🚀 Live Demo

**[🔗 View Live App](https://ai-chatbot.vercel.app)**

## ✨ Features

- **Three Distinct Personas** — Each with carefully researched system prompts based on real backgrounds
- **Persona Switcher** — Seamlessly switch between Anshuman, Abhimanyu, and Kshitij with conversation reset
- **Suggestion Chips** — Quick-start questions tailored to each persona
- **Typing Indicator** — Animated dots while waiting for AI response
- **Error Handling** — Graceful error messages if API calls fail
- **Mobile Responsive** — Works beautifully on all screen sizes
- **Dark Theme** — Premium dark UI with glassmorphism effects

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | CSS (Custom dark theme with animations) |
| AI Model | Google Gemini 2.0 Flash |
| Deployment | Vercel |

## 📋 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A Google AI Studio API key ([Get one here](https://aistudio.google.com/apikey))

### 1. Clone the repository
```bash
git clone https://github.com/Alisha1701/AI-ChatBot.git
cd AI-ChatBot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your Google API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # API endpoint (keeps API key server-side)
│   │   ├── globals.css          # Full UI styling
│   │   ├── layout.tsx           # Root layout with SEO meta tags
│   │   └── page.tsx             # Main chat interface
│   └── lib/
│       └── personas.ts          # All 3 persona definitions & system prompts
├── prompts.md                   # Annotated system prompts documentation
├── reflection.md                # 300-500 word reflection
├── .env.example                 # Environment variable template
├── .env.local                   # Your local API key (gitignored)
└── README.md                    # This file
```

## 🧠 Prompt Engineering Techniques

Each persona's system prompt includes:
1. **Persona Description** — Detailed background, values, and communication style
2. **Few-Shot Examples** — 3 example conversations demonstrating the persona's voice
3. **Chain-of-Thought** — Step-by-step reasoning instructions before responding
4. **Output Instructions** — Format, length, and style constraints
5. **Constraints** — Guardrails on what the persona should never do

See [`prompts.md`](./prompts.md) for the full annotated prompts.

## 🔒 Security

- API key is stored in `.env.local` (gitignored)
- API calls are made server-side via Next.js API routes
- No API key is ever exposed to the browser

## 📄 License

MIT
