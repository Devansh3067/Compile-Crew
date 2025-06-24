# 🚀 CodeFlux

CodeFlux is a real-time collaborative code editor built with React, Socket.io, and an AI Code Reviewer. This project allows multiple users to edit code simultaneously while providing automated code reviews.

## 👨‍💻 Authors
**Created by the Compile Crew Team**

## 📚 Table of Contents
- [📖 Introduction](#-introduction)
- [✨ Features](#-features)
- [🔧 Getting Started](#-getting-started)
  - [⚙️ Prerequisites](#-prerequisites)
  - [💻 Installation](#-installation)
- [🚀 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🤖 AI Code Reviewer](#-ai-code-reviewer)
- [🤝 Contributing](#-contributing)
- [📬 Contact](#-contact)

## 📖 Introduction
CodeFlux enables real-time code collaboration, making it easier for teams to work together on coding projects. It uses React for the front-end, Node.js for the backend, and Socket.io for real-time communication.

## ✨ Features
- ⚡ Real-time code synchronization.
- 👥 Collaborative editing.
- 🖥️ User-friendly and responsive interface.
- 🤖 AI Code Reviewer for automatic code quality checks.
- ⚙️ Easy setup and deployment.

## 🔧 Getting Started

### ⚙️ Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### 💻 Installation
#### Clone the repository:
```bash
git clone https://github.com/CompileCrew/CodeFlux.git
cd CodeFlux
```

#### Start the development servers:
Frontend:
```bash
cd frontend
npm install  # to install dependencies.
npm run dev  # or yarn dev
```
Backend:
```bash
cd backend
npm install  # to install dependencies.
npm run start
```
#### Open your browser and navigate to:
```
http://localhost:5173
```

## 🚀 Usage
- Open multiple tabs or invite others to collaborate.
- AI Code Reviewer automatically analyzes code and provides feedback.

## 📁 Project Structure
```
CodeFlux/
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── README.md
│
│── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.jsx
│   │   │   ├── Client.jsx
│   │   ├── pages/
│   │   │   ├── EditorPage.jsx
│   │   │   ├── Home.jsx
│   │   ├── Action.js
│   │   |
│   │   |
│   │   ├── styles/
│   │   │   ├── App.css
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── socket.js
│   │   ├── index.css
│   |
│   ├── .gitignore
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
```

## 🤖 AI Code Reviewer
The AI Code Reviewer automatically analyzes code changes and provides feedback on best practices, performance, and security improvements.

## 🤝 Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit (`git commit -m 'Add new feature'`).
5. Push (`git push origin feature/your-feature-name`).
6. Open a pull request.

## 📬 Contact
- **Team Name**: Compile Crew
- **GitHub**: [CompileCrew](https://github.com/CompileCrew)
- **Instagram**: [@compilecrew](https://www.instagram.com/compilecrew/)

---
Happy coding! 🎉

