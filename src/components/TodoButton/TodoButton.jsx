import { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TodoList } from "../TodoList/TodoList";

const TodoButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ position: "absolute", bottom: 0, right: 0, m: 3 }}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Todo
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        // sx={{ width: "600" }}
      >
        <TodoList />
      </Popover>
    </Box>
  );
};

export { TodoButton };
