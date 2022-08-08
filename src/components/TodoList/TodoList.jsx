import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";

import { useUser } from "../../contexts";

const TodoList = () => {
  const [checked, setChecked] = useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  // const [showTextField, setShowTextField] = useState(false);

  const {
    userState: { todos },
    userDispatch,
  } = useUser();

  const [newTodo, setNewTodo] = useState("");
  return (
    <>
      <List sx={{ bgcolor: "#181818" }}>
        {todos.length > 0 ? (
          todos.map(({ title, isDone }) => {
            const labelId = `checkbox-list-label-${title}`;

            return (
              <ListItem key={title} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(title)}
                  dense
                  disableTouchRipple
                >
                  <ListItemIcon>
                    <Checkbox
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": {
                          color: "#fff",
                        },
                        "& .MuiSvgIcon-root": { fontSize: 24 },
                      }}
                      checked={isDone}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      onChange={() => {
                        const indexToUpdate = todos.findIndex(
                          todo => todo.title === title
                        );
                        userDispatch({
                          type: "UPDATE_TODO_STATUS",
                          payload: indexToUpdate,
                        });
                        localStorage.setItem(
                          "todos",
                          JSON.stringify(
                            todos.map((todo, index) =>
                              index === indexToUpdate
                                ? { ...todo, isDone: !todo.isDone }
                                : todo
                            )
                          )
                        );
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          textDecoration: isDone ? "line-through" : "none",
                        }}
                      >
                        {title}
                      </Typography>
                    }
                  />
                  {/* {showTextField && (
                    <TextField
                      id="standard-basic"
                      label="Standard"
                      variant="standard"
                    />
                  )} */}
                </ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    sx={{ color: "text.primary" }}
                    //   onClick={() => setShowTextField(true)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ color: "text.primary" }}
                    onClick={() => {
                      userDispatch({ type: "DELETE_TODO", payload: title });
                      localStorage.setItem(
                        "todos",
                        JSON.stringify(
                          todos.filter(todo => todo.title !== title)
                        )
                      );
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </Box>
              </ListItem>
            );
          })
        ) : (
          <Box sx={{ ml: 5 }}>
            <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
              No Todos Added
            </Typography>
          </Box>
        )}
      </List>
      <Box
        sx={{
          bgcolor: "#212125",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Add new Todo"
          variant="filled"
          color="primary"
          sx={{
            bgcolor: "#333333",
            m: 1,
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1 }}
          onClick={() => {
            userDispatch({
              type: "ADD_TODO",
              payload: { title: newTodo, isDone: false },
            });
            const oldTodos = JSON.parse(localStorage.getItem("todos")) || [];
            localStorage.setItem(
              "todos",
              JSON.stringify([...oldTodos, { title: newTodo, isDone: false }])
            );
            setNewTodo("");
          }}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export { TodoList };
