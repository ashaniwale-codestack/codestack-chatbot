# codestackBot
This is a chatbot who scan the repositories files and response to the user queries/questions

# 🤖 AI Chatbot (Local LLM - Ollama + Node + React)

## 🎉 What You Built
A simple AI chatbot that:
- Takes user input from a UI
- Sends it to a backend server
- Uses a local LLM (Llama3 via Ollama) to generate responses
- Displays the response in real-time

---

## 🧠 Tech Stack

### Frontend
- React
- TypeScript

### Backend
- Node.js
- Express
- TypeScript

### AI Model
- Ollama (Llama3)

---

## 📁 Project Structure
project-root/
│
├── backend/
│ ├── src/
│ │ └── index.ts
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ └── App.tsx
│ ├── package.json
│
└── README.md

---

## ⚙️ Prerequisites

Make sure you have installed:

- Node.js (v18+)
- npm
- Ollama

---

## 🧩 Setup Instructions

### 1️⃣ Install Ollama & Model

```bash
ollama pull llama3

Start server:

ollama serve

2️⃣ Backend Setup
cd backend
npm install
npm run dev

Backend will run on:

http://localhost:3000


3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend will run on:

http://localhost:3001
