🚀 Multi-Framework Ticket Management Project
This repository hosts a demonstration of a multi-framework application architecture deployed as a consolidated static site on Vercel.

The project is a Ticket Management System (named TicketFlow) implemented in three distinct frontend frameworks: React, Vue, and plain Twig/HTML/JavaScript. The root directory acts as a container, using custom scripts to build and merge all three applications into a single /dist output directory for seamless deployment.

🌐 Live Application Links
Application,Framework,Deployment URL,Notes

Main Selector,HTML/CSS/JS - https://multi-ticket.vercel.app/,- Entry point for selecting the desired app.

React App,React + Vite - https://multi-ticket.vercel.app/deploy/react-app/,Full CRUD implementation with dynamic stats.

Vue App,Vue 3 + Vite - https://multi-ticket.vercel.app/deploy/vue-app/,Full CRUD implementation with dynamic stats.

Twig App,Static Twig/JS - https://multi-ticket.vercel.app/twig-app/static/index.html,Simple HTML/JS/CSS implementation (server-side logic is mocked).

💡 Application Overview
The core purpose is to demonstrate how a single development project can successfully manage and deploy different versions of the same core application, built with varying technologies.

App Folder,Purpose & Features,Key Technologies
react-app/,"Feature-rich Single Page Application (SPA). Includes full CRUD (Create, Read, Update, Delete) for tickets and a dynamic Dashboard that reflects real user-created data (using localStorage for persistence).","React, React Router, Vite"
vue-app/,"Feature-rich Single Page Application (SPA). Includes full CRUD and a dynamic Dashboard, demonstrating Vue's Composition API and reactivity system (using localStorage for persistence).","Vue 3, Vue Router, Vite"
twig-app/,"Represents a traditional server-rendered application. The client-side logic (login, ticket CRUD) is handled via plain JavaScript and localStorage. Deployed as static HTML files.","HTML, CSS3, Vanilla JavaScript"

🔄 How to Switch Between Applications
From the Main Selector Page
The main entry point (https://multi-ticket.vercel.app/) provides links to all three versions. This is the intended primary method for switching.

From Within an Application
Each application's Landing Page (which you see when logged out) contains a subtle link to return to the Main App Selection page.

React App: Link is on the main marketing page (/).

Vue App: Link is on the main marketing page (/).

Twig App: Link is on index.html.

⚙️ Development and Deployment
The project uses a specialized build process to ensure all three applications can be built and served correctly from Vercel's static hosting environment.

Project Structure
.
├── react-app/    (React source code)
├── vue-app/      (Vue source code)
├── twig-app/     (Twig/Static source code)
├── build-copy.js (Custom script to merge apps)
├── package.json  (Root commands)
└── Vercel settings route traffic...

The Consolidated Build Process
The entire deployment is driven by a single command defined in the root package.json:

JSON

"build": "npm run clean && npm run install:subapps && npm run build:react && npm run build:vue && node build-copy.js"
npm run clean: Clears the old /dist directory.

npm run install:subapps: Runs npm install inside both react-app and vue-app to install necessary build dependencies (e.g., Vite plugins).

npm run build:react: Builds the production static assets for the React app into /react-app/dist.

npm run build:vue: Builds the production static assets for the Vue app into /vue-app/dist.

node build-copy.js:

Consolidates: Copies all built files (/react-app/dist, /vue-app/dist, and the static twig-app/static files) into the final root /dist folder.

Renames: Ensures all files are placed in the correct sub-paths (e.g., dist/deploy/react-app/index.html) to support Vercel routing.

Vercel Configuration
The Vercel Framework Preset is set to "Other" with the following critical settings:

Build Command: npm run build

Output Directory: dist