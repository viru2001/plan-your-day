import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../contexts";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const Weather = () => {
  const {
    userState: {
      weather: { temperature, weather, iconUrl, city },
    },
    userDispatch,
  } = useUser();

  const [latitude, setLatitude] = useState(19.180241);
  const [longitude, setLongitute] = useState(72.859001);

  const key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitute(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
        );
        userDispatch({
          type: "UPDATE_WEATHER",
          payload: {
            temperature: `${(response.data.main.temp - 273.15).toFixed(0)} °C`,
            weather: response.data.weather[0].main,
            city: response.data.name,
            iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          },
        });
      })();
    } catch (e) {
      userDispatch({
        type: "UPDATE_WEATHER",
        payload: {
          temperature: null,
          weather: null,
          iconUrl: null,
        },
      });
    }
  }, [latitude, longitude, key]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ width: "100px" }} alt={weather} src={iconUrl} />
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          {temperature}
        </Typography>
      </Box>
      <Typography variant="h4" component="h4" sx={{ mt: 2 }}>
        {city}
      </Typography>
    </Box>
  );
};

export { Weather };
