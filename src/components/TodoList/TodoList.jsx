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
import uuid from "react-uuid";

import { useUser } from "../../contexts";

const TodoList = () => {
  const {
    userState: { todos },
    userDispatch,
  } = useUser();

  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState("");

  return (
    <>
      <List sx={{ bgcolor: "#181818" }}>
        {todos.length > 0 ? (
          todos.map(({ id, title, isDone, isEditing }) => {
            const labelId = `checkbox-list-label-${id}`;
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton dense>
                  {!isEditing ? (
                    <>
                      {" "}
                      <ListItemIcon>
                        <Checkbox
                          sx={{
                            color: "#fff",
                            "&.Mui-checked": {
                              color: "#fff",
                            },
                            "& .MuiSvgIcon-root": { fontSize: 20 },
                          }}
                          checked={isDone}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                          onChange={() => {
                            const indexToUpdate = todos.findIndex(
                              todo => todo.id === id
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
                      />{" "}
                    </>
                  ) : (
                    <TextField
                      variant="filled"
                      inputProps={{
                        style: {
                          height: "15px",
                          padding: "10px",
                        },
                      }}
                      sx={{
                        bgcolor: "#333333",
                      }}
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                      value={editingTodo}
                      onChange={e => setEditingTodo(e.target.value)}
                    />
                  )}
                </ListItemButton>
                {!isEditing ? (
                  <Box sx={{ mr: 2 }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      sx={{ color: "text.primary", m: 1 }}
                      onClick={() => {
                        const indexToUpdate = todos.findIndex(
                          todo => todo.id === id
                        );
                        userDispatch({
                          type: "UPDATE_EDITING_STATUS",
                          payload: indexToUpdate,
                        });
                        localStorage.setItem(
                          "todos",
                          JSON.stringify(
                            todos.map((todo, index) =>
                              index === indexToUpdate
                                ? { ...todo, isEditing: !todo.isEditing }
                                : todo
                            )
                          )
                        );
                        setEditingTodo(title);
                      }}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      sx={{ color: "text.primary" }}
                      onClick={() => {
                        userDispatch({ type: "DELETE_TODO", payload: id });
                        localStorage.setItem(
                          "todos",
                          JSON.stringify(todos.filter(todo => todo.id !== id))
                        );
                      }}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const indexToUpdate = todos.findIndex(
                        todo => todo.id === id
                      );
                      userDispatch({
                        type: "UPDATE_EDITING_STATUS",
                        payload: indexToUpdate,
                      });
                      userDispatch({
                        type: "UPDATE_TODO_TITLE",
                        payload: { index: indexToUpdate, title: editingTodo },
                      });
                      localStorage.setItem(
                        "todos",
                        JSON.stringify(
                          todos.map((todo, index) =>
                            index === indexToUpdate
                              ? {
                                  ...todo,
                                  title: editingTodo,
                                  isEditing: false,
                                }
                              : todo
                          )
                        )
                      );
                    }}
                  >
                    Update
                  </Button>
                )}
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
            const todoId = uuid();
            userDispatch({
              type: "ADD_TODO",
              payload: {
                title: newTodo,
                isDone: false,
                isEditing: false,
                id: todoId,
              },
            });
            const oldTodos = JSON.parse(localStorage.getItem("todos")) || [];
            localStorage.setItem(
              "todos",
              JSON.stringify([
                ...oldTodos,
                { title: newTodo, isDone: false, isEditing: false, id: todoId },
              ])
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
