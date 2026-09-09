# React Portfolio (Vite + TypeScript)

A modern developer portfolio built with React + Vite + TypeScript.

## Table of Contents
* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Available Scripts](#available-scripts)
* [Features](#features)
* [Author](#author)

## About the Project

A modern developer portfolio showcasing skills and completed projects. The site was built with interactivity, a modern look, and responsiveness in mind. It uses technologies like React, Vite, and TypeScript to create a dynamic and efficient user interface.

## Built With

The main technologies and libraries used in this project:
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Router DOM](https://reactrouter.com/)
* [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) & [@react-three/drei](https://github.com/pmndrs/drei) (for interactive 3D elements)
* [tsparticles](https://particles.js.org/) (for background particle animations)
* CSS (for styling)

## Getting Started

To run the project locally, follow these instructions.

### Prerequisites

Make sure you have the following tools installed:
* Node.js (LTS version recommended)
  ```sh
  node -v
  ```
* npm (usually installed with Node.js)
  ```sh
  npm -v
  ```

### Installation

1.  Clone the repository (if you haven't already):
    ```bash
    git clone https://github.com/Tolemak/portfolio-react.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd portfolio-react
    ```
3.  Install the project dependencies:
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`
Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) (or another port shown in the console) to view it in the browser.
The page will automatically reload when you make changes to the code.

### `npm run build`
Builds the app for production to the `dist/` directory.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`
Runs ESLint to analyze the code for potential errors and code style issues.

### `npm run preview`
Runs a local production server for the built app from the `dist/` directory. This allows you to test the production version before deployment.

## Features
- Hero section with an animated background
- Sections: projects, skills, experience, education, about me
- Top navigation with highlighting
- Responsive design
- Dark and light theme
- WOW mode: a 3D flight through a space station as the home page, with a non-3D Classic mode as an alternative
- Bilingualism (PL/EN) and a language switcher
- Tiled, modern cards with glassmorphism
- Consistent modals and skill tags

## Author

Kamil Gałkowski
- GitHub: [Tolemak](https://github.com/Tolemak)
