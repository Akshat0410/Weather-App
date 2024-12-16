"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WeatherForm.module.css";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `http://localhost:3001/api/weather?lat=${latitude}&lon=${longitude}`
          );
          setWeather(response.data);
          setCity(response.data.name);
        } catch (err) {
          setError("Error fetching weather data");
        }
      },
      (err) => {
        setError("Unable to retrieve location");
      }
    );
  }, []);

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/weather?city=${city}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching weather data");
    }
  };

  console.log("weather", weather);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className={styles.input}
        />
        <button onClick={getWeather} className={styles.button}>
          Get Weather
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
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
