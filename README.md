# Expense-tracker
Got it 👍
Here is the **FULL modified README.md** with **`.env` removed** and **`YOUR_MONGO_URL` used directly**.

You can **copy-paste this exactly**.

---

# 💰 Expense Tracker Application

The **Expense Tracker Application** is a full-stack mini project developed using **Node.js, Express.js, MongoDB (Atlas)** with a simple and user-friendly frontend.
It allows users to **add, view, update, delete, and analyze expenses** efficiently.

---

## 📌 Problem Statement

Manual expense tracking is inefficient and prone to errors.
This application provides a **digital solution** to manage expenses and generate **monthly summaries**.

---

## 🎯 Objectives

* Build a REST API using Express.js
* Store expense data in MongoDB
* Perform CRUD operations
* Generate monthly expense summaries
* Serve frontend using Express static files

---

## 🚀 Features

* Add new expenses
* View all expenses
* Update and delete expenses
* Filter expenses by customer and category
* Monthly summary by category
* Clean pastel-themed UI

---

## 🛠️ Technologies Used

| Technology            | Purpose          |
| --------------------- | ---------------- |
| Node.js               | Backend runtime  |
| Express.js            | Server framework |
| MongoDB Atlas         | Database         |
| Mongoose              | MongoDB ODM      |
| HTML, CSS, JavaScript | Frontend         |

---

## 📁 Folder Structure

```
expense-tracker/
│
├── models/
│   └── expense.js
│
├── public/
│   └── index.html
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔗 Database Configuration

Replace `YOUR_MONGO_URL` in `server.js` with your MongoDB Atlas connection string.

```js
const MONGO = 'YOUR_MONGO_URL';
```

Example:

```js
const MONGO = 'mongodb+srv://username:password@cluster0.mongodb.net/finance';
```

---

## 📦 Installation Steps

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

### 2️⃣ Navigate to Project Folder

```bash
cd expense-tracker
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start the Server

```bash
node server.js
```

Server runs at:

```
http://localhost:3000
```

---

## 🌐 API Endpoints

### ➕ Add Expense

```
POST /expenses
```

### 📄 Get All Expenses

```
GET /expenses
```

### 🔍 Get Expense by ID

```
GET /expenses/:id
```

### ✏️ Update Expense

```
PUT /expenses/:id
```

### ❌ Delete Expense

```
DELETE /expenses/:id
```

### 📊 Monthly Summary

```
GET /summary/:year/:month
```

---

## 🧪 Sample Expense JSON

```json
{
  "customerId": "C103",
  "category": "Food",
  "amount": 300,
  "date": "2025-02-10",
  "note": "Dinner"
}
```

---

## 🎨 Frontend Description

* Simple HTML form
* Pastel-themed buttons and layout
* Dynamic updates without page reload
* Category-wise summary display

---

## 🧠 Future Enhancements

* Authentication and user accounts
* Expense charts and analytics
* Export reports (PDF / Excel)
* Mobile-friendly UI

---

## 👩‍💻 Author

**Name:** Hansika
**Department:** Information Technology
**Year:** III
**Project Type:** Mini Project

---

## 📌 Conclusion

This project demonstrates how **Node.js, Express, and MongoDB** can be integrated to build a real-world application.
It provides a strong foundation for advanced financial tracking systems.

---

## 📜 License

This project is created **for educational purposes only**.

