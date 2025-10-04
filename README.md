# 🏪 Store Rating System

A **full-stack web application** that allows users to submit ratings for stores registered on the platform.  
Built with **React.js**, **Node.js**, **Express.js**, and **PostgreSQL**.

---

## 🌟 Features

### 👥 User Roles
- **System Administrator**: Manage users, stores, and view analytics  
- **Store Owner**: View store dashboard and ratings  
- **Normal User**: Browse stores and submit ratings  

### ⚙️ Key Functionalities
- User authentication (Login/Signup)  
- Role-based access control  
- Store management  
- Rating submission (1–5 stars)  
- Search and filter capabilities  
- Responsive design  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Material-UI (MUI)  
- React Router DOM  
- React Hook Form  
- Axios  
- React Context API  

### **Backend**
- Node.js  
- Express.js  
- PostgreSQL  
- Sequelize ORM  
- JWT Authentication  
- Bcrypt.js  

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)  
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)  
- npm or yarn  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/store-rating-system.git
cd store-rating-system
2️⃣ Database Setup
Create PostgreSQL Database
sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE store_rating_system;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE store_rating_system TO storeapp;
```
3️⃣ Backend Setup
Navigate to Backend Directory
cd backend
Install Dependencies
npm install
Environment Configuration
Create a .env file in the backend directory:
```
```
env for backend
PORT=5001
DATABASE_URL=postgresql://username:Password@localhost:5432/store_rating_db
JWT_SECRET=<jwt-secret-key>

NODE_ENV=development

# Production mode
npm  run dev
Backend will run at 👉 http://localhost:5000

4️⃣ Frontend Setup
Navigate to Frontend Directory
cd ../frontend
Install Dependencies
npm install
Environment Configuration
Create a .env file in the frontend directory:
frontend .env:
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=Store Rating System
Start Frontend Development Server
- npm start
- Frontend will run at 👉 http://localhost:3000
```
```
👤 Default Credentials
Admin credentials are created bydefault.

💡 Author
KONIOSH

📜 License
This project is licensed under the MIT License – feel free to use and modify it as needed.

⭐ If you like this project, don't forget to give it a star on GitHub!
