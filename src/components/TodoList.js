import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import axios from "axios";
import TodoListItem from "./TodoListItem";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

function TodoList() {
  let url = "https://6317aca7ece2736550b8f7fd.mockapi.io/todos";
  const [todos, setTodos] = useState([]);
  const [changedTodos, setChangedTodos] = useState(false);
  const [tab, setTab] = useState("all");
  const [todoCompleted, setTodoCompleted] = useState([]);
  const [todoNotCompleted, setTodoNotCompleted] = useState([]);

  async function getAllTodos() {
    await axios.get(url).then((res) => {
      setTodos(res.data);
    });
  }

  function task() {
    let todoCompleteds = [];
    let todoNotCompleteds = [];

    todos.map((todo) => {
      if (todo.isCompleted) {
        todoCompleteds.push(todo);
      } else {
        todoNotCompleteds.push(todo);
      }
    });

    setTodoCompleted(todoCompleteds);
    setTodoNotCompleted(todoNotCompleteds);
  }

  useEffect(() => {
    getAllTodos();
    task();
  }, [todos, changedTodos]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#C98474",
          color: "white",
          width: "80%",
          marginTop: "15px",
        }}
      >
        <AppBar style={{ background: "black" }} position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Bütün Görevler" {...a11yProps(0)} />
            <Tab label="Biten Görevler" {...a11yProps(1)} />
            <Tab label="Yapılacak Görevler" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <List sx={{ width: "100%", bgcolor: "white.dark" }}>
              {todos.map((todo) => (
                <>
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    setChangedTodos={setChangedTodos}
                    changedTodos={changedTodos}
                  />
                </>
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <List sx={{ width: "100%", bgcolor: "white.dark" }}>
              {todoCompleted.map((todo) => (
                <>
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    setChangedTodos={setChangedTodos}
                    changedTodos={changedTodos}
                  />
                </>
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <List sx={{ width: "100%", bgcolor: "white.dark" }}>
              {todoNotCompleted.map((todo) => (
                <>
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    setChangedTodos={setChangedTodos}
                    changedTodos={changedTodos}
                  />
                </>
              ))}
            </List>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
}

export default TodoList;
