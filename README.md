# AstonishGallery

AstonishGallery is a full-stack mini-site designed to showcase users, albums, and images in a beautiful, animated gallery format. The application is built with:
- **NestJS** (backend)
- **React** (frontend)
- **Material UI** (styling and design consistency)
- **CSS Variables** (for a cohesive look and feel)

![AstonishGallery Overview](./screenshots/astonishgallery-overview.png)

> **Note**: Replace `./screenshots/astonishgallery-overview.png` with the actual path or URL to your screenshot file.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Getting Started](#getting-started)
   - [Backend Setup (NestJS)](#backend-setup-nestjs)
   - [Frontend Setup (React)](#frontend-setup-react)
5. [Usage](#usage)
6. [Testing with Postman](#testing-with-postman)
7. [Technologies Used](#technologies-used)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

AstonishGallery provides an intuitive interface for managing:
- **Users** (with their album counts)
- **Albums** (with covers in a gallery layout)
- **Images** (displayed in a carousel)

Users can **create**, **edit**, and **delete** users, albums, and images. The application also features:
- **Material UI** for a polished design system
- **CSS Variables** to ensure a consistent theme
- **Animated transitions** (Grow, Fade, etc.) for a professional look

---

## Features

1. **Display a list of users and the number of albums each user has**  
   - Shown in the main page under “Users.”
2. **Enable viewing albums in a gallery format**  
   - Each album shows a cover (the first image or a placeholder).
3. **Implement a carousel feature for images**  
   - Allows viewing all images in an album.
4. **Use CSS Variables**  
   - E.g., `--primary-color`, `--card-radius`, etc. for cohesive styling.
5. **Adopt Material UI**  
   - For a streamlined development process and design consistency.
6. **Provide CRUD operations**  
   - Add, edit, delete users, albums, and images from the UI.

---

## Screenshots

### 1. Main Page: Creating a New User
![Create User Screenshot](./screenshots/create-user.png)

> **Description**: A form at the top lets you add a new user. On successful creation, a success message appears (green alert).

### 2. User List
![User List Screenshot](./screenshots/user-list.png)

> **Description**: Displays each user with their email and the number of albums. Clicking on a user loads their albums below.

### 3. Albums for a Selected User
![Albums Screenshot](./screenshots/albums.png)

> **Description**: A gallery of album cards, each showing a placeholder or first image as cover. You can add a new album with the form above.

### 4. Images in an Album
![Images Screenshot](./screenshots/images.png)

> **Description**: Shows the images for the selected album in a card layout, plus a form to add a new image.

### 5. Carousel for Viewing Images
![Carousel Screenshot](./screenshots/carousel.png)

> **Description**: A simple carousel with left/right arrows for navigating images.

---

## Getting Started

### Backend Setup (NestJS)

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
2. **Enable CORS in `src/main.ts`**:
   ```typescript
   app.enableCors();
3. **Run the Server**:
   ```bash
   npm run start:dev
   
#### By default, the NestJS server listens on http://localhost:3000.

### Frontend Setup (React)
1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install

