import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Moment from "react-moment";
import moment from "moment";
import { Edit } from "@mui/icons-material";

import { useUser } from "../../contexts";
import { CssTextField } from "../";

const UserWelcome = () => {
  const {
    userState: { name, showEditIcon, showNameField },
    userDispatch,
  } = useUser();

  const currentTime = Date.now();

  let greeting = "";
  const hrs = moment(currentTime).format("HH");
  if (hrs >= 5 && hrs <= 11) {
    greeting = "Good Morning";
  } else if (hrs >= 12 && hrs < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h1" component="h2" sx={{ fontWeight: "bold" }}>
        <Moment format="HH:mm">{currentTime}</Moment>
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
          {greeting}
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onMouseOver={() =>
            userDispatch({ type: "SHOW_EDIT_ICON", payload: true })
          }
          onMouseOut={() =>
            userDispatch({ type: "SHOW_EDIT_ICON", payload: false })
          }
        >
          {!showNameField && (
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", ml: 2 }}
            >
              {name}
            </Typography>
          )}

          {showEditIcon && (
            <Edit
              sx={{ cursor: "pointer", fontSize: 50 }}
              onClick={() => {
                userDispatch({
                  type: "SHOW_EDIT_ICON",
                  payload: false,
                });
                userDispatch({
                  type: "SHOW_NAME_FIELD",
                  payload: true,
                });
              }}
            />
          )}
        </Box>
        {showNameField && (
          <CssTextField
            variant="standard"
            InputProps={{
              inputProps: {
                style: {
                  fontSize: 40,
                  textAlign: "center",
                  fontWeight: "bold",
                },
              },
            }}
            sx={{ width: 300 }}
            value={name}
            onChange={e =>
              userDispatch({ type: "EDIT_USERNAME", payload: e.target.value })
            }
            onKeyDown={e => {
              if (e.key === "Enter") {
                userDispatch({ type: "SHOW_EDIT_ICON", payload: false });
                userDispatch({ type: "SHOW_NAME_FIELD", payload: false });
                localStorage.setItem("name", name);
              }
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export { UserWelcome };
