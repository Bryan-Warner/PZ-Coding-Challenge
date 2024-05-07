PZ Cheeseria
Welcome to the GitHub repository for the PZ Cheeseria! This project is a proof of concept (POC) showcasing a frontend and an API with CRUD capabilities, 
designed to display a selection of fine cheeses that can be purchased in-store. This MVP aims to demonstrate basic functionality with a focus on the cheese catalog featuring five different cheeses, 
each with associated images, prices per kilo, and colors.

Features
Cheese Catalog: Display five types of cheeses with their images, prices per kilo, and colors.
CRUD API: Backend API to create, read, update, and delete cheese entries.
Price Calculator: Allows customers to calculate the total price based on the type of cheese and weight.
Technology Stack
Frontend: [React] 
Backend: [Node.js] 
API Documentation: Swagger / OpenAPI for easy API navigation.
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: Version 12.x or newer, which you can download from [Node.js official website](https://nodejs.org/).
- **npm** (Node Package Manager), which comes with Node.js.

-- Docker Desktop




## Installing using Docker

To install and run the PZ Cheeseria using Docker, follow these steps:


1. Clone the repository and navigate into it:
   ```bash
   git clone https://github.com/Bryan-Warner/PZ-Coding-Challenge
   cd PZ-Coding-Challenge
    
2. build docker image and view application
 Docker Compose is used to set up a multi-container application, where the backend service runs a Node.js app exposed on port 3000 with live code updates,
 and the frontend service, dependent on the backend, serves a web app on port 80, also with live updates.
 ```bash
docker-compose build
docker-compose up
 ```
View the app at http://localhost
View API documentation at http://localhost:3000/api-docs/json


3. Run Tests
cd into root directory
```bash
cd backend
npm run test
cd ..
cd frontend
npm run test

```
Further Improvements
Testing: create tests for edge cases and invalid inputs, further test error handling of API and data validation. More extensive testing.
Automated build pipeline for continuous integration and deployment (CI/CD). This would involve:
Continuous Integration: Automatic testing and building with each commit, using GitHub Actions.
Continuous Deployment: Automated deployment to staging and production environments.
Monitoring: Implementing monitoring tools to track application performance in real-time.
