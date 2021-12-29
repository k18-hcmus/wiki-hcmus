import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import axiosClient from "../../../axiosClient";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = React.useState([]);
  const [content, setContent] = useState("");
  const [tempTag, setTempTag] = useState("");
  const handleChangeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleChangeTag = (e) => {
    e.preventDefault();
    setTempTag(e.target.value);
  };
  const handleChangeContent = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  useEffect(() => {
    async function FetchTag() {
      const result = await axiosClient.get("/tags");
      setTags(result.data);
    }
    FetchTag();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify(content);

    try {
      const createPost = axiosClient.post("/posts", {
        Title: title,
        Content: body,
        Tags: tempTag,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create post
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="title"
            multiline
            maxRows={4}
            value={title}
            onChange={handleChangeTitle}
          />
        </CardContent>
        <FormControl sx={{ width: 300, ml: 2.5 }}>
          <InputLabel id="demo-simple-select-label">Tag</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tags}
            label="Tag"
            onChange={handleChangeTag}
          >
            {tags.map((tag) => (
              <MenuItem value={tag.id}>{tag.Name}</MenuItem>
            ))}
            {/* <MenuItem value={10}></MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          value={content}
          onChange={handleChangeContent}
        />
        <CardActions>
          <Button size="small" type="submit">
            Create post
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default CreatePost;
