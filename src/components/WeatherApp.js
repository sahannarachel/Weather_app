import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './currentweather';
import Forecast from './forecast';
import Search from './search';

const API_KEY = 'f70d43777d849fb7283f07085ca20460'; // Replace with your OpenWeatherMap API key

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState('');

  const fetchWeather = async (city) => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setCurrentWeather(weatherResponse.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setForecast(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      setCurrentWeather(weatherResponse.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      setForecast(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Error getting location', error);
      }
    );
  }, []);

  return (
    <div>
      <Search onSearch={fetchWeather} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default WeatherApp;
