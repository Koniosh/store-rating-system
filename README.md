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
📁 Project Structure
text
Copy code
store-rating-system/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express app setup
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env                # Environment variables
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/     # React components
    │   ├── contexts/       # React contexts
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main App component
    │   └── index.js        # React entry point
    ├── package.json
    └── .env                # Environment variables
```
```
🔑 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	User login
GET	/api/auth/me	Get current user
PUT	/api/auth/update-password	Update password

👤 Users (Admin only)
Method	Endpoint	Description
GET	/api/users	Get all users
POST	/api/users	Create new user
GET	/api/users/:id	Get user by ID
PUT	/api/users/:id	Update user
DELETE	/api/users/:id	Delete user

🏪 Stores
Method	Endpoint	Description
GET	/api/stores	Get all stores
POST	/api/stores	Create new store (Admin)
GET	/api/stores/:id	Get store by ID
PUT	/api/stores/:id	Update store (Admin)
DELETE	/api/stores/:id	Delete store (Admin)

⭐ Ratings
Method	Endpoint	Description
POST	/api/ratings/stores/:storeId	Submit rating
PUT	/api/ratings/stores/:storeId	Update rating
GET	/api/ratings/my-ratings	Get user's ratings

🗄️ Database Schema
Users Table
Column	Type	Description
id	Primary Key	Unique identifier
name	String (2–60 chars)	User name
email	String (unique)	User email
password	String (hashed)	Hashed password
address	String (max 400 chars)	User address
role	Enum (admin, user, store_owner)	User role

Stores Table
Column	Type	Description
id	Primary Key	Unique identifier
name	String (2–60 chars)	Store name
email	String (unique)	Store email
address	String (max 400 chars)	Store address
ownerId	Foreign Key → Users	Store owner reference

Ratings Table
Column	Type	Description
id	Primary Key	Unique identifier
value	Integer (1–5)	Rating value
userId	Foreign Key → Users	Reference to user
storeId	Foreign Key → Stores	Reference to store
Unique	(userId, storeId)	Prevent duplicate ratings

👤 Default Credentials
After setup, create an admin user by running:

cd backend
node src/seeders/create-admin.js
Or manually insert an admin user in the database.

💡 Author
KONIOSH

📜 License
This project is licensed under the MIT License – feel free to use and modify it as needed.

⭐ If you like this project, don't forget to give it a star on GitHub!
