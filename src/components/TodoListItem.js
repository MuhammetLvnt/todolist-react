import React, { useState } from "react";
import {
  ListItem,
  IconButton,
  Checkbox,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function TodoListItem({ todo, setChangedTodos, changedTodos }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [isChanged, setIsChanged] = useState(false);
  const [text, setText] = useState(todo.content);

  const handleComplete = async (id, completed) => {
    let url = `https://6317aca7ece2736550b8f7fd.mockapi.io/todos/${id}`;
    await axios
      .put(url, { isCompleted: completed })
      .then((res) => setIsCompleted(completed));
  };

  const handleDelete = async (id) => {
    let url = `https://6317aca7ece2736550b8f7fd.mockapi.io/todos/${id}`;
    const answer = window.confirm("Emin misin?");
    if (answer) {
      await axios.delete(url).then((res) => console.log(res.data));
      setChangedTodos(!changedTodos);
    } else {
      return;
    }
  };

  const handleUpdate = async (id, content) => {
    let url = `https://6317aca7ece2736550b8f7fd.mockapi.io/todos/${id}`;
    await axios.put(url, { content }).then((res) => {
      setChangedTodos(!changedTodos);
      setIsChanged(false);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdate(todo.id, text);
  };

  return (
    <>
      <ListItem
        key={todo.id}
        secondaryAction={
          <IconButton edge="end" aria-label="comments">
            <EditIcon
              onClick={() => {
                setIsChanged(!isChanged);
              }}
            />
            <DeleteIcon
              onClick={() => {
                handleDelete(todo.id);
              }}
              style={{ color: "red" }}
            />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isCompleted}
              tabIndex={-1}
              disableRipple
              onClick={() => {
                handleComplete(todo.id, !todo.isCompleted);
              }}
            />
          </ListItemIcon>
          {!todo.isCompleted ? (
            <ListItemText
              id={todo.id}
              disableTypography
              primary={
                !isChanged ? (
                  todo.content
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      value={text}
                    />
                    <button type="submit">Düzenle</button>
                  </form>
                )
              }
            />
          ) : (
            <del>
              {" "}
              <ListItemText
                id={todo.id}
                disableTypography
                primary={
                  !isChanged ? (
                    todo.content
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        onChange={(e) => {
                          setText(e.target.value);
                        }}
                        value={text}
                      />
                      <button type="submit">Düzenle</button>
                    </form>
                  )
                }
              />
            </del>
          )}
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default TodoListItem;
