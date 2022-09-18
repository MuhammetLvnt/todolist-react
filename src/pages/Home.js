import { Grid, Box } from "@mui/material";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Header from "../components/Layout/Header";
export default function Home() {
  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              backgroundColor: "inherit",
              marginTop: "25px;",
            }}
          >
            <TodoForm />
            <TodoList />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
