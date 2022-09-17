import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import Header from "../components/Layout/Header";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

export default function Home() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function getAllTodos() {
    await axios
      .get("https://6317aca7ece2736550b8f7fd.mockapi.io/todos")
      .then((response) => setTodos(response.data));
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  async function handleDelete(id) {
    console.log(id);
    await axios.delete(
      `https://6317aca7ece2736550b8f7fd.mockapi.io/todos/${id}`
    );
  }

  // async function handleUpdate(id) {
  //   console.log(id);
  //   await axios.put(`https://6317aca7ece2736550b8f7fd.mockapi.io/todos/${id}`, {
  //     content: text,
  //   });
  // }
  return (
    <React.Fragment>
      <Header />

      <Box
        sx={{
          bgcolor: "lavender",
          height: "100vh",
          width: "100vw",
        }}
      >
        <AppBar position="static">
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Bütün Görevler" {...a11yProps(0)} />
            <Tab label="Yapılan Görevler" {...a11yProps(1)} />
            <Tab label="Yapılacak Görevler" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          style={{ backgroundColor: "lavender" }}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Box sx={{ height: 400, width: "100%" }}>
              <Grid container spacing={1}>
                {todos.map((todo) => (
                  <>
                    <Grid item xs={3} md={0.5}>
                      <Checkbox defaultChecked size="large" />
                    </Grid>

                    <Grid item xs={3} md={9.5}>
                      <TextField
                        fullWidth
                        id="text"
                        defaultValue={todo.content}
                        onChange={(e) => {
                          setText(e.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={3} md={2}>
                      <button onClick={handleDelete(todo.id)}>
                        <DeleteIcon />
                      </button>

                      <EditIcon />
                    </Grid>
                  </>
                  // </Box>
                ))}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </Box>
      {/* </Container> */}
    </React.Fragment>
  );
}
