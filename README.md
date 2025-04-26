![ITalk Logo](/src/assets/logo.png)

# ITalk Backend

Welcome to the backend of **ITalk** — an educational platform designed to teach IT and tech terms in a fun, interactive, and accessible way.

## About ITalk

In today's tech-driven world, miscommunication often stems from a lack of understanding of technical terms. Even the best engineers once had to learn these concepts from scratch. **Education is the solution.**

**ITalk** was born from a simple idea:

> If we have apps like Duolingo to teach languages, why not have a platform dedicated to teaching IT terms?

**ITalk** aims to make technical learning approachable by offering:

- Structured lessons
- Quizzes
- Interactive exercises

Covering topics from **beginner** to **advanced** levels.

Whether you're just starting your tech journey or looking to sharpen your skills, **ITalk** is your go-to educational companion.

## Features

### Structured Learning Paths  
Organized courses based on difficulty level, from **beginner** to **expert**.

### Interactive Lessons and Quizzes  
Engage with material through short, dynamic lessons and quick quizzes to reinforce learning.

### Progress Tracking  
Monitor your achievements and learning streaks as you master new terms and concepts.

### Gamified Experience  
Earn points, unlock levels, and stay motivated through fun, game-like mechanics.

### Cross-Platform Access  
Learn seamlessly on web or mobile — your progress syncs across devices.

## Backend Overview

This repository contains the backend services that power the **ITalk** platform.

### Tech Stack

- **Node.js / NestJS** – Backend framework  
- **PostgreSQL** – Relational database  
- **TypeORM / Prisma** – Object-Relational Mapping (ORM)  
- **Redis** *(if applicable)* – Caching and session management  
- **JWT Authentication** – Secure user login  
- **REST API & WebSocket Support** – Real-time features and structured endpoints

### Core Modules

- **Authentication**: Secure user login and registration  
- **Course Management**: Admin and user endpoints for creating and accessing courses and lessons  
- **Progress Tracking**: APIs for managing user progress and achievements  
- **Gamification Module**: Points, badges, and ranking systems  
- **Admin Panel APIs**: Tools for admins to manage content and users

## Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/DavidAslanyan/ITalk-Backend.git
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables**
Create a .env file following the structure of .env.example.

4. **Run the development server:**

```bash
npm run start:dev
```

## Deployment

**ITalk Backend** can be deployed on cloud providers like **AWS**, **DigitalOcean**, or platforms like **Heroku**, **Railway**, etc.

📦 **Docker support** is available for containerized deployment.

---

## Docker Setup

You can easily run the ITalk Backend using Docker.

### 1. Build and Run with Docker

Make sure you have Docker installed, then run:

```bash
docker build -t italk-backend .
docker run -p 3000:3000 --env-file .env italk-backend
```

This will start the server at http://localhost:3000

## Docker Setup with `docker-compose`

The following `docker-compose.yml` file is used to set up the **ITalk Backend** along with **PostgreSQL**. This setup creates two services: `solaris-api` (the backend) and `postgres` (the database), running in a **bridge network**.

### `docker-compose.yml`:

```yaml
version: "3.8"

services:
  # Backend Service (ITalk API)
  solaris-api:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always  # Ensures the service restarts automatically
    depends_on:
      - postgres  # Ensures PostgreSQL starts before the backend
    env_file:
      - .env  # Load environment variables from .env file
    ports:
      - "${APP_PORT}:3000"  # Maps container port 3000 to APP_PORT
    volumes:
      - .:/usr/src/app  # Mounts the current directory to the container for live reloading
      - /usr/src/app/node_modules  # Prevents overwriting of node_modules on host
    command: npm run start:dev  # Command to start the app in development mode
    networks:
      - myapp-network  # Connects the container to the bridge network
  
  # PostgreSQL Service
  postgres:
    image: postgres:latest  # Uses the latest PostgreSQL image
    restart: always  # Ensures the service restarts automatically
    ports:
      - "5436:5432"  # Maps container port 5432 (default PostgreSQL) to port 5436 on host
    env_file:
      - .env  # Loads environment variables from the .env file (e.g., database credentials)
    volumes:
      - db_data:/var/lib/postgresql/data  # Persists PostgreSQL data in a named volume
    networks:
      - myapp-network  # Connects PostgreSQL to the bridge network
  
networks:
  # Custom bridge network for inter-service communication
  myapp-network:
    driver: bridge

volumes:
  # Persistent volume for PostgreSQL data
  db_data:
```
## 🤝 Contributing

Official Deployment Coming soon!  
---

## 📄 License

This project is licensed under the **MIT License**.
