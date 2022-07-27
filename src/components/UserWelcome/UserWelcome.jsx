import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Moment from "react-moment";
import moment from "moment";

import { useUser } from "../../contexts";

const UserWelcome = () => {
  const {
    userState: { name },
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
          {`${greeting} ${name}`}
        </Typography>
      </Box>
    </Box>
  );
};

export { UserWelcome };
