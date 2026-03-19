# 🚀 Real-Time Location Tracker

A full-stack real-time web application that enables multiple users to share and visualize their live locations on an interactive map. Built using **Node.js, Express, Socket.IO, and Leaflet**, the system supports live updates, user identification, and movement tracking.

---

## 📌 Features

* 🔴 **Real-Time Location Tracking**
  Uses Socket.IO for instant bidirectional communication between clients and server.

* 👥 **Multi-User Support**
  Multiple users can join and share their live location simultaneously.

* 🧑 **User Identification**
  Each user is represented with a unique name on the map.

* 🗺️ **Interactive Map (Leaflet.js)**
  Displays user locations with markers and popups.

* 📍 **Movement History Tracking**
  Visualizes user paths using polylines.

* 🔄 **Live Updates**
  Automatically updates positions without refreshing the page.

* ❌ **Disconnect Handling**
  Removes users from the map when they disconnect.

---

## 🛠️ Tech Stack

**Frontend:**

* HTML, CSS, JavaScript
* Leaflet.js (Map rendering)
* Socket.IO Client

**Backend:**

* Node.js
* Express.js
* Socket.IO

---

## 📂 Project Structure

```
RealTime-Tracker/
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│
├── views/
│   └── index.ejs
│
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/realtime-tracker.git
cd realtime-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
```

### 4. Run the server

```bash
npm start
```

### 5. Open in browser

```
http://localhost:3000
```

---

## 📡 How It Works

1. User enters a name and joins the session.
2. Browser fetches geolocation using `navigator.geolocation`.
3. Location data is sent to the server via Socket.IO.
4. Server broadcasts updated user data to all connected clients.
5. Map updates in real-time with:

   * User markers
   * Names
   * Movement paths

---

## 🧠 Key Concepts Implemented

* WebSockets using Socket.IO
* Real-time event broadcasting
* Geolocation API integration
* State management for connected users
* Dynamic DOM & map updates
* Polyline-based path visualization

---

## 📸 Screenshots

> *(Add screenshots here for better presentation)*

---

## 🚀 Future Improvements

* 🔐 Authentication (JWT / OAuth)
* 🗄️ Store location history in database (MongoDB)
* 📱 Mobile responsiveness
* 🌐 Deployment (Render / Railway / AWS)
* 🧑‍🤝‍🧑 Room-based tracking (private groups)
* 📍 Manual location override

---

## 🧾 Resume Highlight

> Built a real-time multi-user location tracking system using Node.js, Express, Socket.IO, and Leaflet, enabling live position updates, user identification, and movement path visualization on an interactive map.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Yash Tiwari**
Aspiring Full Stack Developer

---
