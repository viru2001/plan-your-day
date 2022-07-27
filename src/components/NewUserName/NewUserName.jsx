import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CssTextField } from "../";
import { useUser } from "../../contexts";

const NewUserName = () => {
  const {
    userState: { name },
    userDispatch,
  } = useUser();

  const handleSaveClick = () => {
    userDispatch({ type: "SAVE_NAME" });
    localStorage.setItem("name", name);
    localStorage.setItem("isNameSaved", true);
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
        Hello, What is your Name ?
      </Typography>
      <CssTextField
        variant="standard"
        InputProps={{
          inputProps: {
            style: { fontSize: 40, textAlign: "center", fontWeight: "bold" },
          },
        }}
        sx={{ width: 300 }}
        value={name}
        onChange={e =>
          userDispatch({ type: "EDIT_USERNAME", payload: e.target.value })
        }
      />
      <Button
        variant="contained"
        sx={{ mt: 2, fontSize: "1.2rem" }}
        onClick={handleSaveClick}
      >
        Save
      </Button>
    </Box>
  );
};

export { NewUserName };
