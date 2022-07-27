import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import { NewUserName, Quote, UserWelcome, Weather } from "./components";
import { useUser } from "./contexts";

function App() {
  const {
    userState: { isNameSaved },
  } = useUser();


  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          backgroundImage: `url(https://source.unsplash.com/WLUHO9A_xik/1600x900)`,
          // backgroundImage: `url(https://source.unsplash.com/1Z2niiBPg5A/1600x900)`,
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
    </>
  );
}

export default App;
