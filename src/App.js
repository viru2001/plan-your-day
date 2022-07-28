
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import { NewUserName, UserWelcome } from "./components";
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
          // backgroundImage: `url(https://source.unsplash.com/WLUHO9A_xik/1600x900)`,
          backgroundImage: `url(https://source.unsplash.com/1Z2niiBPg5A/1600x900)`,
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isNameSaved ? <UserWelcome /> : <NewUserName />}
      </Box>
    </>
  );
}

export default App;
