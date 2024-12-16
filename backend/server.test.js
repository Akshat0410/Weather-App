const request = require("supertest");
const axios = require("axios");
const app = require("./server"); // Import the server instance if exported in `server.js`

jest.mock("axios");

describe("Weather API Integration Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch weather data by city name", async () => {
        const mockData = {
            data: {
                main: { temp: 25, humidity: 60 },
                wind: { speed: 5 },
                weather: [{ description: "clear sky" }],
                name: "London",
            },
        };

        axios.get.mockResolvedValue(mockData);

        const response = await request(app).get("/api/weather").query({ city: "London" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            temp: 25,
            humidity: 60,
            speed: 5,
            description: "clear sky",
            name: "London",
        });

        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining("q=London")
        );
    });

    it("should fetch weather data by latitude and longitude", async () => {
        const mockData = {
            data: {
                main: { temp: 20, humidity: 50 },
                wind: { speed: 3 },
                weather: [{ description: "scattered clouds" }],
                name: "Unknown Location",
            },
        };

        axios.get.mockResolvedValue(mockData);

        const response = await request(app).get("/api/weather").query({
            lat: "51.5074",
            lon: "-0.1278",
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            temp: 20,
            humidity: 50,
            speed: 3,
            description: "scattered clouds",
            name: "Unknown Location",
        });

        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining("lat=51.5074&lon=-0.1278")
        );
    });

    it("should return 500 if the external API fails", async () => {
        axios.get.mockRejectedValue(new Error("API Error"));

        const response = await request(app).get("/api/weather").query({ city: "InvalidCity" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Error fetching weather data" });
    });
});