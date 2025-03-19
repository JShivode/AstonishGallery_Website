# AstonishGallery

AstonishGallery is a full-stack album mini site designed to astonish and engage users with dynamic galleries and smooth carousels. The app uses React.js for the frontend and NestJS for the backend, integrating MongoDB for data storage. It leverages external APIs – JSONPlaceholder for user and album data, and Picsum for high-quality images – to create an attractive, dynamic experience. The project features a cohesive design using CSS Variables and MaterialUI, and supports full CRUD operations on Users, Albums, and Images.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Data Preparation](#data-preparation)
- [Building the NestJS Backend](#building-the-nestjs-backend)
  - [Installing and Configuring NestJS](#installing-and-configuring-nestjs)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting up the Nest Server](#setting-up-the-nest-server)
  - [Setting up MongoDB](#setting-up-mongodb)
  - [Defining Schemas and Models](#defining-schemas-and-models)
  - [Defining Application Routes](#defining-application-routes)
  - [User Authentication (Optional)](#user-authentication-optional)
  - [Creating the Album Controller and Service](#creating-the-album-controller-and-service)
  - [Creating Middleware](#creating-middleware)
- [Building the React App Frontend](#building-the-react-app-frontend)
  - [Setting Up the React Application](#setting-up-the-react-application)
  - [Integrating MaterialUI and CSS Variables](#integrating-materialui-and-css-variables)
  - [Creating the Gallery and Carousel Components](#creating-the-gallery-and-carousel-components)
  - [Implementing CRUD Functionality](#implementing-crud-functionality)
- [Additional Features and Bonus Points](#additional-features-and-bonus-points)
  - [Transitions and Animations](#transitions-and-animations)
  - [Unit Tests with Jest](#unit-tests-with-jest)
  - [Meaningful Git Commits](#meaningful-git-commits)
- [Deployment](#deployment)
- [Conclusion](#conclusion)

---

## Getting Started

### 1. Project Setup and Naming

We begin by choosing an appropriate name for the project: **AstonishGallery**. This name reflects our goal of creating an attractive album platform that keeps users curious and engaged.

```bash
git commit -m "Initial commit: Setup project structure and naming for AstonishGallery"
