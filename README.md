# 🏆 Smart Sports Management System

A full-stack MERN web application for managing sports activities including teams, players, coaches, matches, bookings, and AI-powered features.

## 🌐 Live Demo

🔗 **Frontend:** [smart-sports-project.vercel.app](https://smart-sports-project.vercel.app)  
🔗 **Backend API:** [sports-backend-u3ci.onrender.com](https://sports-backend-u3ci.onrender.com)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT |
| File Upload | Cloudinary |
| AI Features | Google Gemini API |
| Real-time Chat | Socket.io |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## ✨ Features

### 👤 User
- Register & Login
- View Sports, Teams, Matches
- Book match seats
- AI Sport Suggestion
- AI Chatbot
- Contact form

### 🧑‍💼 Coach
- Register as Coach
- Manage Teams & Players
- Apply for Matches
- Real-time Chat with Admin
- View Announcements

### 🔐 Admin
- Full Dashboard with statistics
- Manage Users, Coaches, Players
- Add/Update Sports, Teams, Matches
- Manage Bookings & Match Applications
- Post Announcements
- AI Attendance Prediction

---

## 📁 Project Structure

```
Smart-Sports-Project/
├── frontend/          # React.js (Vite) application
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── coach/
│   │   │   ├── user/
│   │   │   ├── auth/
│   │   │   ├── pages/
│   │   │   └── layouts/
│   │   └── services/
│   │       ├── ApiService.js
│   │       └── socketService.js
│   └── ...
└── backend/           # Node.js + Express application
    ├── index.js
    └── server/
        ├── apis/
        │   ├── User/
        │   ├── Coach/
        │   ├── Player/
        │   ├── Team/
        │   ├── Sport/
        │   ├── Match/
        │   ├── Booking/
        │   ├── Announcement/
        │   ├── Chat/
        │   └── AI/
        ├── routes/
        ├── middleware/
        └── config/
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- Git

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

```bash
node index.js
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```env
VITE_API_URL=http://localhost:5001
```

```bash
npm run dev
```

---

## 👨‍💻 Developer

**Alok** — Full Stack Developer  
GitHub: [@alok5824](https://github.com/alok5824)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
