"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WeatherForm.module.css";

const WeatherForm = () => {
  // State variables for city input, weather data, and error messages
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch location when the component loads first
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Fetch weather data based on the user's current location
          const response = await axios.get(
            `http://localhost:3001/api/weather?lat=${latitude}&lon=${longitude}`
          );
          setWeather(response.data);
          setCity(response.data.name); // Set city based on fetched data
        } catch (err) {
          setError("Error fetching weather data"); // Handle fetch error
        }
      },
      (err) => {
        setError("Unable to retrieve location"); // Handle location retrieval error
      }
    );
  }, []);

  const getWeather = async () => {
    try {
      // Fetch weather data based on user-input city
      const response = await axios.get(
        `http://localhost:3001/api/weather?city=${city}`
      );
      setWeather(response.data);
      setError(""); // Clear any previous error messages
    } catch (err) {
      setError("Error fetching weather data"); // Handle fetch error
    }
  };

  console.log("weather", weather); // Log weather data for debugging

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
          placeholder="Enter city name"
          className={styles.input}
        />
        <button onClick={getWeather} className={styles.button}>
          Get Weather
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>} // Display error message if exists
      {weather && error === "" && (
        <div className={styles.weatherCard}>
          <div className={styles.mainInfo}>
            <h2 className={styles.cityName}>{weather.name}</h2>
            <p className={styles.date}>{new Date().toLocaleDateString()}</p>
            <h1 className={styles.temperature}>{Math.round(weather.temp)}°C</h1>
            <p className={styles.feelsLike}>Feels like: {Math.round(weather.feels_like)}°C</p>
            <p className={styles.pressure}>Pressure: {weather.pressure} hPa</p>
            <p className={styles.visibility}>Visibility: {weather.visibility / 1000} km</p>
          </div>
          <div className={styles.details}>
            <p className={styles.wind}>Wind: {weather.speed} m/s</p>
            <p className={styles.humidity}>Humidity: {weather.humidity}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForm;