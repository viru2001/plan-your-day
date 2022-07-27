import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CssTextField } from "../";
import { useUser } from "../../contexts";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Checkbox } from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";

const MainFocus = () => {
  const {
    userState: { focus, isFocusSaved, isFocusDone, showFocusIcons },
    userDispatch,
  } = useUser();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!isFocusSaved ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
            What is your main focus for today ?
          </Typography>
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
            sx={{ width: "1000" }}
            value={focus}
            onChange={e =>
              userDispatch({ type: "EDIT_FOCUS", payload: e.target.value })
            }
            onKeyDown={e => {
              if (e.key === "Enter") {
                userDispatch({ type: "SAVE_FOCUS_STATUS", payload: true });
                localStorage.setItem("focus", focus);
                localStorage.setItem("isFocusSaved", true);
              }
            }}
          />
        </Box>
      ) : (
        <>
          <Typography variant="h4" component="h4">
            Today
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "flex-end" }}
            onMouseOver={() =>
              userDispatch({ type: "SHOW_FOCUS_ICONS", payload: true })
            }
            onMouseOut={() =>
              userDispatch({ type: "SHOW_FOCUS_ICONS", payload: false })
            }
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": {
                          color: "#fff",
                        },
                        "& .MuiSvgIcon-root": { fontSize: 36 },
                      }}
                      checked={isFocusDone}
                      onChange={e => {
                        userDispatch({
                          type: "SET_FOCUS_DONE_STATUS",
                          payload: e.target.checked,
                        });
                        localStorage.setItem("isFocusDone", e.target.checked);
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        fontWeight: "bold",
                        textDecoration: isFocusDone ? "line-through" : "None",
                      }}
                    >
                      {focus}
                    </Typography>
                  }
                />
              </FormGroup>
            </Box>
            {showFocusIcons && (
              <Box>
                <Edit
                  sx={{ cursor: "pointer", fontSize: 50 }}
                  onClick={() => {
                    userDispatch({
                      type: "SHOW_FOCUS_ICONS",
                      payload: false,
                    });
                    userDispatch({ type: "SAVE_FOCUS_STATUS", payload: false });
                  }}
                />
                <Delete
                  sx={{ cursor: "pointer", fontSize: 50 }}
                  onClick={() => {
                    userDispatch({
                      type: "SHOW_FOCUS_ICONS",
                      payload: false,
                    });
                    userDispatch({ type: "SAVE_FOCUS_STATUS", payload: false });
                    userDispatch({ type: "DELETE_FOCUS" });
                    localStorage.setItem("focus", "");
                  }}
                />
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export { MainFocus };
