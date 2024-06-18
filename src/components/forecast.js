import React from 'react';
import './forecast.css'; // Import the CSS file for styling

const Forecast = ({ data }) => {
  const dailyForecasts = data.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );

  return (
    <div className="forecast-container">
      <h2>7-Day Forecast</h2>
      <div className="forecast-grid">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <h3>{new Date(forecast.dt_txt).toLocaleDateString()}</h3>
            <p>Temperature: {forecast.main.temp}°C</p>
            <p>Weather: {forecast.weather[0].description}</p>
            <p>Humidity: {forecast.main.humidity}%</p>
            <p>Wind Speed: {forecast.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
