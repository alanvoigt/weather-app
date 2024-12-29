import { fetchWeather } from "../Api";

describe("fetchWeather", () => {
  it("should return weather data for a valid city", async () => {
    const mockResponse = {
      location: { name: "Blumenau", country: "Brazil" },
      current: { temperature: 25, weather_descriptions: ["Sunny"] },
    };

    // Mocking fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchWeather("Blumenau");

    expect(data.location.name).toBe("Blumenau");
    expect(data.current.temperature).toBe(25);
    expect(data.current.weather_descriptions[0]).toBe("Sunny");

    // Verificar se o fetch foi chamado com a URL correta
    expect(fetch).toHaveBeenCalledWith(
      `https://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=Blumenau`
    );
  });

  // PARA CORRIGIR
  /*  it("should handle API errors gracefully", async () => {
    // Mocking fetch to simulate a network error
    global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

    await expect(fetchWeather("InvalidCity")).rejects.toThrow("Network Error");
  });

  it("should handle API response error", async () => {
    const mockErrorResponse = {
      error: { info: "Invalid API key" },
    };

    // Mocking fetch to simulate an error in the API response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockErrorResponse),
    });

    await expect(fetchWeather("Blumenau")).rejects.toThrow("Invalid API key");
  }); */

  it("should handle API errors gracefully", async () => {
    // Mocking fetch to simulate a network error
    global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

    await expect(fetchWeather("InvalidCity")).rejects.toThrow(
      "Failed to fetch weather data."
    );
  });

  it("should handle API response error", async () => {
    const mockErrorResponse = {
      error: { info: "Invalid API key" },
    };

    // Mocking fetch to simulate an error in the API response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockErrorResponse),
    });

    await expect(fetchWeather("Blumenau")).rejects.toThrow(
      "Failed to fetch weather data."
    );
  });
});
