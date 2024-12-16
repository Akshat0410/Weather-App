# Weather-App

## Introduction
Weather-App is a simple and intuitive application that provides real-time weather updates for any location. With a user-friendly interface, users can easily check the current weather conditions, forecasts, and more.

## Features
- Real-time weather data
- Location search functionality(Current location by default)
- Easy-to-use interface

## Project Structure
The project consists of two main directories:
- **Frontend**: The client-side application that runs on port **3001**.
- **Backend**: The server-side application that runs on port **3000**.

## Installation
To install the Weather-App, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Akshat0410/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Install the required dependencies for both frontend and backend:

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

   - For the backend:
     ```bash
     cd ../backend
     npm install
     ```
4. Create a `.env` file in the backend directory to store your environment variables. Add the following line to the `.env` file:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with your actual API key. Note that the API key should be kept secret and is fetched from GitHub Secrets in production environments.

## Usage
To start the application, run the following commands in separate terminal windows:

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

3. To run backend tests:
   ```bash
   cd backend
   npm test
   ```

Open your browser and go to `http://localhost:3001` to view the app.

![Weather App Screenshot](app.png)