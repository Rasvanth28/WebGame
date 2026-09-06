# 🌌 Space Combat Web Game

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Three.js](https://img.shields.io/badge/three.js-3D-black?logo=three.js)

## 📖 Abstract

The Space Combat Web Game is a real-time, browser-based multiplayer 3D simulation built on a client-server architecture. Utilizing Three.js for frontend rendering and Socket.io for low-latency bidirectional communication, the system models dynamic space physics, persistent pilot sessions, and real-time projectile collision across a simulated solar system environment.

## 🏗 Architecture & Pipeline

The system is split into two primary components communicating over WebSockets:

1.  **Frontend Rendering Engine (Client)**
    *   **3D Scene Graph:** Powered by Three.js to render astronomical bodies, player spacecraft, and projectile trajectories.
    *   **Interpolation & Extrapolation:** Smooths out network jitter and latency by locally predicting entity movements between state broadcasts.
    *   **Input Polling:** Captures and serializes client inputs (throttle, rotation, firing) for transmission to the master state server.

2.  **Master State Server (Backend)**
    *   **Authoritative Game Loop:** Maintains the true physical state of all players, planets, and projectiles, ticking at a fixed broadcast rate (typically ~33Hz).
    *   **Session Persistence:** Implements a token-based registry decoupling socket connections from pilot data. Disconnected players persist for a defined timeout (e.g., 10 minutes) before state cleanup.
    *   **Collision Detection:** Computes intersections between bounding volumes of ships and projectiles, applying cooldown heuristics to prevent event spam.

## 💻 Tech Stack

*   **Client:** Vite, Three.js, Socket.io-Client, HTML5/CSS3
*   **Server:** Node.js, Express.js, Socket.io, CORS
*   **Process Management:** Concurrently (for local development)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd WebGame
    ```
2.  Install all dependencies:
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    cd ..
    ```

### Execution

To run both the frontend development server and the backend master state server simultaneously:

```bash
npm run dev
```

*   **Client:** Accessible at the local Vite port (usually `http://localhost:5173`).
*   **Server:** Running on the configured environment port or defaulting to `http://localhost:3000`.

### Deployment

To build the client for production deployment (e.g., to GitHub Pages):
```bash
cd client
npm run deploy
```
