import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
//Ekleme işlemi

export default function TodoForm() {
  const [text, setText] = useState("");

  let url = "https://6317aca7ece2736550b8f7fd.mockapi.io/todos";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (text.length > 3) {
      //ekleme işlemi
      await axios.post(url, { content: text }).then((res) => {
        setText("");
        alert("Başarı ile eklendi.");
      });
    } else {
      alert("Lütfen 3 karakterden fazla giriniz.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              onChange={(e) => {
                setText(e.target.value);
              }}
              fullWidth
              label="Todo Ekle"
              id="addTodo"
              value={text}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
            >
              Ekle
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
