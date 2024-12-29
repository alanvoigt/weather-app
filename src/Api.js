const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.weatherstack.com/current";

export async function fetchWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?access_key=${API_KEY}&query=${city}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.info); // Aqui você lança o erro da API, que inclui a mensagem específica
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch weather data."); // Esta é a mensagem genérica de erro
  }
}
