# Rivix: A LLM Wrapper for Llama 3.2 🚀  

Rivix is an interactive large language model (LLM) wrapper designed to simplify and enhance the capabilities of Llama 3.2. It provides a responsive user interface where users can input prompts and receive AI-generated code files in real-time. The system is ideal for developers seeking instant, structured responses in the form of HTML, CSS, JavaScript, and more, delivered incrementally for a smooth experience.

---
## ✨ Preview

<a href="https://ibb.co/QFgzwbt"><img src="https://i.ibb.co/nsGZJgt/image.png" alt="image" border="0"></a>

---
## ✨ Features (coming soon) 

- **Real-Time Streaming**: Generates and streams code responses file-by-file for immediate feedback.  
- **Multi-File Support**: Automatically handles multiple file formats such as HTML, CSS, and JavaScript.  
- **Interactive Typing Effect**: Simulates a live AI typing effect for dynamic file rendering.  
- **Customizable UI**: Provides a modern, responsive interface for input and file browsing.  
- **Modular Design**: Backend and frontend are cleanly separated for easier customization and scaling.  

---

## 📂 Project structure

```
Rivix/
├── backend/                 # Backend folder
│   ├── node_modules/        # Backend dependencies (ignored by .gitignore)
│   ├── server.js            # Main backend server file
│   ├── package.json         # Backend package configuration
│   └── .env                 
├── frontend/                # Frontend folder
│   ├── node_modules/        # Frontend dependencies (ignored by .gitignore)
│   ├── src/                 # Source code for frontend
│   │   ├── App.jsx          # Main application component
│   │   ├── FileExplorer.jsx # File rendering component
│   │   └── index.css        # Styling for the app
│   ├── public/              # Public assets (favicon, index.html, etc.)
│   ├── package.json         # Frontend package configuration
│   └── .env                 
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
└── package-lock.json        # (Optional) Lock file for dependencies
```

---
## 🔧 Getting Started

- Make sure you have Ollama (with llama 3.2:3b model running :p)

```bash
#Clone the repo
git clone https://github.com/KingRain/Rivix.git

#Start backend server
cd ./backend/
node server.js

#Start dev server
cd ./frontend/
npm run dev
```
