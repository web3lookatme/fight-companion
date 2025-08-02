# Fight Companion

**The ultimate destination for fight fans.**

Fight Companion is a modern, feature-rich web application built with React, TypeScript, and Vite. It provides a comprehensive database of fighters, events, and news, complete with detailed statistics, head-to-head comparisons, and a community commenting system.

## Features

- **Detailed Fighter Profiles:** View in-depth statistics, attributes, and fight histories for a roster of fighters.
- **Head-to-Head Comparison:** Compare fighters against each other with a detailed "Tale of the Tape" and visual bar chart breakdown.
- **Event Schedules:** Stay up-to-date with upcoming fight cards and event details.
- **Latest News:** Keep up with the latest happenings in the world of combat sports.
- **Favorites System:** Save your favorite fighters for quick and easy access.
- **Community Comments:** Engage in discussions on news articles and event pages.
- **Dynamic UI:** Enjoy a polished user experience with smooth page transitions, skeleton loaders, and toast notifications.
- **Search and Filter:** Easily find fighters by name or weight class.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **Notifications:** React Hot Toast
- **Mock API:** JSON Server

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd fight-companion
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

This application requires two separate processes to be running in parallel: the mock API server and the Vite development server.

1.  **Start the Mock API:**
    Open a terminal and run the following command to start the `json-server`. This will serve the application's data from `db.json` on port 3001.
    ```bash
    npm run api
    ```
    Leave this terminal running.

2.  **Start the Development Server:**
    Open a second terminal and run the following command to start the Vite development server.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build of the application, run the following command:

```bash
npm run build
```

This will generate a `dist` directory containing the optimized, static assets of the application.

### Serving the Production Build

To serve the production build locally, use the `start` script. This is a great way to preview the final application before deploying it.

```bash
npm run start
```

This will serve the contents of the `dist` directory on a local server (typically on port 3000).

### Running Tests

This project uses Vitest for unit and component testing. To run the test suite, use the following command:

```bash
npm test
```

---

This project was built with the assistance of a cutting-edge AI software engineering agent.