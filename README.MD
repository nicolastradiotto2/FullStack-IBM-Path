# FullStack-IBM-Path

This repository contains my study path and practical exercises developed during the IBM Full Stack Developer program and additional practice projects.  
It documents the step-by-step progress from the basics of web development to building complete back-end applications with Node.js and Express.

---

## Project Structure

The repository is organized by weeks, following a structured learning path:

- **Week 1–2**: HTML, CSS, and JavaScript fundamentals (practical exercises: to-do list, contact manager, small games).
- **Week 3**: React (components, props, state management, event handling).
- **Week 4**: Node.js and Express (development of a complete CRUD API).

---

## Technologies

- HTML, CSS, JavaScript
- React with Vite
- Node.js and Express
- Git and GitHub

---

## Weekly Progress

### Week 1–2
- Set up initial projects with HTML, CSS, and JavaScript.
- Developed small applications such as:
  - Contact manager (add, list, and delete contacts).
  - To-do list with basic interactions.
  - Number guessing game and event handling exercises.

### Week 3
- Introduction to React and Vite.
- Created functional components and used JSX.
- Implemented props and `useState` for dynamic rendering.
- Developed small interactive exercises:
  - Toggle text visibility.
  - Increment/decrement counters.
  - Simple input handling with forms.

### Week 4 – Node.js & Express
**Goal**: Build a simple REST API with CRUD operations.

- **Day 1**: Setup project with `npm init -y` and Express installation. Created `server.js` with a base route (`GET /`) returning "Hello World".
- **Day 2**: Added routes `/prodotti` and `/contatti` returning JSON data.
- **Day 3**: Introduced middleware `express.json()` to handle JSON input. Implemented a `POST /prodotti` route to add new items and a dynamic route `GET /prodotti/:id`.
- **Day 4**: Completed CRUD operations:
  - `GET /prodotti` → list all products
  - `POST /prodotti` → add a product
  - `PUT /prodotti/:id` → update a product
  - `DELETE /prodotti/:id` → delete a product  
  Implemented basic error handling for missing IDs and invalid input.
- **Day 5**: Refactored the project into a clean structure:
  - `routes/` folder for routing definitions
  - `controllers/` folder for business logic
  - `data.json` file as a mock database
  Result: a structured and maintainable API.