// Importa a função que será testada
import { fetchWeather } from "../Api";

// Mock do `fetch`
global.fetch = jest.fn();

describe("API Response Contract", () => {
  it("should validate the structure of the API response", async () => {
    const mockResponse = {
      location: { name: "Blumenau", country: "Brazil" },
      current: {
        temperature: 25,
        weather_descriptions: ["Sunny"],
        humidity: 80,
      },
    };

    // Simula a resposta do fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Chama a função fetchWeather e valida os dados
    const data = await fetchWeather("Blumenau");

    // Validar propriedades principais
    expect(data).toHaveProperty("location.name");
    expect(data).toHaveProperty("location.country");
    expect(data).toHaveProperty("current.temperature");
    expect(data).toHaveProperty("current.weather_descriptions");
    expect(data).toHaveProperty("current.humidity");

    // Validar tipos
    expect(typeof data.location.name).toBe("string");
    expect(typeof data.current.temperature).toBe("number");
    expect(Array.isArray(data.current.weather_descriptions)).toBe(true);
  });

  it("should handle errors when the fetch fails", async () => {
    // Simula um erro no fetch
    fetch.mockRejectedValueOnce(new Error("Network error"));

    // Espera que a função lance um erro
    await expect(fetchWeather("Blumenau")).rejects.toThrow(
      "Failed to fetch weather data."
    );
  });
});
