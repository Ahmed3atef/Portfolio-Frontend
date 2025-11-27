
# 🤖 Cyberpunk Developer Portfolio

> **Status:** `SYSTEM_ONLINE`
> **Architecture:** Decoupled (React Frontend + Django REST Backend)

A high-fidelity, interactive developer portfolio featuring a sci-fi terminal interface, glitch effects, and a particle-based background. This project serves as a digital "Cyberdeck" to showcase skills, projects, and experience using a modern tech stack.

## ✨ Features

  * **🖥️ Terminal Boot Sequence:** Immersive startup animation with simulated logging.
  * **⌨️ Dynamic Typing:** Custom hook-based typing effect for the hero section.
  * **🌌 Particle Neural Network:** Interactive background using `tsparticles`.
  * **⚡ Glitch UI:** Custom CSS animations for headers and hover states.
  * **📱 Responsive Design:** Mobile-adaptive vertical navigation and layouts.
  * **⏳ Experience Timeline:** Auto-alternating left/right timeline layout.
  * **🔌 API Driven:** All content (Profile, Skills, Projects, Awards) is fetched dynamically from a Django backend.

## 🛠️ Tech Stack

### Frontend (Client)

  * **Framework:** [React](https://reactjs.org/) (Vite)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS
  * **Animation:** `tsparticles-slim`, CSS Keyframes
  * **Routing:** `react-router-dom`
  * **HTTP Client:** `axios`

### Backend (Server)

  * **Framework:** [Django](https://www.djangoproject.com/)
  * **API:** Django REST Framework (DRF)
  * **Database:** SQLite (Dev) / PostgreSQL (Prod)
  * **Utilities:** `django-cors-headers`

-----

## 🚀 Installation & Setup

This project requires two terminals running simultaneously: one for the Django backend and one for the React frontend.

### Frontend Setup (React)

Open a new terminal window:

```bash
# Navigate to frontend folder
cd cyberpunk-portfolio/frontend

# Install node modules
npm install

# Run the development server
npm run dev
```

> The frontend will start at `http://localhost:5173/`

-----

## ⚙️ Configuration

### connecting Frontend to Backend

To ensure the React app talks to your Django server, check `src/services/api.js`:

```javascript
// src/services/api.js
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Development
// const API_BASE_URL = 'https://your-production-api.com/api'; // Production

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // ...
});
```

### CORS Configuration (Django)

In `settings.py`, ensure your frontend origin is allowed:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://your-github-pages-url.com",
]
```

-----

## 📦 Deployment

### Frontend (GitHub Pages)

1.  Update `vite.config.js` with `base: '/repo-name/'`.
2.  Update `package.json` with `"homepage"`.
3.  Run `npm run deploy`.

-----

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

> **System Message:** End of line. Connection terminated.