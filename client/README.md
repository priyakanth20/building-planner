# 🏗️ Building Planner Web Application

A full-stack web application that allows users to draw, annotate, edit, save, load, and export building plans with ease.

---

## 📋 Description

This application provides tools for architects, designers, and planners to create and manipulate building floor plans.  
Users can draw shapes like circles, rectangles, lines; select and resize them; save their work to MongoDB; and export as PNG images.

---

## ✨ Features

- Draw Tools:
  - Circle
  - Rectangle
  - Line
- Select Tool:
  - Move shapes
  - Resize shapes
- View Tool:
  - Show/Hide annotations (dimensions)
- Delete Tools:
  - Delete Last Shape
  - Delete Selected Shape
- Save/Load to MongoDB
- Download Drawing as PNG
- Stylish modern UI with gradient background & icons

---

## 🏗️ Project Structure

/building-planner
├── /client # Frontend (Vue.js 3)
│ ├── src/App.vue
│ ├── public/screenshots/
│ ├── package.json
├── /server # Backend (Node.js + Express.js)
│ ├── server.js
│ ├── models/Drawing.js
│ └── package.json
├── README.md
└── .gitignore

yaml
Copy
Edit

---

## 💻 Tech Stack

- **Frontend:** Vue.js 3 (Composition API)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Development Tool:** Visual Studio Code

---

## 🚀 Setup Instructions

### Backend (Server)
cd server
npm install
node server.js

markdown
Copy
Edit
- Runs at: [http://localhost:3000](http://localhost:3000)

### Frontend (Client)
cd client
npm install
npm run serve

yaml
Copy
Edit
- Runs at: [http://localhost:8080](http://localhost:8080)

---

## ✅ Manual Test Cases

| Test Case | Action                              | Expected Result                     | Status |
|-----------|------------------------------------|-------------------------------------|--------|
| TC-01     | Draw Circle → Save → Reload        | Circle visible after reload         | Pass   |
| TC-02     | Draw Rectangle → Delete Last       | Rectangle removed                   | Pass   |
| TC-03     | Draw Line → Select → Move          | Line moved to new position          | Pass   |
| TC-04     | Draw shapes → Download as Image    | PNG image downloaded successfully   | Pass   |

---

## 📸 Screenshots (Optional)

*Insert screenshots here in `client/public/screenshots/`*

Example:

yaml
Copy
Edit

---

## ✔️ Completion Checklist

- [x] Drawing Tools (Circle, Rectangle, Line)
- [x] Select / Move / Resize
- [x] View Tool (Annotations Show/Hide)
- [x] Delete Tools
- [x] Save/Load (MongoDB)
- [x] Download as PNG
- [x] Modern Gradient UI
- [x] Clean, Lint-Free Code
- [x] Uploaded to GitHub
- [x] Documentation Ready

---

## ⏱️ Time Spent

**5 to 6 hours** (as per assignment estimation)

---

## 👤 Author

- Name: *Haripriya L*
- Email: *haripriya6674@gmail.com*
- GitHub: [https://github.com/priyakanth20](https://github.com/priyakanth20)

---

## 🛡️ Disclaimer

This project is built for academic, demonstration, and learning purposes only.
