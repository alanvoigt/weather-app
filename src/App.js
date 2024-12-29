import React, { useState } from "react";
import { fetchWeather } from "./Api";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
          />
          <p>
            <strong>Temperature:</strong> {weather.current.temperature}°C
          </p>
          <p>
            <strong>Weather:</strong> {weather.current.weather_descriptions[0]}
          </p>
          <p>
            <strong>Wind:</strong> {weather.current.wind_speed} km/h (
            {weather.current.wind_dir})
          </p>
          <p>
            <strong>Humidity:</strong> {weather.current.humidity}%
          </p>
          <p>
            <strong>Feels Like:</strong> {weather.current.feelslike}°C
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
