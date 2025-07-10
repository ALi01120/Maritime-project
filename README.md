# Maritime Education System & Job Portal

A web-based platform that connects maritime students with educational resources and job opportunities. The platform allows users to explore courses, apply for jobs, and communicate through an integrated messaging system.

---

## 🌟 Features

- 🧑‍💻 User Authentication (Login/Signup)
- 📚 Course Listings & Enrollment
- 💼 Job Postings & Applications
- 💬 Messaging System between users
- ⚙️ Admin Dashboard to manage users, jobs, and courses
- 🔍 Advanced Search & Filtering

---

## 🛠 Tech Stack

**Frontend:**
- React.js  
- HTML5, CSS3  
- Axios

**Backend:**
- Node.js  
- Express.js  
- JWT Authentication

**Database:**
- MySQL

**Others:**
- RESTful APIs  
- AWS (for deployment or storage if used)  

---

## 📁 Project Structure (Example)

```
/client (React frontend)
  /src
    /components
    /pages
    /api
    App.js

/server (Node.js backend)
  /routes
  /controllers
  /models
  index.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MySQL
- npm

### Installation

1. **Clone the repo**  
```bash
git clone https://github.com/yourusername/maritime-portal.git
cd maritime-portal
```

2. **Install dependencies**  
```bash
cd client
npm install
cd ../server
npm install
```

3. **Configure database**  
Create a MySQL database and update credentials in `server/config/db.js`.

4. **Run the application**  
```bash
# In one terminal
cd server
npm start

# In another terminal
cd client
npm start
```

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
