# 🕵️ **Confessions API**

> A backend API for an anonymous messaging platform
> Built with **Node.js**, **Express**, and **MongoDB**

---

## 🌟 Overview

| Feature             | Description                                     |
| ------------------- | ----------------------------------------------- |
| 🔐 Auth             | Hosts (users) must sign in to host a confession |
| 🕶️ Anonymous Input | Anyone can post a confession anonymously        |
| ⏳ Auto Expiry       | Each hosted confession expires after 24 hours   |
| ⛔ Rate Limited      | Prevents abuse with request throttling          |

---

## 📂 File Structure

```
.
├── routes/
│   ├── signup.js       - Signup route
│   ├── login.js        - Login route
│   ├── host.js         - Host confession logic
│   └── users.js        - Anonymous confession logic
├── models/
│   └── mongodbconfig.js
├── middlewares/
│   ├── auth.js
│   └── errorHandler.js
├── index.js
├── .env
└── README.md
```

---

## ⚙️ Setup Guide

### 1. 📦 Install Dependencies

```bash
npm install
```

---

### 2. 🔧 Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
JWTSECRET=your_jwt_secret_here
CONNECTURL=mongodb+srv://<username>:<password>@cluster.mongodb.net/confessions
```

---

### 3. 🚀 Run the Server

```bash
node index.js
```

---

## 📱 API Reference

### 🧑‍💻 Auth Routes

#### `POST /signup`

> Register a new host account

```json
{
  "email": "example@mail.com",
  "password": "yourPassword"
}
```

---

#### `POST /login`

> Login to receive a JWT token

```json
{
  "email": "example@mail.com",
  "password": "yourPassword"
}
```

---

### 🧱 Host Routes (Requires JWT)

Include header:

```
Authorization: Bearer <your_token>
```

---

#### `POST /host/init`

> Host a new confession (valid for 24 hours)

* ❗ One confession per user per 24 hours
* 💥 Returns error if already hosted

---

#### `GET /host/get-confessions`

> Fetch all anonymous confessions for your hosted link

```json
{
  "confessions": [
    { "confession": "You're cool!" },
    ...
  ]
}
```

---

### 🕵️ Anonymous Routes

#### `GET /user/:userId`

> Check if a user's confession is live

---

#### `POST /user/post-confession/:userId`

> Submit an anonymous message

```json
{
  "confession": "Hey, you're doing great!"
}
```

---

## 🔐 Rate Limiting

| Route Group | Limit                |
| ----------- | -------------------- |
| Host Routes | 40 requests / 10 min |
| User Routes | 13 requests / 10 min |

---

## 🧠 How It Works

* Hosting a confession:

  * Creates a record in the `Host` collection with a TTL of 24 hours
  * Allows anonymous confessions to be linked to it

* Anonymous confessions:

  * Saved in the `Conf` collection
  * Expire when the hosting period ends (based on `expiresAt`)

---

## 🛠️ Tech Stack

* **Node.js**, **Express.js**
* **MongoDB** (TTL collections)
* **JWT**, **Passport.js** for auth
* **Bcrypt** for password hashing
* **Helmet**, **Morgan** for security and logging

---

## 📜 License

MIT License

---

## 💬 Feedback & Contributions

Open to suggestions and pull requests. Feel free to contribute!

---
