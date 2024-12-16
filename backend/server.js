require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
module.exports = app;
const port = 3001;

app.get("/api/weather", async (req, res) => {
    const { city, lat, lon } = req.query;
    let url;
    const apiKey = process.env.WEATHER_API_KEY

    if (city) {
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    try {
        const response = await axios.get(url);
        console.log(response)
        const { temp, humidity, pressure, feels_like } = response.data.main;
        const { speed } = response.data.wind;
        const description = response.data.weather[0].description;
        const name = response.data.name;
        const visibility = response.data.visibility

        res.json({ temp, humidity, speed, description, name, pressure, feels_like, visibility });
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

module.exports = app;