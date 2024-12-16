import { render, screen, fireEvent } from "@testing-library/react";
import WeatherForm from "./WeatherForm";

describe("WeatherForm", () => {
    // Mock navigator.geolocation
    const mockGeolocation = {
        getCurrentPosition: jest.fn(),
    };

    beforeEach(() => {
        global.navigator.geolocation = mockGeolocation;
    });

    it("renders the input and button", () => {
        render(<WeatherForm />);
        expect(screen.getByPlaceholderText("Enter city name")).toBeInTheDocument();
        expect(screen.getByText("Get Weather")).toBeInTheDocument();
    });

    it("handles geolocation success", async () => {
        // Mock a successful geolocation response
        mockGeolocation.getCurrentPosition.mockImplementation((success) =>
            success({ coords: { latitude: 37.7749, longitude: -122.4194 } })
        );

        render(<WeatherForm />);
        // Additional assertions can be added based on your component's behavior
    });

    it("handles geolocation failure", () => {
        // Mock a geolocation error
        mockGeolocation.getCurrentPosition.mockImplementation((_, error) =>
            error({ message: "User denied geolocation." })
        );

        render(<WeatherForm />);
        // Additional assertions can be added based on your component's behavior
    });
});
