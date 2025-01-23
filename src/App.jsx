import { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const AnimatedLogo = styled("img")({
  height: "6em",
  padding: "1.5em",
  willChange: "filter",
  transition: "filter 300ms",
  "&:hover": {
    filter: "drop-shadow(0 0 2em #646cffaa)",
  },
});

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearchInput = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (error) {
      setError(
        "Unable to fetch weather data. Please check the city name or try again."
      );
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "2rem" }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <AnimatedLogo src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <AnimatedLogo src={reactLogo} alt="React logo" />
        </a>
      </div>
      <Typography variant="h3" component="h1" gutterBottom>
        Weather Finder
      </Typography>
      <div className="search">
        <TextField
          label="Search for a city..."
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" color="primary" onClick={handleSearchInput}>
          Search
        </Button>
      </div>
      <div className="weather-card" style={{ marginTop: "2rem" }}>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : weatherData ? (
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {weatherData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Temperature: {weatherData.main.temp}°C
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Condition: {weatherData.weather[0].description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Wind Speed: {weatherData.wind.speed} m/s
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1">
            Enter a city to see the weather
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default App;
