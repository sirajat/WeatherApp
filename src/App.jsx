import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // City should be a string, not an array
  const [weatherData, setWeatherData] = useState(null); // Store fetched weather data
  const [error, setError] = useState(null);

  async function GetWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data); // Set the weather data
      setError(null); // Reset any previous errors
    } catch (err) {
      setError(err.message); // Capture error message
      setWeatherData(null); // Reset weather data in case of an error
    }
  }

  return (
    <div className="container">
      <div className="d-flex mt-5 inputBox">
        <input
          className="form-control mr-sm-2 w-50"
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="btn btn-primary my-2 my-sm-0 m-4"
          type="submit"
          onClick={GetWeather}
        >
          Search
        </button>
      </div>

      <div className="resultBox">
        {error && <h4 className="text-danger">{error}</h4>}
        {weatherData && (
          <>
            <h4>City Name: {weatherData.name}</h4>
            <h4>
              Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C
            </h4>
            <h4>Weather: {weatherData.weather[0].description}</h4>
            <h4>Humidity: {weatherData.main.humidity}%</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
