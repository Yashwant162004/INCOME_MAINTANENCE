# Premium Smart Expense Tracker

A full-stack fintech dashboard with React, Node.js, and MongoDB.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed
- Local MongoDB running at `mongodb://localhost:27017`

### 2. Backend Setup
```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
```bash
# In the root directory
npm install
npm run dev
```
The app will run on `http://localhost:5173`.

## 🛠️ Features
- **Authentication**: JWT-based Signup/Login with MongoDB.
- **Dashboard**: Real-time spending overview with "🤝 Hello" greeting.
- **Profile**: View and update your personal information.
- **Transactions**: Full CRUD for income and expenses.
- **Analytics**: Visual breakdowns of your financial habits.

## 🔑 Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/income-tracker
JWT_SECRET=your_jwt_secret
```
