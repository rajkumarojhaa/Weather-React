import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clearSky from '../images/clear-sky.jpg';
import cloudy from '../images/cloudy.jpg';
import rain from '../images/rain.jpg';
import snow from '../images/snow.jpg';
import haze from '../images/haze.jpg';
import mist from '../images/mist.jpg';
import defaultImage from '../images/default.jpg';
import './WeatherApp.css';

const cities = [
    { name: 'Mumbai' },
    { name: 'Delhi' },
    { name: 'Bengaluru' },
    { name: 'Hyderabad' },
    { name: 'Ahmedabad' },
    { name: 'Chennai' },
    { name: 'Kolkata' },
    { name: 'Pune' },
    { name: 'Jaipur' },
    { name: 'Surat' },
    { name: 'Lucknow' },
    { name: 'Kanpur' },
    { name: 'Nagpur' },
    { name: 'Indore' },
    { name: 'Thane' },
    { name: 'Bhopal' },
    { name: 'Visakhapatnam' },
    { name: 'Pimpri-Chinchwad' },
    { name: 'Patna' },
    { name: 'Vadodara' },
    { name: 'Ghaziabad' },
    { name: 'Ludhiana' },
    { name: 'Agra' },
    { name: 'Nashik' },
    { name: 'Faridabad' },
    { name: 'Meerut' },
    { name: 'Rajkot' },
    { name: 'Kalyan-Dombivli' },
    { name: 'Vasai-Virar' },
    { name: 'Varanasi' },
    { name: 'Srinagar' },
    { name: 'Aurangabad' },
    { name: 'Dhanbad' },
    { name: 'Amritsar' },
    { name: 'Navi Mumbai' },
    { name: 'Allahabad' },
    { name: 'Ranchi' },
    { name: 'Howrah' },
    { name: 'Coimbatore' },
    { name: 'Jabalpur' },
    { name: 'Gwalior' },
    { name: 'Vijayawada' },
    { name: 'Jodhpur' },
    { name: 'Madurai' },
    { name: 'Raipur' },
    { name: 'Kota' },
    { name: 'Guwahati' },
    { name: 'Chandigarh' },
    { name: 'Solapur' },
    { name: 'Hubballi-Dharwad' },
    { name: 'Tiruchirappalli' },
    { name: 'Bareilly' },
    { name: 'Mysore' },
    { name: 'Tiruppur' },
    { name: 'Gurgaon' },
    { name: 'Aligarh' },
    { name: 'Jalandhar' },
    { name: 'Bhubaneswar' },
    { name: 'Salem' },
    { name: 'Mira-Bhayandar' },
    { name: 'Warangal' },
    { name: 'Thiruvananthapuram' },
    { name: 'Guntur' },
    { name: 'Bhiwandi' },
    { name: 'Saharanpur' },
    { name: 'Gorakhpur' },
    { name: 'Bikaner' },
    { name: 'Amravati' },
    { name: 'Noida' },
    { name: 'Jamshedpur' },
    { name: 'Bhilai' },
    { name: 'Cuttack' },
    { name: 'Firozabad' },
    { name: 'Kochi' },
    { name: 'Bhavnagar' },
    { name: 'Dehradun' },
    { name: 'Durgapur' },
    { name: 'Asansol' },
    { name: 'Nanded' },
    { name: 'Kolhapur' },
    { name: 'Ajmer' },
    { name: 'Gulbarga' },
    { name: 'Jamnagar' },
    { name: 'Ujjain' },
    { name: 'Loni' },
    { name: 'Siliguri' },
    { name: 'Jhansi' },
    { name: 'Ulhasnagar' },
    { name: 'Jammu' },
    { name: 'Mangalore' },
    { name: 'Erode' },
    { name: 'Belgaum' },
    { name: 'Kurnool' },
    { name: 'Ambattur' },
    { name: 'Rajahmundry' },
    { name: 'Tirunelveli' },
    { name: 'Malegaon' },
    { name: 'Gaya' },
    { name: 'Udaipur' },
    { name: 'Maheshtala' },
    { name: 'Davanagere' },
    { name: 'Kozhikode' },
    { name: 'Akola' },
    { name: 'Kurnool' },
    { name: 'Bokaro' },
    { name: 'South Dumdum' },
    { name: 'Bellary' },
    { name: 'Patiala' },
    { name: 'Gopalpur' },
    { name: 'Agartala' },
    { name: 'Bhagalpur' },
    { name: 'Muzaffarnagar' },
    { name: 'Bhatpara' },
    { name: 'Panihati' },
    { name: 'Latur' },
    { name: 'Dhule' },
    { name: 'Rohtak' },
    { name: 'Korba' },
    { name: 'Bhilwara' },
    { name: 'Brahmapur' },
    { name: 'Muzaffarpur' },
    { name: 'Ahmednagar' },
    { name: 'Mathura' },
    { name: 'Kollam' },
    { name: 'Avadi' },
    { name: 'Kadapa' },
    { name: 'Kamarhati' },
    { name: 'Sambalpur' },
    { name: 'Bilaspur' },
    { name: 'Shahjahanpur' },
    { name: 'Satara' },
    { name: 'Bijapur' },
    { name: 'Rampur' },
    { name: 'Shimoga' },
    { name: 'Chandrapur' },
    { name: 'Junagadh' },
    { name: 'Thrissur' },
    { name: 'Alwar' },
    { name: 'Bardhaman' },
    { name: 'Kulti' },
    { name: 'Nizamabad' },
    { name: 'Parbhani' },
    { name: 'Tumkur' },
    { name: 'Khammam' },
    { name: 'Ozhukarai' },
    { name: 'Bathinda' },
    { name: 'Vellore' },
    { name: 'Anantapur' },
    { name: 'Nagercoil' },
    { name: 'Karnal' },
    { name: 'Tirupati' },
    { name: 'Thrissur' },
    { name: 'Hapur' },
    { name: 'Hisar' },
    { name: 'Gandhinagar' },
    { name: 'Tumakuru' },
    { name: 'Naihati' },
    { name: 'Aurangabad' },
    { name: 'Sagar' },
    { name: 'Rourkela' },
    { name: 'Pithampur' },
    { name: 'Bhiwani' },
    { name: 'Dibrugarh' },
    { name: 'Yamunanagar' },
    { name: 'Raebareli' },
    { name: 'Purnia' },
    { name: 'Hathras' },
    { name: 'Anantapur' },
    { name: 'Hindupur' },
    { name: 'Guntakal' },
    { name: 'Rayadurg' },
  ];
  

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const backgrounds = [clearSky, cloudy, rain, snow, haze, mist, defaultImage];
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBackground);

    // Load weather data for a random city initially
    const randomCity = cities[Math.floor(Math.random() * cities.length)].name;
    searchWeather(randomCity);
  }, []);

  const searchWeather = async (selectedCity = city) => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      changeBackground(response.data.weather[0].main);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  const changeBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        setBackground(clearSky);
        break;
      case 'Clouds':
        setBackground(cloudy);
        break;
      case 'Rain':
        setBackground(rain);
        break;
      case 'Snow':
        setBackground(snow);
        break;
      case 'Haze':
        setBackground(haze);
        break;
      case 'Mist':
        setBackground(mist);
        break;
      default:
        setBackground(defaultImage);
        break;
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    if (e.target.value) {
      const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWeather();
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity);
    searchWeather(suggestedCity);
    setSuggestions([]);
  };

  return (
    <div className="weather-app" style={{ backgroundImage: `url(${background})` }}>
      <div className="weather-card">
      <div className="date-time">
        <p>{dateTime.toLocaleDateString()}</p>
        <p>{dateTime.toLocaleTimeString()}</p>
      </div>
        <div className="search-section">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search City"
          />
          <button onClick={() => searchWeather()}>Search</button>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {weatherData && (
          <div className="weather-info">
            <h1>{weatherData.name}</h1>
            <p>{weatherData.weather[0].description}</p>
            <p>{weatherData.main.temp} °C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
