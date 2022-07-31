import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

import axios from "axios";
import { useUser } from "../../contexts";

const Quote = () => {
  const {
    userState: { quote, quoteAuthor },
    userDispatch,
  } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.quotable.io/random?maxLength=100"
        );
        userDispatch({ type: "SET_QUOTE", payload: response.data.content });
        userDispatch({
          type: "SET_QUOTE_AUTHOR",
          payload: response.data.author,
        });
      } catch (e) {
        userDispatch({ type: "SET_QUOTE", payload: null });
        userDispatch({
          type: "SET_QUOTE_AUTHOR",
          payload: null,
        });
      }
    })();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h5">
          {quote}
        </Typography>
        <Typography variant="body3">{`- ${quoteAuthor}`}</Typography>
      </Box>
    </>
  );
};
export { Quote };
