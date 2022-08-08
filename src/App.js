import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import {
  NewUserName,
  Quote,
  TodoButton,
  UserWelcome,
  Weather,
} from "./components";
import { useUser } from "./contexts";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const key = process.env.REACT_APP_UNSPLASH_API_KEY;

  const {
    userState: { isNameSaved },
  } = useUser();
  const [imageUrl, setImageUrl] = useState("");
  const [photoCredit, setPhotoCredit] = useState("");

  const img = "nature background";
  const randomNumber = Math.floor(Math.random() * 20);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?page=${randomNumber}&per_page=20&query=${img}&client_id=${key}`
        );
        setImageUrl(response.data.results[randomNumber].urls.regular);
        setPhotoCredit(
          `Photo by ${response.data.results[0].user.first_name} ${response.data.results[0].user.last_name} on Unsplash`
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {isNameSaved ? <UserWelcome /> : <NewUserName />}

        <Box sx={{ mt: 40 }}>
          <Quote />
        </Box>
      </Box>

      <Box sx={{ position: "absolute", top: 0, right: 0, mr: 4 }}>
        <Weather />
      </Box>

      <Box sx={{ position: "absolute", left: 0, top: 0, ml: 2, p: 2 }}>
        <Typography variant="body1">{photoCredit}</Typography>
      </Box>

      <Box>
        <TodoButton />
      </Box>
    </>
  );
}

export default App;
